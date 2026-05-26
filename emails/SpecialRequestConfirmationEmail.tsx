import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { DetailRow } from "./DetailRow";
import { EmailLayout } from "./EmailLayout";
import { HOTEL_NAME, HOTEL_WEBSITE } from "./constants";
import type { SpecialRequestConfirmationEmailProps } from "./types";
import { formatBookingDate } from "./utils";

export function SpecialRequestConfirmationEmail({
  requestNumber,
  applicantName,
  eventDate,
  eventType,
  details,
}: SpecialRequestConfirmationEmailProps) {
  const firstName = applicantName.trim().split(/\s+/)[0] ?? applicantName;

  return (
    <EmailLayout
      preview={`Recibimos tu solicitud especial ${requestNumber}.`}
      headline="Solicitud especial recibida"
    >
      <Heading className="text-brand-dark text-[20px] font-bold m-0 mb-4">
        Hola, {firstName}
      </Heading>

      <Text className="text-[#374151] text-[15px] leading-relaxed m-0 mb-6">
        Gracias por contactar a {HOTEL_NAME}. Hemos recibido tu solicitud de
        evento y nuestro equipo la revisará para preparar una propuesta.
      </Text>

      <Section className="bg-brand-surface rounded-lg px-5 py-5 mb-6">
        <Text className="text-brand-secondary text-[13px] font-bold uppercase tracking-wide m-0 mb-4">
          Resumen de tu solicitud
        </Text>
        <DetailRow label="Número de seguimiento" value={requestNumber} />
        <DetailRow label="Fecha del evento" value={formatBookingDate(eventDate)} />
        <DetailRow label="Tipo de evento" value={eventType} />
        <DetailRow label="Detalles" value={details} />
      </Section>

      <Section className="border border-solid border-[#b8f5dc] bg-[#f0fdf8] rounded-lg px-5 py-4 mb-6">
        <Text className="text-brand-dark text-[14px] font-semibold m-0 mb-2">
          Estado: pendiente de revisión
        </Text>
        <Text className="text-[#374151] text-[14px] leading-relaxed m-0">
          Un asesor revisará la información y te contactará para coordinar los
          siguientes pasos.
        </Text>
      </Section>

      <Hr className="border-[#e5e7eb] my-6" />

      <Section className="text-center">
        <Button
          href={HOTEL_WEBSITE}
          className="bg-brand-primary text-white text-[14px] font-semibold rounded-lg px-6 py-3 no-underline box-border"
        >
          Visitar nuestro sitio
        </Button>
      </Section>

      <Text className="text-brand-muted text-[13px] text-center leading-relaxed mt-6 mb-0">
        Conserva tu número de seguimiento para futuras consultas.
      </Text>
    </EmailLayout>
  );
}

export default SpecialRequestConfirmationEmail;
