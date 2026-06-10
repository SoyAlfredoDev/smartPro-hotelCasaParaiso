import { createHash } from "crypto";
import { getKlapWebhookSecret } from "@/lib/klap/config";

export function isValidKlapWebhookApiKey(headerValue: string | null): boolean {
  if (!headerValue) return false;

  const secret = getKlapWebhookSecret();
  if (!secret) return false;

  if (headerValue === secret) return true;

  const hashed = createHash("sha256").update(secret).digest("hex");
  return headerValue === hashed;
}
