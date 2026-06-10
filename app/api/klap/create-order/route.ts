import { NextResponse } from "next/server";
import { createKlapOrder } from "@/lib/klap/createOrder";
import { normalizePhoneForKlap } from "@/lib/klap/normalizePhone";
import {
  attachKlapOrderToPending,
  createPendingCheckout,
} from "@/lib/klap/pendingCheckout";
import type { SaveBookingInput } from "@/lib/db/saveBookingToDatabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      booking,
      description,
      amount,
      guestEmail,
      guestPhone,
      guestFirstName,
      guestLastName,
    } = body as {
      booking: SaveBookingInput;
      description?: string;
      amount: number;
      guestEmail: string;
      guestPhone: string;
      guestFirstName?: string;
      guestLastName?: string;
    };

    if (!booking || !amount || !guestEmail || !guestPhone) {
      return NextResponse.json(
        { error: "Faltan datos para iniciar el pago" },
        { status: 400 },
      );
    }

    let normalizedPhone: string;
    try {
      normalizedPhone = normalizePhoneForKlap(String(guestPhone));
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "El teléfono no es válido para el pago",
        },
        { status: 400 },
      );
    }

    const referenceId = await createPendingCheckout(booking);

    const order = await createKlapOrder({
      referenceId,
      description: description ?? "Reserva Hotel Casa Paraíso",
      amount: Number(amount),
      guestEmail: String(guestEmail),
      guestPhone: normalizedPhone,
      guestFirstName: String(guestFirstName ?? "Huésped"),
      guestLastName: String(guestLastName ?? ""),
    });

    await attachKlapOrderToPending(referenceId, order.order_id);

    return NextResponse.json({
      orderId: order.order_id,
      redirectUrl: order.redirect_url,
      referenceId,
      status: order.status,
    });
  } catch (error) {
    console.error("[klap/create-order]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo crear la orden de pago",
      },
      { status: 500 },
    );
  }
}
