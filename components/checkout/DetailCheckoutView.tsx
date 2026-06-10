"use client";

import { useCallback, useEffect, useState } from "react";
import RoomsSelected from "@/components/checkout/RoomsSelected";
import ResumeCheckoutView from "@/components/checkout/ResumeCheckoutView";
import FormCustomer from "@/components/checkout/FormCustomer";
import CheckoutEmptyState from "@/components/checkout/CheckoutEmptyState";
import ReservationResultModal, {
  type ReservationModalState,
} from "@/components/checkout/ReservationResultModal";
import KlapPaymentForm from "@/components/klap/KlapPaymentForm";
import { handleNewBooking } from "@/lib/resend/handleNewBooking";
import { useBookingStore } from "@/store/useBookingStore";
import {
  EMPTY_GUEST_FORM,
  validateCheckoutContext,
  validateGuestForm,
  hasValidationErrors,
  type GuestFormData,
  type GuestFormErrors,
} from "@/lib/validation/bookingForm";

type CheckoutStep = "guest" | "payment";

interface PaymentSession {
  bookingId: string;
  orderId: string;
  redirectUrl?: string;
}

interface DetailCheckoutViewProps {
  paymentsEnabled?: boolean;
}

export default function DetailCheckoutView({
  paymentsEnabled = false,
}: DetailCheckoutViewProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<CheckoutStep>("guest");
  const [formData, setFormData] = useState<GuestFormData>(EMPTY_GUEST_FORM);
  const [fieldErrors, setFieldErrors] = useState<GuestFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(
    null,
  );
  const [modalState, setModalState] = useState<ReservationModalState>({
    type: "idle",
  });

  const roomsSelected = useBookingStore((state) => state.roomsSelected);
  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);
  const peopleQuantity = useBookingStore((state) => state.peopleQuantity);
  const nights = useBookingStore((state) => state.nights);
  const totalPrice = useBookingStore((state) => state.totalPrice);
  const clearReservation = useBookingStore((state) => state.clearReservation);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFieldErrors((prev) => {
        if (!prev[name as keyof GuestFormErrors]) return prev;
        const next = { ...prev };
        delete next[name as keyof GuestFormErrors];
        return next;
      });
    },
    [],
  );

  const finalizeSuccess = useCallback(
    (bookingId: string, guestEmail: string) => {
      setModalState({
        type: "success",
        bookingId,
        guestEmail,
        emailsSent: true,
      });
      clearReservation();
      setFormData(EMPTY_GUEST_FORM);
      setPaymentSession(null);
      setStep("guest");
    },
    [clearReservation],
  );

  const handlePaymentSuccess = useCallback(
    async ({ referenceId, orderId }: { referenceId: string; orderId: string }) => {
      try {
        const response = await fetch("/api/klap/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId: referenceId || paymentSession?.bookingId,
            orderId,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setModalState({
            type: "error",
            message: data.error ?? "No se pudo confirmar el pago.",
          });
          return;
        }

        finalizeSuccess(data.booking.id, formData.email.trim());
      } catch {
        setModalState({
          type: "error",
          message: "No pudimos confirmar el pago. Intenta nuevamente.",
        });
      }
    },
    [finalizeSuccess, formData.email, paymentSession?.bookingId],
  );

  const handleReserve = async () => {
    const contextError = validateCheckoutContext({
      checkIn,
      checkOut,
      roomsSelected,
      peopleQuantity,
      nights,
    });

    const guestErrors = validateGuestForm(formData);
    const errors: GuestFormErrors = { ...guestErrors };
    if (contextError) {
      errors._form = contextError;
    }

    if (hasValidationErrors(errors) || contextError) {
      setFieldErrors(errors);
      const firstInvalid = document.querySelector<HTMLElement>(
        "[aria-invalid='true'], [role='alert']",
      );
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const documentNote = `[${formData.documentType.toUpperCase()}] ${formData.documentNumber.trim()}`;
    const notes = [documentNote, formData.comment.trim()]
      .filter(Boolean)
      .join("\n");

    try {
      if (!paymentsEnabled) {
        const bookingResult = await handleNewBooking({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          checkIn: checkIn!,
          checkOut: checkOut!,
          guests: peopleQuantity!,
          totalPrice: totalPrice ?? 0,
          roomId: roomsSelected!.id,
          comment: notes,
          status: "pendiente",
        });

        if (!bookingResult.success) {
          setModalState({
            type: "error",
            message:
              bookingResult.error ??
              "Ocurrió un error al registrar tu reserva. Por favor, inténtalo de nuevo.",
          });
          return;
        }

        finalizeSuccess(
          bookingResult.booking.id,
          formData.email.trim(),
        );
        return;
      }

      const orderResponse = await fetch("/api/klap/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking: {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            checkIn: checkIn!,
            checkOut: checkOut!,
            guests: peopleQuantity!,
            totalPrice: totalPrice ?? 0,
            roomId: roomsSelected!.id,
            comment: notes,
          },
          description: "Reserva Hotel Casa Paraíso",
          amount: totalPrice ?? 0,
          guestEmail: formData.email.trim(),
          guestPhone: formData.phone.trim(),
          guestFirstName: formData.firstName.trim(),
          guestLastName: formData.lastName.trim(),
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        setModalState({
          type: "error",
          message:
            orderData.error ??
            "No se pudo iniciar el pago. Intenta nuevamente.",
        });
        return;
      }

      if (orderData.redirectUrl && !process.env.NEXT_PUBLIC_KLAP_SCRIPT_URL) {
        window.location.assign(orderData.redirectUrl);
        return;
      }

      setPaymentSession({
        bookingId: orderData.referenceId,
        orderId: orderData.orderId,
        redirectUrl: orderData.redirectUrl,
      });
      setStep("payment");
    } catch {
      setModalState({
        type: "error",
        message:
          "No pudimos conectar con el servidor. Verifica tu conexión e inténtalo nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-primary" />
      </div>
    );
  }

  const hasRoom = Boolean(roomsSelected?.id);

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 py-12 lg:flex-row lg:py-24">
        <div className="w-full lg:w-[70%]">
          {hasRoom ? (
            <>
              <RoomsSelected />
              <div className="mt-8 w-full overflow-hidden rounded-2xl border border-default bg-surface shadow-soft">
                {step === "guest" ? (
                  <FormCustomer
                    formData={formData}
                    errors={fieldErrors}
                    onChange={handleFormChange}
                    disabled={isSubmitting}
                  />
                ) : paymentSession ? (
                  <div className="p-6">
                    <div className="border-b border-default pb-4">
                      <h2 className="font-chillax text-xl font-bold text-text-primary">
                        Pago con tarjeta
                      </h2>
                      <p className="mt-1 text-sm text-text-secondary">
                        Reserva {paymentSession.bookingId}. Completa el pago para
                        confirmar tu estadía.
                      </p>
                    </div>

                    <div className="mt-6">
                      <KlapPaymentForm
                        orderId={paymentSession.orderId}
                        redirectUrl={paymentSession.redirectUrl}
                        amount={totalPrice ?? 0}
                        disabled={isSubmitting}
                        onPaymentSuccess={({ orderId }) =>
                          handlePaymentSuccess({
                            referenceId: paymentSession.bookingId,
                            orderId,
                          })
                        }
                        onPaymentError={(message) => {
                          if (paymentSession) {
                            void fetch("/api/klap/reject-payment", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                referenceId: paymentSession.bookingId,
                                orderId: paymentSession.orderId,
                                reason: message,
                              }),
                            });
                            setPaymentSession(null);
                            setStep("guest");
                          }
                          setModalState({ type: "error", message });
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep("guest")}
                      className="mt-4 text-sm text-text-secondary underline-offset-2 hover:underline"
                    >
                      Volver a datos del huésped
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <CheckoutEmptyState />
          )}
        </div>

        <div className="mt-8 w-full px-0 lg:mt-0 lg:w-[30%] lg:pl-4">
          {hasRoom && step === "guest" ? (
            <ResumeCheckoutView
              onReserve={handleReserve}
              isSubmitting={isSubmitting}
              disableReserve={!hasRoom}
              paymentsEnabled={paymentsEnabled}
            />
          ) : null}
        </div>
      </div>

      <ReservationResultModal
        state={modalState}
        onClose={() => setModalState({ type: "idle" })}
      />
    </>
  );
}
