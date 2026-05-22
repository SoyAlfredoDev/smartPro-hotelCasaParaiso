import { addDaysToISODate, getMinCheckInDate } from "./dateHelpers";

/**
 * Default check-in / check-out for the search bar (local timezone).
 */
export function calculateDate(now = new Date()) {
  const today = getMinCheckInDate(now);
  const tomorrow = addDaysToISODate(today, 1);
  return { today, tomorrow };
}
