"use client";

import Script from "next/script";
import { useState } from "react";
import { useBookingStore } from "@/store/useBookingStore";

interface KlapProps {
  orderId: string;
}

export default function KlapButton({ orderId }: KlapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { totalPrice } = useBookingStore();

  const handlePayment = async () => {
    console.log("totalPrice", totalPrice);
    try {
      setIsLoading(true);
      const getOrderIdResponse = await fetch("/api/klap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const { order_id } = await getOrderIdResponse.json();

      // Verificamos que el ID exista en la respuesta
      const klapOrderId = String(order_id);

      if (typeof window !== "undefined" && (window as any).KLAP_FLEX) {
        // Intentamos con el formato de objeto que requiere la pasarela Multicaja
        (window as any).KLAP_FLEX.init({
          orderId: String(klapOrderId),
          sandbox: true, // Algunos scripts requieren este flag explícito
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Cargamos el script de forma optimizada */}
      <Script
        src="https://sandbox.mcdesaqa.cl/pagos/checkout-flex/v1/main.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
      />

      <button
        onClick={handlePayment}
        disabled={!isLoaded || !orderId}
        className="px-6 py-3 bg-[#01c676] text-white font-bold rounded-lg disabled:bg-gray-400 transition-colors cursor-pointer"
      >
        {isLoaded
          ? [isLoading ? "Cargando ..." : "PAGAR AHORA"]
          : "Cargando pasarela..."}
      </button>
    </>
  );
}
