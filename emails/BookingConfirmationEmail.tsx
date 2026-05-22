import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { DetailRow } from "./DetailRow";
import { EmailLayout } from "./EmailLayout";
import { HOTEL_NAME, HOTEL_WEBSITE } from "./constants";
import type { BookingConfirmationEmailProps } from "./types";
import {
  formatBookingDate,
  getStayNights,
  guestLabel,
} from "./utils";

export function BookingConfirmationEmail({
  guestName,
  checkIn,
  checkOut,
  roomName,
  roomCategory,
  guests,
  bookingId,
}: BookingConfirmationEmailProps) {
  const nights = getStayNights(checkIn, checkOut);
  const roomLabel = roomCategory ? `${roomName} (${roomCategory})` : roomName;
  const firstName = guestName.trim().split(/\s+/)[0] ?? guestName;

  return (
    <EmailLayout
      preview={`Tu reserva en ${HOTEL_NAME} está pendiente de validación.`}
      headline="Confirmación de reserva"
    >
      <Heading className="text-brand-dark text-[20px] font-bold m-0 mb-4">
        Hola, {firstName}
      </Heading>

      <Text className="text-[#374151] text-[15px] leading-relaxed m-0 mb-6">
        Gracias por elegir {HOTEL_NAME}. Hemos recibido tu solicitud de reserva
        y nuestro equipo la está revisando. Te contactaremos a la brevedad para
        confirmar la disponibilidad y los detalles de tu estadía.
      </Text>

      <Section className="bg-brand-surface rounded-lg px-5 py-5 mb-6">
        <Text className="text-brand-secondary text-[13px] font-bold uppercase tracking-wide m-0 mb-4">
          Resumen de tu reserva
        </Text>
        <DetailRow label="Check-in" value={formatBookingDate(checkIn)} />
        <DetailRow label="Check-out" value={formatBookingDate(checkOut)} />
        <DetailRow
          label="Estadía"
          value={`${nights} ${nights === 1 ? "noche" : "noches"}`}
        />
        <DetailRow label="Habitación" value={roomLabel} />
        <DetailRow label="Invitados" value={guestLabel(guests)} />
        {bookingId ? (
          <DetailRow label="Referencia" value={bookingId} />
        ) : null}
      </Section>

      <Section className="border border-solid border-[#b8f5dc] bg-[#f0fdf8] rounded-lg px-5 py-4 mb-6">
        <Text className="text-brand-dark text-[14px] font-semibold m-0 mb-2">
          Estado: pendiente de validación
        </Text>
        <Text className="text-[#374151] text-[14px] leading-relaxed m-0">
          Tu reserva aún no está confirmada. Una vez validada, recibirás un
          correo con los pasos siguientes para completar tu estadía con
          tranquilidad.
        </Text>
      </Section>

      <Text className="text-[#374151] text-[15px] leading-relaxed m-0 mb-6">
        Si tienes alguna consulta o deseas modificar tu solicitud, responde a
        este correo o escríbenos; estaremos encantados de ayudarte.
      </Text>

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
        Te esperamos en Santiago para una experiencia acogedora y memorable.
      </Text>
    </EmailLayout>
  );
}

export default BookingConfirmationEmail;
