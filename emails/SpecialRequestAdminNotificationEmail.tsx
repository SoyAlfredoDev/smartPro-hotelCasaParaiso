import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { DetailRow } from "./DetailRow";
import { EmailLayout } from "./EmailLayout";
import { DEFAULT_ADMIN_PANEL_URL } from "./constants";
import type { SpecialRequestAdminNotificationEmailProps } from "./types";
import { formatBookingDate } from "./utils";

const STATUS_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  contactada: "Contactada",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

export function SpecialRequestAdminNotificationEmail({
  requestNumber,
  applicantName,
  applicantEmail,
  applicantPhone,
  eventDate,
  eventType,
  details,
  status = "pendiente",
  adminPanelUrl = DEFAULT_ADMIN_PANEL_URL,
}: SpecialRequestAdminNotificationEmailProps) {
  const statusLabel = STATUS_LABELS[status] ?? status;

  return (
    <EmailLayout
      preview={`Nueva solicitud especial ${requestNumber} de ${applicantName}`}
      headline="Nueva solicitud especial"
    >
      <Heading className="text-brand-dark text-[20px] font-bold m-0 mb-2">
        Solicitud pendiente de gestión
      </Heading>

      <Text className="text-[#374151] text-[15px] leading-relaxed m-0 mb-6">
        Se ha registrado una nueva solicitud especial para eventos. Revisa los
        datos a continuación y contacta al solicitante para avanzar con la
        propuesta.
      </Text>

      <Section className="bg-brand-surface rounded-lg px-5 py-5 mb-5">
        <Text className="text-brand-secondary text-[13px] font-bold uppercase tracking-wide m-0 mb-4">
          Datos del solicitante
        </Text>
        <DetailRow label="Nombre" value={applicantName} />
        <DetailRow label="Correo" value={applicantEmail} />
        <DetailRow label="Teléfono" value={applicantPhone || "—"} />
        <DetailRow label="Número de seguimiento" value={requestNumber} />
        <DetailRow label="Estado" value={statusLabel} />
      </Section>

      <Section className="bg-brand-surface rounded-lg px-5 py-5 mb-5">
        <Text className="text-brand-secondary text-[13px] font-bold uppercase tracking-wide m-0 mb-4">
          Detalle del evento
        </Text>
        <DetailRow label="Fecha del evento" value={formatBookingDate(eventDate)} />
        <DetailRow label="Tipo de evento" value={eventType} />
        <DetailRow label="Detalles" value={details} />
      </Section>

      <Hr className="border-[#e5e7eb] my-6" />

      <Section className="text-center">
        <Button
          href={adminPanelUrl}
          className="bg-brand-secondary text-white text-[14px] font-semibold rounded-lg px-6 py-3 no-underline box-border"
        >
          Revisar en el panel
        </Button>
        <Text className="text-brand-muted text-[12px] mt-3 mb-0">
          Enlace de administración (configurable):{" "}
          <span className="text-brand-dark">{adminPanelUrl}</span>
        </Text>
      </Section>
    </EmailLayout>
  );
}

export default SpecialRequestAdminNotificationEmail;
