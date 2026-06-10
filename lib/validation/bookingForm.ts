import type { SaveBookingInput } from "@/lib/db/saveBookingToDatabase";

export interface GuestFormData {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  comment: string;
}

export type GuestFormField = keyof GuestFormData;

export type GuestFormErrors = Partial<Record<GuestFormField | "_form", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+()-]{8,30}$/;

export const EMPTY_GUEST_FORM: GuestFormData = {
  firstName: "",
  lastName: "",
  documentType: "rut",
  documentNumber: "",
  email: "",
  phone: "",
  comment: "",
};

export function validateGuestForm(form: GuestFormData): GuestFormErrors {
  const errors: GuestFormErrors = {};

  if (!form.firstName.trim() || form.firstName.trim().length < 2) {
    errors.firstName = "Ingresa tu nombre (mínimo 2 caracteres).";
  }
  if (!form.lastName.trim() || form.lastName.trim().length < 2) {
    errors.lastName = "Ingresa tu apellido (mínimo 2 caracteres).";
  }
  if (!form.documentNumber.trim() || form.documentNumber.trim().length < 3) {
    errors.documentNumber = "Ingresa un número de documento válido.";
  }
  if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }
  const phoneDigits = form.phone.replace(/\D/g, "");
  if (
    !form.phone.trim() ||
    !PHONE_REGEX.test(form.phone.trim()) ||
    phoneDigits.length < 8
  ) {
    errors.phone = "Ingresa un teléfono válido (mínimo 8 dígitos).";
  }

  return errors;
}

export interface CheckoutContextInput {
  checkIn: string | null;
  checkOut: string | null;
  roomsSelected: { id: string } | null;
  peopleQuantity: number | null;
  nights: number | null;
}

export function validateCheckoutContext(
  context: CheckoutContextInput,
): string | null {
  if (!context.roomsSelected?.id) {
    return "No hay habitación seleccionada. Vuelve a buscar y elige una habitación.";
  }
  if (!context.checkIn || !context.checkOut) {
    return "Faltan las fechas de estadía. Realiza una nueva búsqueda.";
  }
  const checkInDate = new Date(context.checkIn);
  const checkOutDate = new Date(context.checkOut);
  if (
    Number.isNaN(checkInDate.getTime()) ||
    Number.isNaN(checkOutDate.getTime())
  ) {
    return "Las fechas de la reserva no son válidas.";
  }
  if (checkOutDate <= checkInDate) {
    return "La fecha de salida debe ser posterior al check-in.";
  }
  if (!context.peopleQuantity || context.peopleQuantity < 1) {
    return "Indica al menos un huésped en tu búsqueda.";
  }
  if (!context.nights || context.nights < 1) {
    return "La estadía debe ser de al menos una noche.";
  }
  return null;
}

export function validateSaveBookingInput(
  input: SaveBookingInput,
  options?: { requirePhone?: boolean },
): string | null {
  const requirePhone = options?.requirePhone ?? true;
  const guestName =
    input.guestName?.trim() ||
    [input.firstName, input.lastName].filter(Boolean).join(" ").trim();
  const guestEmail = (input.guestEmail ?? input.email ?? "").trim();
  const guestPhone = (input.guestPhone ?? input.phone ?? "").trim();
  const roomId = Array.isArray(input.roomId)
    ? String(input.roomId[0] ?? "")
    : String(input.roomId ?? "");

  if (!guestName || guestName.length < 3) {
    return "El nombre del huésped es obligatorio.";
  }
  if (!guestEmail || !EMAIL_REGEX.test(guestEmail)) {
    return "El correo electrónico no es válido.";
  }
  const phoneDigits = guestPhone.replace(/\D/g, "");
  if (requirePhone) {
    if (
      !guestPhone ||
      !PHONE_REGEX.test(guestPhone) ||
      phoneDigits.length < 8
    ) {
      return "El teléfono no es válido.";
    }
  } else if (guestPhone) {
    if (!PHONE_REGEX.test(guestPhone) || phoneDigits.length < 8) {
      return "El teléfono no es válido.";
    }
  }
  if (!input.checkIn || !input.checkOut) {
    return "Las fechas de check-in y check-out son obligatorias.";
  }
  const checkInDate = new Date(input.checkIn);
  const checkOutDate = new Date(input.checkOut);
  if (
    Number.isNaN(checkInDate.getTime()) ||
    Number.isNaN(checkOutDate.getTime())
  ) {
    return "Las fechas de la reserva no son válidas.";
  }
  if (checkOutDate <= checkInDate) {
    return "La fecha de salida debe ser posterior al check-in.";
  }
  if (!roomId) {
    return "Debe seleccionarse una habitación.";
  }
  if (!input.guests || input.guests < 1) {
    return "Debe indicarse al menos un huésped.";
  }
  return null;
}

export function hasValidationErrors(errors: GuestFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
