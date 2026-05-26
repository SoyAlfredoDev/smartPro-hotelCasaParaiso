import {
  SpecialRequestAdminNotificationEmail,
  SpecialRequestConfirmationEmail,
} from "@/emails";
import { sendBookingNotifications } from "@/lib/resend/saveBookingToDatabase";

export interface HandleNewSpecialRequestInput {
  requestNumber: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  eventDate: string | Date;
  eventType: string;
  details: string;
  status?: string;
}

export async function handleNewSpecialRequest({
  requestNumber,
  applicantName,
  applicantEmail,
  applicantPhone,
  eventDate,
  eventType,
  details,
  status = "pendiente",
}: HandleNewSpecialRequestInput): Promise<boolean> {
  const eventDateValue =
    eventDate instanceof Date ? eventDate.toISOString() : eventDate;

  return sendBookingNotifications({
    clientEmailData: {
      from: "Hotel <reservas@hotelcasaparaiso.cl>",
      to: applicantEmail,
      subject: `Solicitud especial recibida ${requestNumber}`,
      react: SpecialRequestConfirmationEmail({
        requestNumber,
        applicantName,
        eventDate: eventDateValue,
        eventType,
        details,
      }),
    },
    adminEmailData: {
      from: "Sistema <notificaciones@hotelcasaparaiso.cl>",
      to: process.env.ADMIN_EMAIL ?? "contacto@hotelcasaparaiso.cl",
      subject: `Nueva solicitud especial ${requestNumber}`,
      react: SpecialRequestAdminNotificationEmail({
        requestNumber,
        applicantName,
        applicantEmail,
        applicantPhone,
        eventDate: eventDateValue,
        eventType,
        details,
        status,
      }),
    },
  });
}
