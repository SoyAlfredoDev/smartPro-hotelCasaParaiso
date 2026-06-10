import { NextResponse } from "next/server";
import { cancelPendingCheckout } from "@/lib/klap/cancelPendingCheckout";
import { rejectBookingPayment } from "@/lib/klap/confirmBookingPayment";
import type { KlapWebhookRejectPayload } from "@/lib/klap/types";
import { isValidKlapWebhookApiKey } from "@/lib/klap/verifyWebhook";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("apikey");
    if (!isValidKlapWebhookApiKey(apiKey)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = (await req.json()) as KlapWebhookRejectPayload;
    const { reference_id, order_id, message } = body;

    if (!reference_id || !order_id) {
      return NextResponse.json(
        { error: "Payload incompleto" },
        { status: 400 },
      );
    }

    await cancelPendingCheckout(reference_id);

    await rejectBookingPayment({
      referenceId: reference_id,
      klapOrderId: order_id,
      reason: message,
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("[webhook klap-reject]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
