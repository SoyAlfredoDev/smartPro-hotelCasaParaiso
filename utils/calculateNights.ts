export function calculateNights(dateCheckIn: string, dateCheckOut: string) {
  const checkInDate = new Date(dateCheckIn);
  const checkOutDate = new Date(dateCheckOut);
  const difference = checkOutDate.getTime() - checkInDate.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  return days;
}
