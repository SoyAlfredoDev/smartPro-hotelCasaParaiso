"use server";

import { prisma } from "@/lib/prisma";
import { validateBookingSearchSchema } from "@/lib/validation/validateBookingSearch";

export type ValidatedBookingDetails = {
  reservationId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  statusLabel: string;
};

export type ValidateBookingResult =
  | { success: true; booking: ValidatedBookingDetails }
  | { success: false; error: string };

const STATUS_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

const NOT_FOUND_MESSAGE =
  "No encontramos una reserva con esos datos. Verifica tu apellido y el número de reserva, o contáctanos si necesitas ayuda.";

function matchesLastName(guestName: string, lastName: string): boolean {
  const normalizedLast = lastName.trim().toLowerCase();
  if (!normalizedLast) return false;

  const words = guestName
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return words.some((word) => word === normalizedLast);
}

export async function validateBooking(
  input: unknown,
): Promise<ValidateBookingResult> {
  const parsed = validateBookingSearchSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.",
    };
  }

  const { lastName, reservationNumber } = parsed.data;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: reservationNumber },
      select: {
        id: true,
        guestName: true,
        checkIn: true,
        checkOut: true,
        status: true,
      },
    });

    if (!booking || !matchesLastName(booking.guestName, lastName)) {
      return { success: false, error: NOT_FOUND_MESSAGE };
    }

    return {
      success: true,
      booking: {
        reservationId: booking.id,
        guestName: booking.guestName,
        checkIn: booking.checkIn.toISOString(),
        checkOut: booking.checkOut.toISOString(),
        status: booking.status,
        statusLabel: STATUS_LABELS[booking.status] ?? booking.status,
      },
    };
  } catch (err) {
    console.error("validateBooking:", err);
    return {
      success: false,
      error:
        "No pudimos consultar tu reserva en este momento. Intenta de nuevo en unos minutos.",
    };
  }
}
