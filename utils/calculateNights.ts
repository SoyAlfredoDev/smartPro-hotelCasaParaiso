import { parseLocalISODate } from "./dateHelpers";

export function calculateNights(dateCheckIn: string, dateCheckOut: string) {
  const checkInDate = parseLocalISODate(dateCheckIn);
  const checkOutDate = parseLocalISODate(dateCheckOut);
  const difference = checkOutDate.getTime() - checkInDate.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}
