"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Home,
  Mail,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type ReservationModalState =
  | { type: "idle" }
  | {
      type: "success";
      bookingId: string;
      guestEmail: string;
      emailsSent?: boolean;
    }
  | {
      type: "error";
      message: string;
    };

interface ReservationResultModalProps {
  state: ReservationModalState;
  onClose: () => void;
  onRetry?: () => void;
}

export default function ReservationResultModal({
  state,
  onClose,
  onRetry,
}: ReservationResultModalProps) {
  const [copied, setCopied] = useState(false);
  const isOpen = state.type !== "idle";

  const handleCopyId = async (bookingId: string) => {
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-default bg-surface shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary cursor-pointer"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {state.type === "success" ? (
              <div className="p-8 pt-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-9 w-9 text-primary" strokeWidth={2} />
                </div>
                <h2
                  id="reservation-modal-title"
                  className="font-chillax text-2xl font-bold text-text-primary"
                >
                  ¡Reserva solicitada!
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Hemos recibido tu solicitud. Nuestro equipo la revisará y te
                  contactará para confirmar la disponibilidad.
                </p>

                <div className="mt-6 rounded-xl border border-default bg-surface-warm px-4 py-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Número de referencia
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <code className="truncate font-mono text-sm font-semibold text-text-primary">
                      {state.bookingId}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyId(state.bookingId)}
                      className="shrink-0 flex items-center gap-1 rounded-lg border border-default px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary cursor-pointer"
                    >
                      <Copy size={14} />
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>

                {state.emailsSent !== false ? (
                  <p className="mt-5 flex items-center justify-center gap-2 text-sm text-text-secondary">
                    <Mail size={16} className="text-primary" />
                    Enviamos la confirmación a{" "}
                    <span className="font-medium text-text-primary">
                      {state.guestEmail}
                    </span>
                  </p>
                ) : (
                  <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Tu reserva fue registrada correctamente, pero no pudimos
                    enviar el correo de confirmación. Guarda tu número de
                    referencia y contáctanos si necesitas ayuda.
                  </p>
                )}

                <Link
                  href="/"
                  onClick={onClose}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 cursor-pointer"
                >
                  <Home size={18} />
                  Volver al inicio
                </Link>
              </div>
            ) : state.type === "error" ? (
              <div className="p-8 pt-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <AlertCircle className="h-9 w-9 text-red-500" strokeWidth={2} />
                </div>
                <h2
                  id="reservation-modal-title"
                  className="font-chillax text-2xl font-bold text-text-primary"
                >
                  No pudimos completar la reserva
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {state.message}
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  Revisa tus datos e intenta nuevamente. Si el problema
                  persiste, contáctanos directamente.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onRetry?.();
                    }}
                    className="flex-1 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 cursor-pointer"
                  >
                    Intentar de nuevo
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-default px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-black/5 cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
