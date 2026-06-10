"use client";

import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPageClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("reserva");
  const orderId = searchParams.get("orden") ?? searchParams.get("order_id");
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (!bookingId) return;

    const reject = async () => {
      try {
        await fetch("/api/klap/reject-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId: bookingId,
            orderId,
            reason: "Pago rechazado o cancelado",
          }),
        });
      } catch {
        /* best effort */
      } finally {
        setProcessed(true);

        if (window.parent !== window) {
          window.parent.postMessage(
            JSON.stringify({
              action: "payment-reject",
              status: "REJECT",
              data: { reference_id: bookingId, order_id: orderId },
            }),
            window.location.origin,
          );
        }
      }
    };

    void reject();
  }, [bookingId, orderId]);

  return (
    <div className="min-h-screen bg-gray-500 px-4 py-8">
      <NavBar />
      <div className="mx-auto mt-16 max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50">
          <svg
            className="h-7 w-7 text-yellow-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3l9 16H3l9-16z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-xl font-semibold text-neutral-900">
          Pago no completado
        </h1>
        <p className="mb-6 text-sm text-neutral-500">
          Klap rechazó el pago. Tu reserva{" "}
          <strong>no fue confirmada</strong>
          {processed ? " y los datos temporales fueron descartados" : ""}.
        </p>
        <p className="mb-6 rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
          Si usas tarjeta de prueba, prueba también Mastercard{" "}
          <span className="font-mono">5555 5555 6118 3758</span> o Visa 3DS{" "}
          <span className="font-mono">4000 0000 0000 1091</span> (clave{" "}
          <span className="font-mono">1234</span>). CVV{" "}
          <span className="font-mono">123</span>, vencimiento{" "}
          <span className="font-mono">12/31</span>.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Intentar nuevamente
          </Link>
          <Link
            href="/"
            className="w-full text-sm text-neutral-600 transition hover:text-neutral-900"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
