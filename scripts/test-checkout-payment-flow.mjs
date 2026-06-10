import "dotenv/config";
import { createHash } from "crypto";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const base = process.env.BASE_URL ?? "http://localhost:3000";

const bookingPayload = {
  firstName: "Test",
  lastName: "Checkout",
  email: "checkout.test@hotelcasaparaiso.cl",
  phone: "912345678",
  checkIn: "2026-07-01",
  checkOut: "2026-07-03",
  guests: 2,
  totalPrice: 100000,
  roomId: "01",
  comment: "[RUT] 11111111-1",
};

async function createOrder() {
  const response = await fetch(`${base}/api/klap/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      booking: bookingPayload,
      description: "Reserva Hotel Casa Paraíso",
      amount: bookingPayload.totalPrice,
      guestEmail: bookingPayload.email,
      guestPhone: bookingPayload.phone,
      guestFirstName: bookingPayload.firstName,
      guestLastName: bookingPayload.lastName,
    }),
  });

  const data = await response.json();
  return { status: response.status, data };
}

async function confirmPayment(referenceId, orderId) {
  const response = await fetch(`${base}/api/klap/confirm-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ referenceId, orderId }),
  });

  const data = await response.json();
  return { status: response.status, data };
}

async function rejectPayment(referenceId, orderId) {
  const response = await fetch(`${base}/api/klap/reject-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referenceId,
      orderId,
      reason: "Pago rechazado en prueba",
    }),
  });

  const data = await response.json();
  return { status: response.status, data };
}

async function webhookConfirm(referenceId, orderId) {
  const webhookKey = process.env.KLAP_PRIVATE_KEY ?? process.env.KLAP_API_KEY;
  const hashedKey = createHash("sha256").update(webhookKey).digest("hex");

  const response = await fetch(`${base}/api/webhooks/klap-confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: hashedKey },
    body: JSON.stringify({ order_id: orderId, reference_id: referenceId }),
  });

  const data = await response.json();
  return { status: response.status, data };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log("=== Test 1: create-order (no booking yet) ===");
const order1 = await createOrder();
console.log(order1);
assert(order1.status === 200, "create-order should return 200");
assert(order1.data.referenceId, "create-order should return referenceId");

const referenceId = order1.data.referenceId;
const orderId = order1.data.orderId;

let pending = await prisma.pendingCheckout.findUnique({
  where: { id: referenceId },
});
let booking = await prisma.booking.findUnique({ where: { id: referenceId } });
assert(pending, "PendingCheckout should exist after create-order");
assert(!booking, "Booking should NOT exist before payment");

console.log("\n=== Test 2: duplicate create-order should not collide ===");
const order2 = await createOrder();
console.log(order2);
assert(order2.status === 200, "second create-order should return 200");
assert(
  order2.data.referenceId !== referenceId,
  "second create-order should use a new referenceId",
);

console.log("\n=== Test 3: reject-payment cleans pending checkout ===");
const reject = await rejectPayment(referenceId, orderId);
console.log(reject);
assert(reject.status === 200, "reject-payment should return 200");

pending = await prisma.pendingCheckout.findUnique({ where: { id: referenceId } });
booking = await prisma.booking.findUnique({ where: { id: referenceId } });
assert(!pending, "PendingCheckout should be deleted after reject");
assert(!booking, "Booking should still not exist after reject");

console.log("\n=== Test 4: confirm-payment without paid order should fail ===");
const order3 = await createOrder();
assert(order3.status === 200, "third create-order should return 200");
const confirmFail = await confirmPayment(
  order3.data.referenceId,
  order3.data.orderId,
);
console.log(confirmFail);
assert(confirmFail.status === 400, "confirm-payment should fail without paid order");

booking = await prisma.booking.findUnique({
  where: { id: order3.data.referenceId },
});
assert(!booking, "Booking should not be created when payment is not confirmed");

console.log("\n=== Test 5: webhook confirm without paid order must fail ===");
const webhook = await webhookConfirm(
  order3.data.referenceId,
  order3.data.orderId,
);
console.log(webhook);
assert(
  webhook.status >= 400,
  "webhook confirm should fail when Klap order is still pending",
);

booking = await prisma.booking.findUnique({
  where: { id: order3.data.referenceId },
});
pending = await prisma.pendingCheckout.findUnique({
  where: { id: order3.data.referenceId },
});
assert(!booking, "Booking should not exist when payment is not confirmed");
assert(pending, "PendingCheckout should remain until payment is confirmed");

console.log("\n=== Test 6: reject second pending checkout ===");
const reject2 = await rejectPayment(
  order3.data.referenceId,
  order3.data.orderId,
);
console.log(reject2);
assert(reject2.status === 200, "reject-payment should return 200");

pending = await prisma.pendingCheckout.findUnique({
  where: { id: order3.data.referenceId },
});
assert(!pending, "PendingCheckout should be deleted after reject");

console.log("\nAll automated checkout payment flow tests passed.");
console.log(
  "Manual step: open redirectUrl in browser and pay with test card 4000 0000 0000 1000 to validate confirm-payment end-to-end.",
);

await prisma.$disconnect();
await pool.end();
