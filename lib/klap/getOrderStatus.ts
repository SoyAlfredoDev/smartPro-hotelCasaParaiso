import { getKlapApiKey, getKlapOrdersUrl } from "@/lib/klap/config";

export type KlapOrderStatus =
  | "pending"
  | "completed"
  | "rejected"
  | "expired"
  | "cancelled"
  | string;

export interface KlapOrderDetails {
  status: KlapOrderStatus;
  order_id: string;
  reference_id?: string;
}

const PAID_STATUSES = new Set(["completed", "paid", "success"]);
const REJECTED_STATUSES = new Set([
  "rejected",
  "expired",
  "cancelled",
  "failed",
  "refund",
]);

export function isKlapOrderPaid(status: string) {
  return PAID_STATUSES.has(status.toLowerCase());
}

export function isKlapOrderRejected(status: string) {
  return REJECTED_STATUSES.has(status.toLowerCase());
}

export async function getKlapOrderStatus(
  orderId: string,
): Promise<KlapOrderDetails> {
  const baseUrl = getKlapOrdersUrl().replace(/\/orders\/?$/, "");
  const apiKey = getKlapApiKey();

  const response = await fetch(`${baseUrl}/orders/${orderId}`, {
    headers: { apikey: apiKey },
    cache: "no-store",
  });

  const data = (await response.json()) as KlapOrderDetails & {
    message?: string;
  };

  if (!response.ok || !data.order_id) {
    throw new Error(data.message ?? `No se pudo consultar la orden (${response.status})`);
  }

  return data;
}
