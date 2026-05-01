/**
 * Calculates the current date and tomorrow's date
 * @returns {Object} An object with today and tomorrow's dates
 */
export function calculateDate() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];
  return { today, tomorrow };
}
