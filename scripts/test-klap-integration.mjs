import "dotenv/config";
import { createHash } from "crypto";

const base = "http://localhost:3000";

async function main() {
  const referenceId = `E2E-${Date.now()}`;

  const orderRes = await fetch(`${base}/api/klap/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referenceId,
      description: "Prueba integración Klap",
      amount: 100000,
      guestEmail: "alfredo.test@hotelcasaparaiso.cl",
      guestPhone: "+56 9 2006 0548",
      guestFirstName: "Alfredo",
      guestLastName: "Hurtado",
    }),
  });
  const orderData = await orderRes.json();
  console.log("1) create-order:", orderRes.status, orderData);
  if (!orderRes.ok) process.exit(1);

  const webhookKey = process.env.KLAP_PRIVATE_KEY ?? process.env.KLAP_API_KEY;
  const hashedKey = createHash("sha256").update(webhookKey).digest("hex");

  const webhookRes = await fetch(`${base}/api/webhooks/klap-confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: hashedKey,
    },
    body: JSON.stringify({
      order_id: orderData.orderId,
      reference_id: referenceId,
    }),
  });
  const webhookData = await webhookRes.json();
  console.log("2) webhook-confirm:", webhookRes.status, webhookData);

  const confirmRes = await fetch(`${base}/api/klap/confirm-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referenceId,
      orderId: orderData.orderId,
    }),
  });
  const confirmData = await confirmRes.json();
  console.log("3) confirm-payment (sin reserva previa):", confirmRes.status, confirmData);

  console.log("\nIntegración API Klap OK");
  console.log("redirectUrl para prueba manual:", orderData.redirectUrl);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
