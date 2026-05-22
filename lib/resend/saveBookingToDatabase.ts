import type { ReactElement } from "react";
import { resend } from "@/lib/resend/resend";

interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  react: ReactElement;
}

export async function sendBookingNotifications({
  clientEmailData,
  adminEmailData,
}: {
  clientEmailData: EmailPayload;
  adminEmailData: EmailPayload;
}): Promise<boolean> {
  try {
    await Promise.all([
      resend.emails.send(clientEmailData),
      resend.emails.send(adminEmailData),
    ]);
    return true;
  } catch (error) {
    console.error("Error enviando correos:", error);
    return false;
  }
}
