import { prisma } from "@/lib/prisma";

export default async function generateReservationNumber(): Promise<number> {
  const [result] = await prisma.$queryRaw<Array<{ nextId: number }>>`
    SELECT GREATEST(
      COALESCE(
        MAX(CASE WHEN id ~ '^[0-9]+$' THEN id::integer END),
        999
      ),
      999
    ) + 1 AS "nextId"
    FROM (
      SELECT id FROM "Booking"
      UNION ALL
      SELECT id FROM "PendingCheckout"
    ) AS reservation_ids
  `;

  return Number(result?.nextId ?? 1000);
}
