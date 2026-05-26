import generateReservationNumber from "@/lib/db/generateReservationNumber";
import type { SaveBookingInput } from "@/lib/db/saveBookingToDatabase";
import { prisma } from "@/lib/prisma";
import { sendBookingNotifications } from "@/lib/resend/saveBookingToDatabase";
import { handleNewBooking } from "@/lib/resend/handleNewBooking";
import {
  BookingAdminNotificationEmail,
  BookingConfirmationEmail,
} from "@/emails";

const locationToHotelId: Record<string, string> = {
  "hotel-san-miguel": "hotel-san-miguel",
  "hotel-republica": "hotel-republica",
  "San Miguel": "hotel-san-miguel",
  "Restobar San Miguel": "hotel-san-miguel",
  República: "hotel-republica",
  Republica: "hotel-republica",
  "Hotel Casa Paraiso San Miguel": "hotel-san-miguel",
  "Hotel Casa Paraíso San Miguel": "hotel-san-miguel",
  "Hotel Casa Paraiso Republica": "hotel-republica",
  "Hotel Casa Paraíso República": "hotel-republica",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+()-]{8,20}$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseGuests(value: unknown) {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function parseDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getTodayAtMidnight() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function normalizeLocation(value: string) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function resolveHotelId(location: string) {
  const trimmedLocation = location.trim();
  const exactMatch = locationToHotelId[trimmedLocation];
  if (exactMatch) {
    return exactMatch;
  }

  const normalizedLocation = normalizeLocation(trimmedLocation);
  if (normalizedLocation.includes("republica")) {
    return "hotel-republica";
  }
  if (normalizedLocation.includes("san miguel")) {
    return "hotel-san-miguel";
  }

  return null;
}

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

type BookingRequestEmailData = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  roomId: string;
  status: string;
  notes: string | null;
  room: {
    id: string;
    name: string;
    category: string;
  };
};

async function sendBookingRequestEmails(booking: BookingRequestEmailData) {
  return sendBookingNotifications({
    clientEmailData: {
      from: "Hotel <reservas@hotelcasaparaiso.cl>",
      to: booking.guestEmail,
      subject: "Confirmación de solicitud de reserva",
      react: BookingConfirmationEmail({
        guestName: booking.guestName,
        checkIn: booking.checkIn.toISOString(),
        checkOut: booking.checkOut.toISOString(),
        roomName: booking.room.name,
        roomCategory: booking.room.category,
        guests: booking.guests,
        bookingId: booking.id,
      }),
    },
    adminEmailData: {
      from: "Sistema <notificaciones@hotelcasaparaiso.cl>",
      to: process.env.ADMIN_EMAIL ?? "contacto@hotelcasaparaiso.cl",
      subject: "Nueva solicitud de reserva",
      react: BookingAdminNotificationEmail({
        bookingId: booking.id,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        checkIn: booking.checkIn.toISOString(),
        checkOut: booking.checkOut.toISOString(),
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        roomName: booking.room.name,
        roomCategory: booking.room.category,
        roomId: booking.roomId,
        status: booking.status,
        notes: booking.notes,
      }),
    },
  });
}

async function findRoomForBookingRequest(hotelId: string, guests: number) {
  const roomWithCapacity = await prisma.room.findFirst({
    where: {
      hotelId,
      capacity: {
        gte: guests,
      },
    },
    orderBy: [{ capacity: "asc" }, { price: "asc" }, { name: "asc" }],
    select: {
      id: true,
    },
  });

  if (roomWithCapacity) {
    return roomWithCapacity;
  }

  return prisma.room.findFirst({
    where: { hotelId },
    orderBy: [{ price: "asc" }, { name: "asc" }],
    select: {
      id: true,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      guests: rawGuests,
      checkIn,
      checkOut,
      location,
      notes,
    } = body;

    const guests = parseGuests(rawGuests);

    if (
      !isNonEmptyString(guestName) ||
      !isNonEmptyString(guestEmail) ||
      !isNonEmptyString(guestPhone) ||
      !isNonEmptyString(checkIn) ||
      !isNonEmptyString(checkOut) ||
      !isNonEmptyString(location)
    ) {
      return Response.json(
        { error: "Todos los campos obligatorios deben estar completos." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(guestEmail.trim())) {
      return Response.json(
        { error: "El correo electrónico no es válido." },
        { status: 400 },
      );
    }

    if (!PHONE_REGEX.test(guestPhone.trim())) {
      return Response.json(
        { error: "El teléfono no es válido." },
        { status: 400 },
      );
    }

    if (guests < 1) {
      return Response.json(
        { error: "Debe indicarse al menos un huésped." },
        { status: 400 },
      );
    }

    const parsedCheckIn = parseDate(checkIn);
    const parsedCheckOut = parseDate(checkOut);

    if (!parsedCheckIn || !parsedCheckOut) {
      return Response.json(
        { error: "Las fechas de la reserva no son válidas." },
        { status: 400 },
      );
    }

    if (parsedCheckIn < getTodayAtMidnight()) {
      return Response.json(
        { error: "La fecha de check-in no puede ser anterior a hoy." },
        { status: 400 },
      );
    }

    if (parsedCheckOut <= parsedCheckIn) {
      return Response.json(
        { error: "La fecha de salida debe ser posterior al check-in." },
        { status: 400 },
      );
    }

    const hotelId = resolveHotelId(location);
    if (!hotelId) {
      return Response.json(
        { error: "La ubicación seleccionada no es válida." },
        { status: 400 },
      );
    }

    const room = await findRoomForBookingRequest(hotelId, guests);
    if (!room) {
      return Response.json(
        { error: "No encontramos habitaciones asociadas a esa ubicación." },
        { status: 404 },
      );
    }

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const reservationId = String(await generateReservationNumber());

      try {
        const booking = await prisma.booking.create({
          data: {
            id: reservationId,
            guestName: guestName.trim(),
            guestEmail: guestEmail.trim(),
            guestPhone: guestPhone.trim(),
            checkIn: parsedCheckIn,
            checkOut: parsedCheckOut,
            guests,
            totalPrice: 0,
            status: "pendiente",
            notes: isNonEmptyString(notes) ? notes.trim() : null,
            room: {
              connect: {
                id: room.id,
              },
            },
          },
          include: {
            room: {
              select: {
                id: true,
                name: true,
                category: true,
                hotelId: true,
              },
            },
          },
        });
        const emailInput: SaveBookingInput = {
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          guestPhone: booking.guestPhone,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guests: booking.guests,
          totalPrice: booking.totalPrice,
          roomId: booking.roomId,
          notes: booking.notes,
        };
        void (emailInput satisfies Parameters<typeof handleNewBooking>[0]);

        let emailsSent = false;
        try {
          emailsSent = await sendBookingRequestEmails(booking);
        } catch (error) {
          console.error("Error enviando correos:", error);
        }

        return Response.json(
          {
            booking,
            reservationNumber: `#RES-${booking.id}`,
            emailsSent,
          },
          { status: 201 },
        );
      } catch (error) {
        if (isUniqueConstraintError(error) && attempt < 2) {
          continue;
        }

        throw error;
      }
    }

    return Response.json(
      { error: "No pudimos generar un número de reserva único." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error creating booking request:", error);
    return Response.json(
      { error: "Error al crear la solicitud de reserva" },
      { status: 500 },
    );
  }
}
