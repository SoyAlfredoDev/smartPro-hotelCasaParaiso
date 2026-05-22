export function formatBookingDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStayNights(checkIn: string, checkOut: string): number {
  return Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        86400000,
    ),
  );
}

export function guestLabel(count: number): string {
  return count === 1 ? "1 invitado" : `${count} invitados`;
}
