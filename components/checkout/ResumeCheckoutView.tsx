"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import { formatCurrency } from "@/utils/formatCurrency";
import BookingButton from "@/components/bookingButton";

interface ResumeCheckoutViewProps {
  onReserve: () => void;
  isSubmitting: boolean;
  disableReserve?: boolean;
}

export default function ResumeCheckoutView({
  onReserve,
  isSubmitting,
  disableReserve = false,
}: ResumeCheckoutViewProps) {
  const nights = useBookingStore((state) => state.nights);
  const totalPrice = useBookingStore((state) => state.totalPrice) ?? 0;

  const subtotal = totalPrice / 1.19;
  const iva = totalPrice - subtotal;

  return (
    <div className="sticky top-24 rounded-2xl border border-default bg-surface p-6 shadow-lg min-h-[320px]">
      <h2 className="font-chillax text-2xl font-bold text-text-primary">
        Resumen de reserva
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        Solicitud sin pago en línea. El hotel confirmará disponibilidad.
      </p>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Alojamiento ({nights ?? 0} noches)</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <div className="my-6 overflow-hidden rounded-xl bg-gray-200 px-4 py-4 shadow-glow-primary">
          <div className="flex items-center justify-between">
            <span className="font-chillax text-xl">Total estimado</span>
            <motion.span
              key={totalPrice}
              initial={{ opacity: 0.5, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="font-chillax text-3xl font-bold text-primary"
            >
              {formatCurrency(totalPrice)}
            </motion.span>
          </div>
        </div>

        <AnimatePresence>
          {subtotal > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between text-text-secondary"
            >
              <span>Subtotal (neto)</span>
              <span className="font-medium text-text-primary">
                {formatCurrency(subtotal)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between text-text-secondary">
          <span>IVA (19%)</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(iva)}
          </span>
        </div>

        <div className="flex justify-between border-t border-default pt-4 text-text-secondary">
          <span>Total</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-text-secondary">
          Al confirmar, envías una solicitud de reserva. No se realizará ningún
          cargo hasta que el hotel valide tu estadía.
        </p>

        <div className="pt-2">
          <BookingButton
            onReserve={onReserve}
            isLoading={isSubmitting}
            disabled={disableReserve}
          />
        </div>
      </div>
    </div>
  );
}
