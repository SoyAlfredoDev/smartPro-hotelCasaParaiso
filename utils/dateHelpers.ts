/** ISO date (YYYY-MM-DD) in the user's local timezone */
export function toLocalISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseLocalISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDaysToISODate(iso: string, days: number): string {
  const date = parseLocalISODate(iso);
  date.setDate(date.getDate() + days);
  return toLocalISODate(date);
}

/** After 18:00, same-day check-in is not allowed (min check-in is tomorrow). */
export const SAME_DAY_CHECKIN_CUTOFF_HOUR = 18;

export function getMinCheckInDate(now = new Date()): string {
  const min = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (now.getHours() >= SAME_DAY_CHECKIN_CUTOFF_HOUR) {
    min.setDate(min.getDate() + 1);
  }
  return toLocalISODate(min);
}

export function getMinCheckOutDate(checkIn: string): string {
  return addDaysToISODate(checkIn, 1);
}

export function isISODateBefore(a: string, b: string): boolean {
  return a < b;
}

export function isISODateOnOrBefore(a: string, b: string): boolean {
  return a <= b;
}
