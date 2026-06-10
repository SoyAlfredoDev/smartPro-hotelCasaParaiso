import { saveBookingToDatabase } from "@/lib/db/saveBookingToDatabase";
import { getKlapOrderStatus, isKlapOrderPaid } from "@/lib/klap/getOrderStatus";
import {
  deletePendingCheckout,
  getPendingCheckout,
  pendingPayloadToSaveInput,
} from "@/lib/klap/pendingCheckout";
import { confirmBookingPayment } from "@/lib/klap/confirmBookingPayment";
import { prisma } from "@/lib/prisma";

export async function finalizePaidCheckout({
  referenceId,
  orderId,
}: {
  referenceId: string;
  orderId: string;
}) {
  const klapOrder = await getKlapOrderStatus(orderId);

  if (!isKlapOrderPaid(klapOrder.status)) {
    throw new Error(
      `El pago no está confirmado en Klap (estado: ${klapOrder.status})`,
    );
  }

  const existingBooking = await prisma.booking.findUnique({
    where: { id: referenceId },
    include: {
      room: { select: { id: true, name: true, category: true } },
    },
  });

  if (existingBooking?.paymentStatus === "paid") {
    return existingBooking;
  }

  const pending = await getPendingCheckout(referenceId);

  if (!pending) {
    if (existingBooking) {
      return confirmBookingPayment({ referenceId, klapOrderId: orderId });
    }
    throw new Error("La solicitud de reserva expiró o no existe");
  }

  const payload = pendingPayloadToSaveInput(pending.payload);

  await saveBookingToDatabase({
    ...payload,
    id: referenceId,
    status: "confirmada",
    paymentStatus: "paid",
  });

  await deletePendingCheckout(referenceId);

  return confirmBookingPayment({ referenceId, klapOrderId: orderId });
}
