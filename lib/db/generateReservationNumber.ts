import { prisma } from "@/lib/prisma";

export default async function generateReservationNumber(): Promise<number> {
  const totalBookings = await prisma.booking.count();
  console.log("totalBookings", totalBookings);

  return totalBookings + 1000;
}
