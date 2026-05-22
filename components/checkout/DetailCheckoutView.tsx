"use client";

import { useCallback, useEffect, useState } from "react";
import RoomsSelected from "@/components/checkout/RoomsSelected";
import ResumeCheckoutView from "@/components/checkout/ResumeCheckoutView";
import FormCustomer from "@/components/checkout/FormCustomer";
import CheckoutEmptyState from "@/components/checkout/CheckoutEmptyState";
import ReservationResultModal, {
  type ReservationModalState,
} from "@/components/checkout/ReservationResultModal";
import { useBookingStore } from "@/store/useBookingStore";
import { handleNewBooking } from "@/lib/resend/handleNewBooking";
import {
  EMPTY_GUEST_FORM,
  validateCheckoutContext,
  validateGuestForm,
  hasValidationErrors,
  type GuestFormData,
  type GuestFormErrors,
} from "@/lib/validation/bookingForm";

export default function DetailCheckoutView() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<GuestFormData>(EMPTY_GUEST_FORM);
  const [fieldErrors, setFieldErrors] = useState<GuestFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const result = await handleNewBooking({
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
      });

      if (!result.success) {
        setModalState({
          type: "error",
          message:
            result.error ??
            "Ocurrió un error al registrar tu reserva. Por favor, inténtalo de nuevo.",
        });
        return;
      }

      setModalState({
        type: "success",
        bookingId: result.booking.id,
        guestEmail: result.booking.guestEmail,
        emailsSent: result.emailsSent,
      });
      clearReservation();
      setFormData(EMPTY_GUEST_FORM);
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
                <FormCustomer
                  formData={formData}
                  errors={fieldErrors}
                  onChange={handleFormChange}
                  disabled={isSubmitting}
                />
              </div>
            </>
          ) : (
            <CheckoutEmptyState />
          )}
        </div>

        <div className="mt-8 w-full px-0 lg:mt-0 lg:w-[30%] lg:pl-4">
          {hasRoom ? (
            <ResumeCheckoutView
              onReserve={handleReserve}
              isSubmitting={isSubmitting}
              disableReserve={!hasRoom}
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
