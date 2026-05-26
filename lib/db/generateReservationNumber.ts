import { prisma } from "@/lib/prisma";

export default async function generateReservationNumber(): Promise<number> {
  const [result] = await prisma.$queryRaw<Array<{ nextId: number }>>`
    SELECT GREATEST(
      COALESCE(MAX(CASE WHEN id ~ '^[0-9]+$' THEN id::integer END), 999),
      999
    ) + 1 AS "nextId"
    FROM "Booking"
  `;

  return Number(result?.nextId ?? 1000);
}
