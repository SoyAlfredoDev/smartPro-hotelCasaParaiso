/**
 * Pagos Klap solo cuando se activa explícitamente y hay ApiKey configurada.
 * Por defecto (producción sin certificación) el checkout usa reserva directa.
 */
export function isKlapPaymentsEnabled(): boolean {
  if (process.env.KLAP_PAYMENTS_ENABLED !== "true") {
    return false;
  }

  const apiKey = process.env.KLAP_API_KEY?.trim();
  return Boolean(apiKey);
}
