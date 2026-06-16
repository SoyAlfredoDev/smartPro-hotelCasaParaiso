/** ApiKey pública de demo en developers.klap.cl — no sirve para cobrar en producción. */
const KLAP_SANDBOX_DEMO_API_KEYS = new Set([
  "mKaTZ4yBm3rVFapqNctziKCvXsjD6fDO",
]);

function isSandboxKlapUrl(url: string | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.includes("sandbox") || lower.includes("mcdesaqa");
}

/**
 * Permite flujo de pago en sandbox solo en desarrollo (certificación Klap).
 * Nunca activo en producción.
 */
export function isKlapSandboxTestingEnabled(): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  return process.env.KLAP_SANDBOX_TESTING === "true";
}

/**
 * Pagos Klap en producción: solo credenciales productivas reales.
 * En desarrollo con KLAP_SANDBOX_TESTING=true: permite sandbox para certificación.
 */
export function isKlapPaymentsEnabled(): boolean {
  const apiKey = process.env.KLAP_API_KEY?.trim();
  if (!apiKey) {
    return false;
  }

  if (isKlapSandboxTestingEnabled()) {
    return process.env.KLAP_PAYMENTS_ENABLED === "true";
  }

  if (process.env.KLAP_PAYMENTS_ENABLED !== "true") {
    return false;
  }

  if (KLAP_SANDBOX_DEMO_API_KEYS.has(apiKey)) {
    return false;
  }

  if (isSandboxKlapUrl(process.env.KLAP_URL)) {
    return false;
  }

  return true;
}
