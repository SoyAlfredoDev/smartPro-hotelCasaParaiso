import {
  getMinCheckInDate,
  isISODateBefore,
  isISODateOnOrBefore,
  toLocalISODate,
} from "@/utils/dateHelpers";

export const MAX_GUESTS = 10;
export const MIN_ADULTS = 1;
export const MIN_ROOMS = 1;
export const MAX_ROOMS = 10;

export interface SearchReservationInput {
  hotelId: string;
  adults: number;
  children: number;
  pets: number;
  rooms: number;
  dateCheckIn: string | null;
  dateCheckOut: string | null;
  numberNights: number | null;
}

export function getTotalGuests(adults: number, children: number): number {
  return adults + children;
}

export function validateSearchReservation(
  input: SearchReservationInput,
  minCheckIn: string = getMinCheckInDate(),
): string | null {
  if (!input.hotelId?.trim()) {
    return "Selecciona un hotel para continuar.";
  }

  if (!input.dateCheckIn || !input.dateCheckOut) {
    return "Selecciona las fechas de entrada y salida.";
  }

  if (isISODateBefore(input.dateCheckIn, minCheckIn)) {
    const now = new Date();
    const calendarToday = toLocalISODate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    );
    if (minCheckIn > calendarToday) {
      return "Después de las 18:00, el check-in disponible es a partir de mañana.";
    }
    return "La fecha de entrada no puede ser anterior a hoy.";
  }

  if (
    isISODateOnOrBefore(input.dateCheckOut, input.dateCheckIn) ||
    isISODateBefore(input.dateCheckOut, input.dateCheckIn)
  ) {
    return "La fecha de salida debe ser posterior a la de entrada.";
  }

  const totalGuests = getTotalGuests(input.adults, input.children);

  if (input.adults < MIN_ADULTS) {
    return "Debe haber al menos un adulto.";
  }

  if (totalGuests < 1) {
    return "Debe haber al menos un huésped.";
  }

  if (totalGuests > MAX_GUESTS) {
    return `El máximo permitido es ${MAX_GUESTS} huéspedes (adultos + niños).`;
  }

  if (input.rooms < MIN_ROOMS || input.rooms > MAX_ROOMS) {
    return `Indica entre ${MIN_ROOMS} y ${MAX_ROOMS} habitaciones.`;
  }

  if (input.adults < 0 || input.children < 0 || input.pets < 0) {
    return "Los valores de huéspedes no pueden ser negativos.";
  }

  if (!input.numberNights || input.numberNights < 1) {
    return "La estadía debe ser de al menos una noche.";
  }

  return null;
}
