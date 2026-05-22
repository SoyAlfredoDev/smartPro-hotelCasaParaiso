"use server";

import { sendBookingNotifications } from "@/lib/resend/saveBookingToDatabase";
import {
  saveBookingToDatabase,
  type SaveBookingInput,
} from "@/lib/db/saveBookingToDatabase";
import {
  BookingAdminNotificationEmail,
  BookingConfirmationEmail,
} from "@/emails";
import type {
  BookingAdminNotificationEmailProps,
  BookingConfirmationEmailProps,
} from "@/emails/types";
import { validateSaveBookingInput } from "@/lib/validation/bookingForm";

export type HandleNewBookingResult =
  | {
      success: true;
      booking: Awaited<ReturnType<typeof saveBookingToDatabase>>;
      emailsSent: boolean;
    }
  | {
      success: false;
      error: string;
    };

function toConfirmationEmailProps(
  booking: Awaited<ReturnType<typeof saveBookingToDatabase>>,
): BookingConfirmationEmailProps {
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

function toAdminEmailProps(
  booking: Awaited<ReturnType<typeof saveBookingToDatabase>>,
): BookingAdminNotificationEmailProps {
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

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("Unique constraint")) {
      return "Ya existe una reserva con estos datos. Contacta al hotel si necesitas ayuda.";
    }
    if (error.message.includes("Foreign key constraint")) {
      return "La habitación seleccionada ya no está disponible. Elige otra habitación.";
    }
    return error.message;
  }
  return "Error inesperado al crear la reserva.";
}

export async function handleNewBooking(
  formData: SaveBookingInput,
): Promise<HandleNewBookingResult> {
  const validationError = validateSaveBookingInput(formData);
  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    const booking = await saveBookingToDatabase(formData);

    const emailsSent = await sendBookingNotifications({
      clientEmailData: {
        from: "Hotel <reservas@hotelcasaparaiso.cl>",
        to: booking.guestEmail,
        subject: "Confirmación de reserva",
        react: BookingConfirmationEmail(toConfirmationEmailProps(booking)),
      },
      adminEmailData: {
        from: "Sistema <notificaciones@hotelcasaparaiso.cl>",
        to: process.env.ADMIN_EMAIL ?? "admin@tuhotel.com",
        subject: "Nueva reserva",
        react: BookingAdminNotificationEmail(toAdminEmailProps(booking)),
      },
    });

    return { success: true, booking, emailsSent };
  } catch (error) {
    console.error("handleNewBooking:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}
