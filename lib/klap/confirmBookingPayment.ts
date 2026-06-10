import { prisma } from "@/lib/prisma";
import { sendBookingNotifications } from "@/lib/resend/saveBookingToDatabase";
import {
  BookingAdminNotificationEmail,
  BookingConfirmationEmail,
} from "@/emails";

async function toConfirmationEmailProps(booking: {
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  id: string;
  room: { name: string; category: string };
}) {
  return {
    guestName: booking.guestName,
    checkIn: booking.checkIn.toISOString(),
    checkOut: booking.checkOut.toISOString(),
    roomName: booking.room.name,
    roomCategory: booking.room.category,
    guests: booking.guests,
    bookingId: booking.id,
  };
}

async function toAdminEmailProps(booking: {
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
  room: { name: string; category: string };
}) {
  return {
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
  };
}

export async function confirmBookingPayment({
  referenceId,
  klapOrderId,
}: {
  referenceId: string;
  klapOrderId: string;
}) {
  const booking = await prisma.booking.findUnique({
    where: { id: referenceId },
    include: {
      room: {
        select: { id: true, name: true, category: true },
      },
    },
  });

  if (!booking) {
    console.warn(`[klap] Reserva no encontrada: ${referenceId}`);
    return null;
  }

  if (booking.paymentStatus === "paid" && booking.klapOrderId === klapOrderId) {
    return booking;
  }

  const updated = await prisma.booking.update({
    where: { id: referenceId },
    data: {
      status: "confirmada",
      klapOrderId,
      paymentStatus: "paid",
    },
    include: {
      room: {
        select: { id: true, name: true, category: true },
      },
    },
  });

  try {
    await sendBookingNotifications({
      clientEmailData: {
        from: "Hotel <reservas@hotelcasaparaiso.cl>",
        to: updated.guestEmail,
        subject: "Confirmación de reserva y pago",
        react: BookingConfirmationEmail(await toConfirmationEmailProps(updated)),
      },
      adminEmailData: {
        from: "Sistema <notificaciones@hotelcasaparaiso.cl>",
        to: process.env.ADMIN_EMAIL ?? "contacto@hotelcasaparaiso.cl",
        subject: "Nueva reserva pagada",
        react: BookingAdminNotificationEmail(await toAdminEmailProps(updated)),
      },
    });
  } catch (error) {
    console.error("[klap] Error enviando emails post-pago:", error);
  }

  return updated;
}

export async function rejectBookingPayment({
  referenceId,
  klapOrderId,
  reason,
}: {
  referenceId: string;
  klapOrderId: string;
  reason?: string;
}) {
  const booking = await prisma.booking.findUnique({
    where: { id: referenceId },
  });

  if (!booking) return null;

  if (booking.status === "confirmada" || booking.paymentStatus === "paid") {
    return booking;
  }

  return prisma.booking.update({
    where: { id: referenceId },
    data: {
      status: "cancelada",
      klapOrderId,
      paymentStatus: "rejected",
      notes: [booking.notes, reason ? `Pago rechazado: ${reason}` : null]
        .filter(Boolean)
        .join("\n"),
    },
  });
}
