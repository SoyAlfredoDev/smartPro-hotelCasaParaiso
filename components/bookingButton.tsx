"use client";

import { Loader2 } from "lucide-react";

interface BookingButtonProps {
  onReserve: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function BookingButton({
  onReserve,
  isLoading,
  disabled = false,
}: BookingButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      onClick={onReserve}
      disabled={isDisabled}
      aria-busy={isLoading}
      className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70 cursor-pointer"
    >
      {isLoading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Procesando solicitud...
        </span>
      ) : (
        "Confirmar reserva"
      )}
    </button>
  );
}
