import { deletePendingCheckout } from "@/lib/klap/pendingCheckout";
import { prisma } from "@/lib/prisma";

export async function cancelPendingCheckout(referenceId: string) {
  await deletePendingCheckout(referenceId);

  const booking = await prisma.booking.findUnique({
    where: { id: referenceId },
  });

  if (!booking || booking.status === "confirmada") {
    return null;
  }

  if (booking.status === "pendiente_pago" || booking.paymentStatus === "pending") {
    return prisma.booking.update({
      where: { id: referenceId },
      data: {
        status: "cancelada",
        paymentStatus: "rejected",
      },
    });
  }

  return booking;
}
