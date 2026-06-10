import { NextResponse } from "next/server";
import { finalizePaidCheckout } from "@/lib/klap/finalizePaidCheckout";
import { getPendingCheckout } from "@/lib/klap/pendingCheckout";

export async function POST(req: Request) {
  try {
    const { referenceId, orderId } = await req.json();

    if (!referenceId) {
      return NextResponse.json(
        { error: "referenceId es requerido" },
        { status: 400 },
      );
    }

    let resolvedOrderId = orderId ? String(orderId) : null;

    if (!resolvedOrderId) {
      const pending = await getPendingCheckout(String(referenceId));
      resolvedOrderId = pending?.klapOrderId ?? null;
    }

    if (!resolvedOrderId) {
      return NextResponse.json(
        { error: "No se encontró la orden de pago asociada" },
        { status: 400 },
      );
    }

    const booking = await finalizePaidCheckout({
      referenceId: String(referenceId),
      orderId: resolvedOrderId,
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
      },
    });
  } catch (error) {
    console.error("[klap/confirm-payment]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo confirmar el pago",
      },
      { status: 400 },
    );
  }
}
