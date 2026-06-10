const GENERIC_BOOKING_ERROR =
  "No pudimos completar tu reserva. Revisa tus datos e inténtalo nuevamente.";

const GENERIC_PAYMENT_ERROR =
  "No pudimos procesar el pago en este momento. Intenta nuevamente o contáctanos.";

const UNSAFE_PATTERNS =
  /apikey|api\s*key|klap|prisma|constraint|undefined|null|internal|token|secret|sandbox|multicaja|pasarela|webhook|database|sql/i;

const SAFE_VALIDATION_PREFIXES = [
  /^Ingresa /i,
  /^El correo/i,
  /^El teléfono/i,
  /^La fecha/i,
  /^No hay habitación/i,
  /^Debe /i,
  /^Faltan /i,
  /^Indica /i,
  /^La habitación/i,
  /^Las fechas/i,
  /^Ya existe una reserva/i,
];

export function toUserFacingBookingError(message?: string | null): string {
  if (!message?.trim()) return GENERIC_BOOKING_ERROR;
  if (UNSAFE_PATTERNS.test(message)) return GENERIC_BOOKING_ERROR;
  if (SAFE_VALIDATION_PREFIXES.some((pattern) => pattern.test(message))) {
    return message;
  }
  if (message.length > 160) return GENERIC_BOOKING_ERROR;
  return GENERIC_BOOKING_ERROR;
}

export function toUserFacingPaymentError(): string {
  return GENERIC_PAYMENT_ERROR;
}

export function shouldFallbackToDirectBooking(apiError?: string | null): boolean {
  if (!apiError) return true;
  return UNSAFE_PATTERNS.test(apiError) || /no está habilitado/i.test(apiError);
}
