"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import { formatCurrency } from "@/utils/formatCurrency";
import KlapButton from "@/components/klap/klap";
import Image from "next/image";

export default function ResumeCheckoutView() {
  const roomsSelected = useBookingStore((state) => state.roomsSelected);
  const nights = useBookingStore((state) => state.nights);
  const totalPrice = useBookingStore((state) => state.totalPrice);

  const subtotal = totalPrice / 1.19;
  const iva = totalPrice - subtotal;

  return (
    <div className="rounded-2xl border border-default bg-surface p-6 shadow-lg min-h-[400px]">
      <h2 className="font-chillax text-2xl font-bold text-text-primary">
        Resumen de Pago
      </h2>

      {/* Desglose */}
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Alojamiento ({nights} noches)</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(totalPrice)}
          </span>
        </div>
        {/* Total animado */}
        <div className="my-6 overflow-hidden rounded-xl mx-[-10] px-4 py-4 bg-gray-200  shadow-glow-primary">
          <div className="flex items-center justify-between">
            <span className="font-chillax text-xl">Total Final</span>
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
        {/* Habitaciones
        {roomsSelected?.filter(Boolean).length > 0 && (
          <div className="pl-3 border-l-2 border-primary/20 space-y-2 mt-2">
            {roomsSelected.filter(Boolean).map((room, idx) => (
              <div
                key={idx}
                className="flex justify-between text-xs text-text-secondary"
              >
                <span>
                  {room.quantity}x {room.name}
                </span>
                <span>
                  {formatCurrency(room.price * room.quantity * nights)}
                </span>
              </div>
            ))}
          </div>
        )} */}
        {/* Subtotal animado */}
        <AnimatePresence>
          {subtotal > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between text-text-secondary"
            >
              <span>Subtotal</span>
              <span className="font-medium text-text-primary">
                {formatCurrency(subtotal)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {/* IVA */}
        <div className="flex justify-between text-text-secondary">
          <span>IVA (19%)</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(iva)}
          </span>
        </div>
        {/* Total final (resumen abajo) */}
        <div className="flex justify-between border-t border-default pt-4 text-text-secondary">
          <span>Total</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(totalPrice)}
          </span>
        </div>
        <div className="relative flex flex-col w-full justify-center items-center ">
          <Image
            src="/images/logo_klap.png"
            alt="Hotel Casa Paraiso"
            width={70}
            height={70}
            className="w-[70%] z-10 "
          />
          <KlapButton orderId="123" />
        </div>
      </div>
    </div>
  );
}
