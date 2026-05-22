import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { DetailRow } from "./DetailRow";
import { EmailLayout } from "./EmailLayout";
import { DEFAULT_ADMIN_PANEL_URL } from "./constants";
import type { BookingAdminNotificationEmailProps } from "./types";
import {
  formatBookingDate,
  formatCLP,
  getStayNights,
  guestLabel,
} from "./utils";

const STATUS_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

export function BookingAdminNotificationEmail({
  bookingId,
  guestName,
  guestEmail,
  guestPhone,
  checkIn,
  checkOut,
  guests,
  totalPrice,
  roomName,
  roomCategory,
  roomId,
  status = "pendiente",
  notes,
  adminPanelUrl = DEFAULT_ADMIN_PANEL_URL,
}: BookingAdminNotificationEmailProps) {
  const nights = getStayNights(checkIn, checkOut);
  const statusLabel = STATUS_LABELS[status] ?? status;

  return (
    <EmailLayout
      preview={`Nueva reserva de ${guestName} — ${roomName}`}
      headline="Nueva reserva recibida"
    >
      <Heading className="text-brand-dark text-[20px] font-bold m-0 mb-2">
        Solicitud pendiente de gestión
      </Heading>

      <Text className="text-[#374151] text-[15px] leading-relaxed m-0 mb-6">
        Se ha registrado una nueva reserva en el sistema. Revisa los datos a
        continuación y valida la disponibilidad desde el panel administrativo.
      </Text>

      <Section className="bg-brand-surface rounded-lg px-5 py-5 mb-5">
        <Text className="text-brand-secondary text-[13px] font-bold uppercase tracking-wide m-0 mb-4">
          Datos del cliente
        </Text>
        <DetailRow label="Nombre" value={guestName} />
        <DetailRow label="Correo" value={guestEmail} />
        <DetailRow label="Teléfono" value={guestPhone || "—"} />
        <DetailRow label="ID de reserva" value={bookingId} />
        <DetailRow label="Estado" value={statusLabel} />
      </Section>

      <Section className="bg-brand-surface rounded-lg px-5 py-5 mb-5">
        <Text className="text-brand-secondary text-[13px] font-bold uppercase tracking-wide m-0 mb-4">
          Detalle de la habitación
        </Text>
        <DetailRow label="Habitación" value={roomName} />
        <DetailRow label="Categoría" value={roomCategory} />
        <DetailRow label="ID habitación" value={roomId} />
        <DetailRow label="Check-in" value={formatBookingDate(checkIn)} />
        <DetailRow label="Check-out" value={formatBookingDate(checkOut)} />
        <DetailRow
          label="Estadía"
          value={`${nights} ${nights === 1 ? "noche" : "noches"}`}
        />
        <DetailRow label="Invitados" value={guestLabel(guests)} />
        <DetailRow label="Total estimado" value={formatCLP(totalPrice)} />
        {notes ? <DetailRow label="Notas del huésped" value={notes} /> : null}
      </Section>

      <Hr className="border-[#e5e7eb] my-6" />

      <Section className="text-center">
        <Button
          href={adminPanelUrl}
          className="bg-brand-secondary text-white text-[14px] font-semibold rounded-lg px-6 py-3 no-underline box-border"
        >
          Gestionar reserva en el panel
        </Button>
        <Text className="text-brand-muted text-[12px] mt-3 mb-0">
          Enlace de administración (configurable):{" "}
          <span className="text-brand-dark">{adminPanelUrl}</span>
        </Text>
      </Section>
    </EmailLayout>
  );
}

export default BookingAdminNotificationEmail;
