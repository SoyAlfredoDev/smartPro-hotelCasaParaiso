import "dotenv/config";
import { createHash } from "crypto";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const base = "http://localhost:3000";

const bookingId = `E2E-FULL-${Date.now()}`;

const booking = await prisma.booking.create({
  data: {
    id: bookingId,
    guestName: "Alfredo Hurtado",
    guestEmail: "alfredo.test@hotelcasaparaiso.cl",
    guestPhone: "920060548",
    checkIn: new Date("2026-06-01"),
    checkOut: new Date("2026-06-03"),
    guests: 2,
    totalPrice: 100000,
    roomId: "01",
    status: "pendiente_pago",
    paymentStatus: "pending",
  },
});

const orderRes = await fetch(`${base}/api/klap/create-order`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    referenceId: booking.id,
    description: `Reserva ${booking.id}`,
    amount: booking.totalPrice,
    guestEmail: booking.guestEmail,
    guestPhone: booking.guestPhone,
    guestFirstName: "Alfredo",
    guestLastName: "Hurtado",
  }),
});
const orderData = await orderRes.json();
console.log("create-order:", orderRes.status, orderData);

const webhookKey = process.env.KLAP_PRIVATE_KEY ?? process.env.KLAP_API_KEY;
const hashedKey = createHash("sha256").update(webhookKey).digest("hex");

const webhookRes = await fetch(`${base}/api/webhooks/klap-confirm`, {
  method: "POST",
  headers: { "Content-Type": "application/json", apikey: hashedKey },
  body: JSON.stringify({
    order_id: orderData.orderId,
    reference_id: booking.id,
  }),
});
console.log("webhook-confirm:", webhookRes.status, await webhookRes.json());

const updated = await prisma.booking.findUnique({ where: { id: booking.id } });
console.log("booking final:", {
  id: updated?.id,
  status: updated?.status,
  paymentStatus: updated?.paymentStatus,
  klapOrderId: updated?.klapOrderId,
});

await prisma.$disconnect();
await pool.end();
