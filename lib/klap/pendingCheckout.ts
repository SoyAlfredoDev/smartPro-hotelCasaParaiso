import type { SaveBookingInput } from "@/lib/db/saveBookingToDatabase";
import generateReservationNumber from "@/lib/db/generateReservationNumber";
import { prisma } from "@/lib/prisma";

const PENDING_TTL_HOURS = 2;

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

export async function createPendingCheckout(payload: SaveBookingInput) {
  const expiresAt = new Date(Date.now() + PENDING_TTL_HOURS * 60 * 60 * 1000);

  for (let attempt = 0; attempt < 5; attempt++) {
    const id = String(await generateReservationNumber());

    try {
      await prisma.pendingCheckout.create({
        data: {
          id,
          payload: payload as object,
          expiresAt,
        },
      });
      return id;
    } catch (error) {
      if (isUniqueConstraintError(error) && attempt < 4) continue;
      throw error;
    }
  }

  throw new Error("No se pudo generar un ID de reserva disponible");
}

export async function attachKlapOrderToPending(
  pendingId: string,
  klapOrderId: string,
) {
  return prisma.pendingCheckout.update({
    where: { id: pendingId },
    data: { klapOrderId },
  });
}

export async function getPendingCheckout(pendingId: string) {
  const pending = await prisma.pendingCheckout.findUnique({
    where: { id: pendingId },
  });

  if (!pending) return null;
  if (pending.expiresAt < new Date()) {
    await prisma.pendingCheckout.delete({ where: { id: pendingId } });
    return null;
  }

  return pending;
}

export async function deletePendingCheckout(pendingId: string) {
  try {
    await prisma.pendingCheckout.delete({ where: { id: pendingId } });
  } catch {
    /* already removed */
  }
}

export function pendingPayloadToSaveInput(
  payload: unknown,
): SaveBookingInput {
  return payload as SaveBookingInput;
}
