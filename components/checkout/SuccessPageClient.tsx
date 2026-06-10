"use client";

import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("reserva");
  const orderId = searchParams.get("orden") ?? searchParams.get("order_id");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      setError("No se encontró la referencia de la reserva.");
      return;
    }

    const confirm = async () => {
      try {
        const response = await fetch("/api/klap/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId: bookingId,
            orderId,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error ?? "No se pudo confirmar el pago");
          return;
        }

        setConfirmed(true);

        if (window.parent !== window) {
          window.parent.postMessage(
            JSON.stringify({
              action: "payment-success",
              status: "SUCCESS",
              data: { reference_id: bookingId, order_id: orderId },
            }),
            window.location.origin,
          );
        }
      } catch {
        setError("Error de conexión al confirmar el pago");
      } finally {
        setLoading(false);
      }
    };

    void confirm();
  }, [bookingId, orderId]);

  return (
    <div className="min-h-screen bg-primary px-4 py-8">
      <NavBar />
      <div className="mx-auto mt-16 max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        {loading ? (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-4 border-primary" />
            <p className="text-sm text-neutral-500">Verificando pago con Klap...</p>
          </>
        ) : confirmed ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-7 w-7 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-xl font-semibold text-neutral-900">
              Pago exitoso
            </h1>
            <p className="mb-4 text-sm text-neutral-500">
              Tu reserva fue confirmada. Te enviaremos el comprobante por correo.
            </p>
            {bookingId ? (
              <p className="mb-6 text-xs text-neutral-400">
                Reserva: <span className="font-medium">{bookingId}</span>
              </p>
            ) : null}
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-7 w-7 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-xl font-semibold text-neutral-900">
              Pago no confirmado
            </h1>
            <p className="mb-6 text-sm text-red-600" role="alert">
              {error ?? "No se pudo validar el pago con Klap."}
            </p>
          </>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Volver al checkout
          </Link>
          <Link
            href="/"
            className="w-full text-sm text-neutral-600 transition hover:text-neutral-900"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
