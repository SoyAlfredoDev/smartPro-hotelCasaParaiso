import { prisma } from "@/lib/prisma";
import { validateSaveBookingInput } from "@/lib/validation/bookingForm";
import generateReservationNumber from "./generateReservationNumber";

export interface SaveBookingInput {
  guestName?: string;
  firstName?: string;
  lastName?: string;
  guestEmail?: string;
  email?: string;
  guestPhone?: string;
  phone?: string;
  checkIn: string | Date;
  checkOut: string | Date;
  guests?: number;
  totalPrice?: number;
  roomId: string | string[];
  notes?: string | null;
  comment?: string;
}

function resolveGuestName(input: SaveBookingInput): string {
  if (input.guestName?.trim()) return input.guestName.trim();
  const parts = [input.firstName, input.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return parts;
}

function resolveGuestEmail(input: SaveBookingInput): string {
  return (input.guestEmail ?? input.email ?? "").trim();
}

function resolveGuestPhone(input: SaveBookingInput): string {
  return (input.guestPhone ?? input.phone ?? "").trim();
}

function resolveRoomId(roomId: SaveBookingInput["roomId"]): string {
  if (Array.isArray(roomId)) return String(roomId[0] ?? "");
  return String(roomId ?? "");
}

function resolveNotes(input: SaveBookingInput): string | null {
  const notes = input.notes ?? input.comment;
  return notes?.trim() ? notes.trim() : null;
}

export async function saveBookingToDatabase(formData: SaveBookingInput) {
  const validationError = validateSaveBookingInput(formData);
  if (validationError) {
    throw new Error(validationError);
  }

  const guestName = resolveGuestName(formData);
  const guestEmail = resolveGuestEmail(formData);
  const roomId = resolveRoomId(formData.roomId);
  const id = await generateReservationNumber();

  return prisma.booking.create({
    data: {
      id: id.toString(),
      guestName,
      guestEmail,
      guestPhone: resolveGuestPhone(formData),
      checkIn: new Date(formData.checkIn),
      checkOut: new Date(formData.checkOut),
      guests: formData.guests ?? 1,
      totalPrice: formData.totalPrice ?? 0,
      roomId,
      notes: resolveNotes(formData),
      status: "pendiente",
    },
    include: {
      room: {
        select: {
          id: true,
          name: true,
          category: true,
          images: true,
        },
      },
    },
  });
}
