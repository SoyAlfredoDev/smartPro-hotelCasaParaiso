"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

interface KlapPaymentFormProps {
  orderId: string;
  redirectUrl?: string;
  amount: number;
  onPaymentSuccess: (payload: { orderId: string; referenceId: string }) => void;
  onPaymentError: (message: string) => void;
  disabled?: boolean;
}

const KLAP_SCRIPT_URL = process.env.NEXT_PUBLIC_KLAP_SCRIPT_URL ?? "";

export default function KlapPaymentForm({
  orderId,
  redirectUrl,
  amount,
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
}: KlapPaymentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(!KLAP_SCRIPT_URL);
  const [useHostedCheckout, setUseHostedCheckout] = useState(!KLAP_SCRIPT_URL);

  const initKlap = useCallback(() => {
    if (!window.KLAP?.init) {
      setScriptFailed(true);
      setUseHostedCheckout(true);
      return;
    }

    try {
      window.KLAP.init({ useBinLookup: true });
      setScriptReady(true);
    } catch (error) {
      console.error("[KlapPaymentForm] KLAP.init error:", error);
      setScriptFailed(true);
      setUseHostedCheckout(true);
    }
  }, []);

  useEffect(() => {
    if (window.KLAP?.init) {
      initKlap();
    }
  }, [initKlap, orderId]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string") return;

      try {
        const payload = JSON.parse(event.data) as {
          action?: string;
          status?: string;
          data?: { reference_id?: string; order_id?: string };
        };

        if (
          payload.action === "payment-success" ||
          payload.status === "SUCCESS"
        ) {
          onPaymentSuccess({
            orderId: payload.data?.order_id ?? orderId,
            referenceId: payload.data?.reference_id ?? "",
          });
          return;
        }

        if (payload.action === "payment-reject" || payload.status === "REJECT") {
          onPaymentError("El pago fue rechazado. Intenta con otra tarjeta.");
        }
      } catch {
        /* not a klap message */
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onPaymentError, onPaymentSuccess, orderId]);

  useEffect(() => {
    if (useHostedCheckout && redirectUrl) {
      window.location.assign(redirectUrl);
    }
  }, [redirectUrl, useHostedCheckout]);

  if (useHostedCheckout && redirectUrl) {
    return (
      <div className="space-y-4 rounded-2xl border border-default bg-white p-6 text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-4 border-primary" />
        <p className="text-sm text-text-primary">
          Redirigiendo al formulario seguro de Klap...
        </p>
        <p className="text-xs text-text-secondary">
          Si no avanza automáticamente,{" "}
          <a
            href={redirectUrl}
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            haz clic aquí para pagar
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {KLAP_SCRIPT_URL ? (
        <Script
          src={KLAP_SCRIPT_URL}
          strategy="afterInteractive"
          onLoad={initKlap}
          onError={() => {
            setScriptFailed(true);
            setUseHostedCheckout(true);
          }}
        />
      ) : null}

      <form
        ref={formRef}
        id="klap-payment-form"
        data-klap-order-id={orderId}
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!scriptReady) {
            onPaymentError(
              "El formulario de pago aún no está listo. Espera un momento.",
            );
          }
        }}
      >
        <div>
          <label
            htmlFor="klap-card"
            className="mb-1 block text-sm font-medium text-text-primary"
          >
            Número de tarjeta
          </label>
          <input
            id="klap-card"
            data-klap-card
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="0000 0000 0000 0000"
            disabled={disabled || !scriptReady}
            className="w-full rounded-xl border border-default bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="klap-expiration"
              className="mb-1 block text-sm font-medium text-text-primary"
            >
              Vencimiento
            </label>
            <input
              id="klap-expiration"
              data-klap-expiration
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/AA"
              disabled={disabled || !scriptReady}
              className="w-full rounded-xl border border-default bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="klap-cvv"
              className="mb-1 block text-sm font-medium text-text-primary"
            >
              CVV
            </label>
            <input
              id="klap-cvv"
              data-klap-cvv
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              disabled={disabled || !scriptReady}
              className="w-full rounded-xl border border-default bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <p className="text-xs text-text-secondary">
          Total a pagar:{" "}
          <span className="font-semibold text-text-primary">
            ${amount.toLocaleString("es-CL")}
          </span>
          . Pago procesado de forma segura por Klap.
        </p>

        {!scriptReady && !scriptFailed ? (
          <p className="text-sm text-text-secondary">
            Cargando formulario de pago seguro...
          </p>
        ) : null}
      </form>
    </div>
  );
}
