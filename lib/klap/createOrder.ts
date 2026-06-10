import {
  getKlapCallbackBaseUrl,
  getKlapApiKey,
  getKlapOrdersUrl,
} from "@/lib/klap/config";
import { normalizePhoneForKlap } from "@/lib/klap/normalizePhone";
import type { KlapCreateOrderInput, KlapOrderResponse } from "@/lib/klap/types";

export async function createKlapOrder(
  input: KlapCreateOrderInput,
): Promise<KlapOrderResponse> {
  const baseUrl = getKlapCallbackBaseUrl().replace(/\/$/, "");
  const apiKey = getKlapApiKey();
  const klapUrl = getKlapOrdersUrl();

  const response = await fetch(klapUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      reference_id: input.referenceId,
      description: input.description,
      amount: {
        currency: "CLP",
        total: input.amount,
      },
      methods: ["tarjetas"],
      user: {
        email: input.guestEmail,
        phone: normalizePhoneForKlap(input.guestPhone),
        first_name: input.guestFirstName,
        last_name: input.guestLastName,
      },
      urls: {
        return_url: `${baseUrl}/checkout/success?reserva=${encodeURIComponent(input.referenceId)}&origen=klap`,
        cancel_url: `${baseUrl}/checkout/error?reserva=${encodeURIComponent(input.referenceId)}&origen=klap`,
      },
      customs: [
        { key: "tarjetas_expiration_minutes", value: "30" },
        { key: "notify_payment_merchant", value: "true" },
      ],
      webhooks: {
        webhook_confirm: `${baseUrl}/api/webhooks/klap-confirm`,
        webhook_reject: `${baseUrl}/api/webhooks/klap-reject`,
      },
    }),
  });

  const data = (await response.json()) as KlapOrderResponse & {
    message?: string;
    code?: string;
  };

  if (!response.ok || !data.order_id) {
    throw new Error(
      data.message ?? `Error al crear orden Klap (${response.status})`,
    );
  }

  return data;
}
