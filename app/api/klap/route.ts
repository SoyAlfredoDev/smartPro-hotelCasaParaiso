// app/api/create-klap-order/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();
  const reference = `ORDER-${Date.now()}`;
  const baseUrl = process.env.BASE_URL;
  const klap_url = process.env.KLAP_URL;

  const response = await fetch(klap_url || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.KLAP_API_KEY || "",
    },
    body: JSON.stringify({
      reference_id: reference,
      description: "Descripción de la compra",
      amount: {
        currency: "CLP",
        total: amount,
      },
      methods: ["tarjetas"],
      urls: {
        return_url: `${baseUrl}/checkout/success`,
        cancel_url: `${baseUrl}/checkout/error`,
      },
      customs: [
        {
          key: "tarjetas_expiration_minutes",
          value: "30",
        },
        {
          key: "notify_payment_merchant",
          value: "true",
        },
      ],
      webhooks: {
        webhook_confirm: `${baseUrl}/api/webhooks/klap-confirm`,
        webhook_reject: `${baseUrl}/api/webhooks/klap-reject`,
      },
    }),
  });
  const data = await response.json();
  return NextResponse.json({ order_id: data.order_id });
}
