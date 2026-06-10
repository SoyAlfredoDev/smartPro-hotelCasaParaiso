import { NextResponse } from "next/server";
import { cancelPendingCheckout } from "@/lib/klap/cancelPendingCheckout";
import { rejectBookingPayment } from "@/lib/klap/confirmBookingPayment";

export async function POST(req: Request) {
  try {
    const { referenceId, orderId, reason } = await req.json();

    if (!referenceId) {
      return NextResponse.json(
        { error: "referenceId es requerido" },
        { status: 400 },
      );
    }

    await cancelPendingCheckout(String(referenceId));

    if (orderId) {
      await rejectBookingPayment({
        referenceId: String(referenceId),
        klapOrderId: String(orderId),
        reason,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[klap/reject-payment]", error);
    return NextResponse.json(
      { error: "No se pudo registrar el rechazo del pago" },
      { status: 500 },
    );
  }
}
