export const KLAP_SANDBOX_ORDERS_URL =
  "https://api-pasarela-sandbox.mcdesaqa.cl/payment-gateway/v1/orders";

export const KLAP_PRODUCTION_ORDERS_URL =
  "https://api.pasarela.multicaja.cl/payment-gateway/v1/orders";

export function getKlapOrdersUrl() {
  return (
    process.env.KLAP_URL ??
    (process.env.NODE_ENV === "production"
      ? KLAP_PRODUCTION_ORDERS_URL
      : KLAP_SANDBOX_ORDERS_URL)
  );
}

export function getBaseUrl() {
  return (
    process.env.BASE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000"
  );
}

/** URLs que Klap usa para return/cancel/webhooks (deben ser HTTPS y alcanzables). */
export function getKlapCallbackBaseUrl() {
  return (
    process.env.KLAP_CALLBACK_BASE_URL ??
    process.env.BASE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000"
  );
}

export function getKlapApiKey() {
  const key = process.env.KLAP_API_KEY;
  if (!key) {
    throw new Error("KLAP_API_KEY no está configurada");
  }
  return key;
}

export function getKlapWebhookSecret() {
  return process.env.KLAP_PRIVATE_KEY ?? process.env.KLAP_API_KEY ?? "";
}
