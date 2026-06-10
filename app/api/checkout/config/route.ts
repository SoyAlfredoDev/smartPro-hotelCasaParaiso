import { NextResponse } from "next/server";
import { isKlapPaymentsEnabled } from "@/lib/klap/isKlapPaymentsEnabled";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    paymentsEnabled: isKlapPaymentsEnabled(),
  });
}
