/**
 * Prueba de certificación Klap: crea una orden real en sandbox y opcionalmente
 * intenta el pago con tarjeta de prueba vía el formulario hospedado.
 *
 * Uso:
 *   node scripts/klap-certification-run.mjs
 *   node scripts/klap-certification-run.mjs --pay   # intenta pagar en navegador (playwright)
 */
import "dotenv/config";
import { createHash } from "crypto";
import { spawn } from "child_process";
import { writeFileSync } from "fs";

const KLAP_ORDERS_URL =
  process.env.KLAP_URL ??
  "https://api-pasarela-sandbox.mcdesaqa.cl/payment-gateway/v1/orders";

const API_KEY = process.env.KLAP_API_KEY;
const PRIVATE_KEY = process.env.KLAP_PRIVATE_KEY ?? process.env.KLAP_API_KEY;
const CALLBACK_BASE =
  process.env.KLAP_CALLBACK_BASE_URL ??
  process.env.BASE_URL ??
  "https://hotelcasaparaiso.cl";

const referenceId = `CERT-${Date.now()}`;
const amount = 50000;

async function createKlapOrder() {
  const body = {
    reference_id: referenceId,
    description: "Certificación Hotel Casa Paraíso",
    amount: { currency: "CLP", total: amount },
    methods: ["tarjetas"],
    user: {
      email: "certificacion@hotelcasaparaiso.cl",
      phone: "920060548",
      first_name: "Alfredo",
      last_name: "Hurtado",
    },
    urls: {
      return_url: `${CALLBACK_BASE}/checkout/success?reserva=${encodeURIComponent(referenceId)}&origen=klap`,
      cancel_url: `${CALLBACK_BASE}/checkout/error?reserva=${encodeURIComponent(referenceId)}&origen=klap`,
    },
    customs: [
      { key: "tarjetas_expiration_minutes", value: "30" },
      { key: "notify_payment_merchant", value: "true" },
    ],
    webhooks: {
      webhook_confirm: `${CALLBACK_BASE}/api/webhooks/klap-confirm`,
      webhook_reject: `${CALLBACK_BASE}/api/webhooks/klap-reject`,
    },
  };

  const response = await fetch(KLAP_ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok || !data.order_id) {
    throw new Error(
      data.message ?? `Error creando orden (${response.status})`,
    );
  }

  return data;
}

async function getOrderStatus(orderId) {
  const base = KLAP_ORDERS_URL.replace(/\/orders\/?$/, "");
  const response = await fetch(`${base}/orders/${orderId}`, {
    headers: { apikey: API_KEY },
  });
  return response.json();
}

async function tryPaymentWithPlaywright(redirectUrl) {
  const script = `
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(${JSON.stringify(redirectUrl)}, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  const cardInput = page.locator('input').filter({ hasText: '' }).first();
  const inputs = page.locator('input[type="text"], input[inputmode="numeric"], input[autocomplete*="cc"]');
  const count = await inputs.count();
  for (let i = 0; i < count; i++) {
    const el = inputs.nth(i);
    const ph = await el.getAttribute('placeholder').catch(() => '');
    const name = (ph || '').toLowerCase();
    if (name.includes('0000') || name.includes('tarjeta') || name.includes('card')) {
      await el.fill('4000 0000 0000 1000');
    }
  }

  await page.locator('input').filter({ has: page.locator('xpath=..') }).all();
  const allInputs = await page.locator('input:visible').all();
  for (const input of allInputs) {
    const placeholder = (await input.getAttribute('placeholder')) || '';
    const id = (await input.getAttribute('id')) || '';
    const label = placeholder + id;
    if (/card|tarjeta|0000/i.test(label)) await input.fill('4000 0000 0000 1000');
    if (/mm|venc|exp/i.test(label)) await input.fill('12/31');
    if (/cvv|cvc|cod/i.test(label)) await input.fill('123');
  }

  const payBtn = page.getByRole('button', { name: /pagar|pay/i });
  if (await payBtn.count()) {
    await payBtn.first().click();
    await page.waitForTimeout(15000);
  }

  console.log('FINAL_URL:', page.url());
  await browser.close();
})().catch(e => { console.error('PLAYWRIGHT_ERROR:', e.message); process.exit(1); });
`;

  writeFileSync("/tmp/klap-pay-test.cjs", script);

  return new Promise((resolve, reject) => {
    const child = spawn("node", ["/tmp/klap-pay-test.cjs"], {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("close", (code) => {
      if (code !== 0) reject(new Error(out || "Playwright falló"));
      else resolve(out);
    });
  });
}

async function main() {
  const withPay = process.argv.includes("--pay");

  if (!API_KEY) {
    console.error("KLAP_API_KEY no configurada en .env");
    process.exit(1);
  }

  console.log("=== Creando orden real en Klap sandbox ===");
  const order = await createKlapOrder();
  console.log("order_id:", order.order_id);
  console.log("reference_id:", referenceId);
  console.log("status:", order.status);
  console.log("redirect_url:", order.redirect_url);

  if (withPay) {
    console.log("\n=== Intentando pago con tarjeta de prueba (Playwright) ===");
    try {
      const result = await tryPaymentWithPlaywright(order.redirect_url);
      console.log(result);
    } catch (error) {
      console.warn("Pago automático no disponible:", error.message);
      console.warn("Completa el pago manualmente en:", order.redirect_url);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }

  console.log("\n=== Estado final de la orden ===");
  const finalOrder = await getOrderStatus(order.order_id);
  console.log("status:", finalOrder.status);
  if (finalOrder.payment_details) {
    console.log("payment_details:", JSON.stringify(finalOrder.payment_details));
  }

  const report = {
    generatedAt: new Date().toISOString(),
    order_id: order.order_id,
    reference_id: referenceId,
    amount,
    status: finalOrder.status,
    redirect_url: order.redirect_url,
    payment_message:
      finalOrder.payment_details?.find?.((d) => d.key === "message")?.value ??
      null,
    payment_code:
      finalOrder.payment_details?.find?.((d) => d.key === "code")?.value ?? null,
  };

  writeFileSync(
    "scripts/last-klap-certification.json",
    JSON.stringify(report, null, 2),
  );
  console.log("\nReporte guardado en scripts/last-klap-certification.json");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
