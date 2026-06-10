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
 * Pagos Klap solo con activación explícita + credenciales productivas reales.
 * Si falta algo, el checkout usa reserva directa (modo seguro para producción).
 */
export function isKlapPaymentsEnabled(): boolean {
  if (process.env.KLAP_PAYMENTS_ENABLED !== "true") {
    return false;
  }

  const apiKey = process.env.KLAP_API_KEY?.trim();
  if (!apiKey) {
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
