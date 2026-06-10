import { NextResponse } from "next/server";
import { finalizePaidCheckout } from "@/lib/klap/finalizePaidCheckout";
import type { KlapWebhookConfirmPayload } from "@/lib/klap/types";
import { isValidKlapWebhookApiKey } from "@/lib/klap/verifyWebhook";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("apikey");
    if (!isValidKlapWebhookApiKey(apiKey)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = (await req.json()) as KlapWebhookConfirmPayload;
    const { reference_id, order_id } = body;

    if (!reference_id || !order_id) {
      return NextResponse.json(
        { error: "Payload incompleto" },
        { status: 400 },
      );
    }

    await finalizePaidCheckout({
      referenceId: reference_id,
      orderId: order_id,
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("[webhook klap-confirm]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
