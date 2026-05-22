"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarRange,
  Hash,
  Loader2,
  Search,
  User,
} from "lucide-react";
import {
  validateBooking,
  type ValidatedBookingDetails,
} from "@/src/lib/actions/validateBooking";

const STATUS_STYLES: Record<
  string,
  { badge: string; dot: string }
> = {
  pendiente: {
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  confirmada: {
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
  },
  finalizada: {
    badge: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  cancelada: {
    badge: "bg-red-50 text-red-800 border-red-200",
    dot: "bg-red-500",
  },
};

function formatStayDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function BookingResultCard({ booking }: { booking: ValidatedBookingDetails }) {
  const statusStyle =
    STATUS_STYLES[booking.status] ?? STATUS_STYLES.pendiente;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-8 overflow-hidden rounded-2xl border border-default bg-surface shadow-card"
    >
      <div className="border-b border-light bg-surface-warm px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Reserva encontrada
        </p>
        <p className="mt-1 font-chillax text-lg font-bold text-text-primary">
          Nº {booking.reservationId}
        </p>
      </div>

      <div className="space-y-5 px-6 py-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <User className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              Huésped
            </p>
            <p className="mt-0.5 text-base font-semibold text-text-primary">
              {booking.guestName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <CalendarRange className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              Estadía
            </p>
            <p className="mt-1 text-sm text-text-primary">
              <span className="font-semibold">Entrada:</span>{" "}
              {formatStayDate(booking.checkIn)}
            </p>
            <p className="mt-1 text-sm text-text-primary">
              <span className="font-semibold">Salida:</span>{" "}
              {formatStayDate(booking.checkOut)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-light bg-surface-warm px-4 py-3">
          <span className="text-sm font-medium text-text-secondary">
            Estado de la reserva
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.badge}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
              aria-hidden
            />
            {booking.statusLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BookingValidationView() {
  const [lastName, setLastName] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<ValidatedBookingDetails | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBooking(null);

    startTransition(async () => {
      const result = await validateBooking({ lastName, reservationNumber });

      if (result.success) {
        setBooking(result.booking);
      } else {
        setError(result.error);
      }
    });
  };

  const handleFieldChange = () => {
    if (error) setError(null);
    if (booking) setBooking(null);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--primary)]/8 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="decorative-line mx-auto mb-4" />
          <h1 className="font-chillax text-2xl font-bold text-text-primary md:text-3xl">
            Consulta tu reserva
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
            Ingresa el apellido con el que reservaste y el número de reserva que
            recibiste por correo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-default bg-surface p-6 shadow-card md:p-8"
          noValidate
        >
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 flex items-start gap-2 overflow-hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden
                />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-semibold text-text-primary"
              >
                Apellido
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
                  aria-hidden
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Ej. González"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleFieldChange();
                  }}
                  disabled={isPending}
                  className="w-full rounded-xl border border-default bg-white py-3 pl-10 pr-4 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reservationNumber"
                className="mb-2 block text-sm font-semibold text-text-primary"
              >
                Número de reserva
              </label>
              <div className="relative">
                <Hash
                  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
                  aria-hidden
                />
                <input
                  id="reservationNumber"
                  name="reservationNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Ej. 1001"
                  value={reservationNumber}
                  onChange={(e) => {
                    setReservationNumber(e.target.value.replace(/\D/g, ""));
                    handleFieldChange();
                  }}
                  disabled={isPending}
                  className="w-full rounded-xl border border-default bg-white py-3 pl-10 pr-4 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(47,93,80,0.1)] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary mt-6 w-full gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
                Buscando reserva...
              </>
            ) : (
              <>
                <Search className="h-[18px] w-[18px]" aria-hidden />
                Consultar reserva
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {booking && <BookingResultCard key="result" booking={booking} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
