const CHILEAN_MOBILE_REGEX = /^9\d{8}$/;
const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15;

export function normalizePhoneForKlap(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length < MIN_PHONE_DIGITS) {
    throw new Error("Ingresa un teléfono válido (mínimo 8 dígitos).");
  }

  if (digits.startsWith("569") && digits.length === 11) {
    return digits.slice(2);
  }

  if (digits.startsWith("56") && digits.length === 11) {
    const local = digits.slice(2);
    if (CHILEAN_MOBILE_REGEX.test(local)) return local;
  }

  if (CHILEAN_MOBILE_REGEX.test(digits)) {
    return digits;
  }

  if (digits.length === 8) {
    const local = `9${digits}`;
    if (CHILEAN_MOBILE_REGEX.test(local)) return local;
  }

  return digits.slice(0, MAX_PHONE_DIGITS);
}
