"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Copy,
  Home,
  Mail,
  MessageSquare,
  Phone,
  User,
  Users,
  Send,
  Shield,
  Clock,
  Sparkles,
  X,
} from "lucide-react";

const fieldMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * index,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const featureCards = [
  {
    icon: Clock,
    title: "Respuesta en 24h",
    description:
      "Un asesor te contactará para confirmar disponibilidad rápidamente.",
  },
  {
    icon: Shield,
    title: "Reserva segura",
    description: "Tu información está protegida bajo estándares de seguridad.",
  },
  {
    icon: Sparkles,
    title: "Mejor precio",
    description:
      "Garantizamos la mejor tarifa al reservar directamente con nosotros.",
  },
];

const formTabs = [
  {
    id: "room",
    label: "Reserva de Habitación",
  },
  {
    id: "special",
    label: "Solicitudes Especiales",
  },
];

const formFadeMotion = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
};

const inputGroupClass =
  "group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]";

const inputClass =
  "w-full bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none placeholder:text-[#b5b5b5]";

const selectClass =
  "w-full cursor-pointer bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none";

const labelClass =
  "mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]";

const iconClass =
  "text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const getNextDate = (dateValue) => {
  if (!dateValue) {
    return getTodayDate();
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1))
    .toISOString()
    .split("T")[0];
};

export default function BookingFormSection() {
  const [activeTab, setActiveTab] = useState("room");

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f5f5f3] py-20 sm:py-24 lg:py-32"
    >
      {/* Background ambient effects */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#2f5d50] blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -left-[8%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#c8a97e] blur-[160px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header – centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2f5d50]/15 bg-[#2f5d50]/8 px-5 py-2 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#2f5d50]">
            <CalendarDays className="h-3.5 w-3.5" />
            Reserva tu estadía
          </span>

          <h2 className="mt-6 font-chillax text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl">
            Solicita disponibilidad
          </h2>

          <p className="mt-4 font-inter text-[15px] leading-[1.8] text-[#6f6f6f]">
            Completa el formulario y recibe información sobre fechas, ubicación
            y disponibilidad según tu estadía ideal.
          </p>
        </motion.div>

        {/* Main Layout: Form + Side Features */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Form Card – Floating glass panel */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12"
          >
            <div className="mb-8 rounded-[1.5rem] border border-[#e5e5e5] bg-[#faf8f5] p-1.5">
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {formTabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex h-12 items-center justify-center rounded-[1.15rem] px-4 font-inter text-[12px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-[#6f6f6f] hover:text-[#2f5d50]"
                      }`}
                      aria-pressed={isActive}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="booking-form-active-tab"
                          className="absolute inset-0 rounded-[1.15rem] bg-[#2f5d50] shadow-[0_8px_24px_rgba(47,93,80,0.22)]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {activeTab === "room" ? (
                <RoomReservationForm key="room-reservation" />
              ) : (
                <SpecialRequestsForm key="special-requests" />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side Panel – Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {featureCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                  className="group rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#2f5d50]/15 hover:shadow-[0_8px_30px_rgba(47,93,80,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2f5d50]/8 text-[#2f5d50] transition-colors duration-300 group-hover:bg-[#2f5d50] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-inter text-[14px] font-bold text-[#2b2b2b]">
                        {card.title}
                      </h4>
                      <p className="mt-1 font-inter text-[13px] leading-relaxed text-[#6f6f6f]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Trust badge */}
            <div className="mt-auto rounded-2xl border border-[#c8a97e]/20 bg-gradient-to-br from-[#c8a97e]/8 to-[#c8a97e]/3 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8a97e]/15">
                  <Shield className="h-5 w-5 text-[#c8a97e]" />
                </div>
                <div>
                  <p className="font-inter text-[13px] font-bold text-[#2b2b2b]">
                    Reserva con confianza
                  </p>
                  <p className="mt-0.5 font-inter text-[11px] text-[#6f6f6f]">
                    Cancelación flexible · Sin cargos ocultos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RoomReservationForm() {
  const [checkIn, setCheckIn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({ type: "idle" });
  const today = getTodayDate();
  const checkoutMinDate = getNextDate(checkIn);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      guestName: String(formData.get("fullName") || "").trim(),
      guestEmail: String(formData.get("email") || "").trim(),
      guestPhone: String(formData.get("phone") || "").trim(),
      guests: String(formData.get("guests") || "").trim(),
      checkIn: String(formData.get("checkIn") || "").trim(),
      checkOut: String(formData.get("checkOut") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      notes: String(formData.get("message") || "").trim(),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setModalState({
          type: "error",
          message:
            result.error ||
            "No pudimos registrar tu solicitud. Revisa tus datos e intenta nuevamente.",
        });
        return;
      }

      setModalState({
        type: "success",
        reservationNumber:
          result.reservationNumber || `#RES-${result.booking.id}`,
        guestEmail: result.booking.guestEmail,
      });
      form.reset();
      setCheckIn("");
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

  return (
    <>
      <motion.form {...formFadeMotion} onSubmit={handleSubmit}>
        <motion.div initial="hidden" animate="visible" className="space-y-5">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              custom={0}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Nombre completo</label>
              <div className="flex items-center gap-3">
                <User size={16} className={iconClass} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Tu nombre"
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Correo electrónico</label>
              <div className="flex items-center gap-3">
                <Mail size={16} className={iconClass} />
                <input
                  type="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Row 2: Phone & Guests */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              custom={2}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Teléfono</label>
              <div className="flex items-center gap-3">
                <Phone size={16} className={iconClass} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+56 9 1234 5678"
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              custom={3}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Huéspedes</label>
              <div className="flex items-center gap-3">
                <Users size={16} className={iconClass} />
                <select
                  name="guests"
                  className={selectClass}
                  disabled={isSubmitting}
                  required
                >
                  <option>1 huésped</option>
                  <option>2 huéspedes</option>
                  <option>3 huéspedes</option>
                  <option>4 huéspedes</option>
                  <option>5+ huéspedes</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Row 3: Check-in & Check-out */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              custom={4}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Check-in</label>
              <div className="flex items-center gap-3">
                <CalendarDays size={16} className={iconClass} />
                <input
                  type="date"
                  name="checkIn"
                  value={checkIn}
                  min={today}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              custom={5}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Check-out</label>
              <div className="flex items-center gap-3">
                <CalendarDays size={16} className={iconClass} />
                <input
                  type="date"
                  name="checkOut"
                  min={checkoutMinDate}
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Row 4: Location */}
          <motion.div
            custom={6}
            variants={fieldMotion}
            className={inputGroupClass}
          >
            <label className={labelClass}>Ubicación de interés</label>
            <select
              name="location"
              className={selectClass}
              disabled={isSubmitting}
              required
            >
              <option value="hotel-san-miguel">
                Hotel Casa Paraíso San Miguel
              </option>
              <option value="hotel-republica">
                Hotel Casa Paraíso República
              </option>
            </select>
          </motion.div>

          {/* Row 5: Message */}
          <motion.div
            custom={7}
            variants={fieldMotion}
            className={inputGroupClass}
          >
            <label className={labelClass}>Mensaje</label>
            <div className="flex items-start gap-3">
              <MessageSquare size={16} className={`mt-0.5 ${iconClass}`} />
              <textarea
                name="message"
                rows={4}
                placeholder="Cuéntanos qué tipo de estadía buscas..."
                className={`${inputClass} resize-none`}
                disabled={isSubmitting}
              />
            </div>
          </motion.div>

          {/* Submit area */}
          <motion.div
            custom={8}
            variants={fieldMotion}
            className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-xs font-inter text-[11px] leading-relaxed text-[#9a9a9a]">
              Al enviar este formulario, un asesor puede contactarte para
              confirmar disponibilidad.
            </p>

            <motion.button
              type="submit"
              whileHover={isSubmitting ? undefined : { y: -2, scale: 1.02 }}
              whileTap={isSubmitting ? undefined : { scale: 0.97 }}
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2f5d50] to-[#3a7466] px-8 font-inter text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(47,93,80,0.25)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(47,93,80,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Enviando..." : "Solicitar reserva"}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.form>

      <BookingRequestResultModal
        state={modalState}
        onClose={() => setModalState({ type: "idle" })}
      />
    </>
  );
}

function BookingRequestResultModal({ state, onClose, onRetry }) {
  const [copied, setCopied] = useState(false);
  const isOpen = state.type !== "idle";

  const handleCopyId = async (reservationNumber) => {
    try {
      await navigator.clipboard.writeText(reservationNumber);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-request-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-default bg-surface shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 cursor-pointer rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {state.type === "success" ? (
              <div className="p-8 pt-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2
                    className="h-9 w-9 text-primary"
                    strokeWidth={2}
                  />
                </div>
                <h2
                  id="booking-request-modal-title"
                  className="font-chillax text-2xl font-bold text-text-primary"
                >
                  ¡Reserva solicitada!
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Tu solicitud ha sido recibida. Nuestro equipo revisará la
                  disponibilidad y te contactará para confirmar los detalles.
                </p>

                <div className="mt-6 rounded-xl border border-default bg-surface-warm px-4 py-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Número de reserva
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Tu solicitud ha sido recibida. Número de reserva:{" "}
                    <span className="font-semibold text-text-primary">
                      {state.reservationNumber}
                    </span>
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <code className="truncate font-mono text-sm font-semibold text-text-primary">
                      {state.reservationNumber}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyId(state.reservationNumber)}
                      className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-default px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
                    >
                      <Copy size={14} />
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>

                <p className="mt-5 flex items-center justify-center gap-2 text-sm text-text-secondary">
                  <Mail size={16} className="text-primary" />
                  Te contactaremos a{" "}
                  <span className="font-medium text-text-primary">
                    {state.guestEmail}
                  </span>
                </p>

                <Link
                  href="/"
                  onClick={onClose}
                  className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  <Home size={18} />
                  Volver al inicio
                </Link>
              </div>
            ) : state.type === "error" ? (
              <div className="p-8 pt-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <AlertCircle
                    className="h-9 w-9 text-red-500"
                    strokeWidth={2}
                  />
                </div>
                <h2
                  id="booking-request-modal-title"
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
                    className="flex-1 cursor-pointer rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Intentar de nuevo
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 cursor-pointer rounded-xl border border-default px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-black/5"
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

function SpecialRequestsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({ type: "idle" });
  const today = getTodayDate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      applicantName: String(formData.get("applicantName") || "").trim(),
      applicantEmail: String(formData.get("applicantEmail") || "").trim(),
      applicantPhone: String(formData.get("applicantPhone") || "").trim(),
      eventDate: String(formData.get("eventDate") || "").trim(),
      eventType: String(formData.get("eventType") || "").trim(),
      details: String(formData.get("details") || "").trim(),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/special-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setModalState({
          type: "error",
          message:
            result.error ||
            "No pudimos registrar tu solicitud. Revisa tus datos e intenta nuevamente.",
        });
        return;
      }

      setModalState({
        type: "success",
        requestNumber:
          result.requestNumber || result.specialRequest.requestNumber,
        applicantEmail: result.specialRequest.applicantEmail,
      });
      form.reset();
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

  return (
    <>
      <motion.form {...formFadeMotion} onSubmit={handleSubmit}>
        <motion.div initial="hidden" animate="visible" className="space-y-5">
          {/* Row 1: Applicant Data */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              custom={0}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Nombre completo</label>
              <div className="flex items-center gap-3">
                <User size={16} className={iconClass} />
                <input
                  type="text"
                  name="applicantName"
                  placeholder="Tu nombre"
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Correo electrónico</label>
              <div className="flex items-center gap-3">
                <Mail size={16} className={iconClass} />
                <input
                  type="email"
                  name="applicantEmail"
                  placeholder="correo@ejemplo.com"
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Row 2: Phone & Event Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              custom={2}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Teléfono</label>
              <div className="flex items-center gap-3">
                <Phone size={16} className={iconClass} />
                <input
                  type="tel"
                  name="applicantPhone"
                  placeholder="+56 9 1234 5678"
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              custom={3}
              variants={fieldMotion}
              className={inputGroupClass}
            >
              <label className={labelClass}>Fecha del evento</label>
              <div className="flex items-center gap-3">
                <CalendarDays size={16} className={iconClass} />
                <input
                  type="date"
                  name="eventDate"
                  min={today}
                  className={inputClass}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Row 3: Event Type */}
          <motion.div
            custom={4}
            variants={fieldMotion}
            className={inputGroupClass}
          >
            <label className={labelClass}>Tipo de evento</label>
            <div className="flex items-center gap-3">
              <Sparkles size={16} className={iconClass} />
              <select
                name="eventType"
                className={selectClass}
                disabled={isSubmitting}
                required
              >
                <option>Eventos corporativos</option>
                <option>Celebraciones privadas</option>
                <option>Charlas y conferencias</option>
                <option>Premiaciones y galas</option>
                <option>Otros</option>
              </select>
            </div>
          </motion.div>

          {/* Row 4: Request Details */}
          <motion.div
            custom={5}
            variants={fieldMotion}
            className={inputGroupClass}
          >
            <label className={labelClass}>Detalles de la solicitud</label>
            <div className="flex items-start gap-3">
              <MessageSquare size={16} className={`mt-0.5 ${iconClass}`} />
              <textarea
                name="details"
                rows={5}
                placeholder="Cuéntanos el objetivo, número de asistentes y necesidades especiales..."
                className={`${inputClass} resize-none`}
                disabled={isSubmitting}
                required
              />
            </div>
          </motion.div>

          {/* Submit area */}
          <motion.div
            custom={6}
            variants={fieldMotion}
            className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-xs font-inter text-[11px] leading-relaxed text-[#9a9a9a]">
              Al enviar tu solicitud, revisaremos los detalles para preparar una
              propuesta personalizada.
            </p>

            <motion.button
              type="submit"
              whileHover={isSubmitting ? undefined : { y: -2, scale: 1.02 }}
              whileTap={isSubmitting ? undefined : { scale: 0.97 }}
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2f5d50] to-[#3a7466] px-8 font-inter text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(47,93,80,0.25)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(47,93,80,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.form>

      <SpecialRequestResultModal
        state={modalState}
        onClose={() => setModalState({ type: "idle" })}
      />
    </>
  );
}

function SpecialRequestResultModal({ state, onClose, onRetry }) {
  const [copied, setCopied] = useState(false);
  const isOpen = state.type !== "idle";

  const handleCopyId = async (requestNumber) => {
    try {
      await navigator.clipboard.writeText(requestNumber);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="special-request-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-default bg-surface shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 cursor-pointer rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {state.type === "success" ? (
              <div className="p-8 pt-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2
                    className="h-9 w-9 text-primary"
                    strokeWidth={2}
                  />
                </div>
                <h2
                  id="special-request-modal-title"
                  className="font-chillax text-2xl font-bold text-text-primary"
                >
                  ¡Solicitud enviada!
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Hemos recibido los detalles de tu evento. Nuestro equipo los
                  revisará y te contactará para coordinar una propuesta.
                </p>

                <div className="mt-6 rounded-xl border border-default bg-surface-warm px-4 py-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Número de seguimiento
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Tu número de seguimiento es:{" "}
                    <span className="font-semibold text-text-primary">
                      {state.requestNumber}
                    </span>
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <code className="truncate font-mono text-sm font-semibold text-text-primary">
                      {state.requestNumber}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyId(state.requestNumber)}
                      className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-default px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
                    >
                      <Copy size={14} />
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>

                <p className="mt-5 flex items-center justify-center gap-2 text-sm text-text-secondary">
                  <Mail size={16} className="text-primary" />
                  Te contactaremos a{" "}
                  <span className="font-medium text-text-primary">
                    {state.applicantEmail}
                  </span>
                </p>

                <Link
                  href="/"
                  onClick={onClose}
                  className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  <Home size={18} />
                  Volver al inicio
                </Link>
              </div>
            ) : state.type === "error" ? (
              <div className="p-8 pt-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <AlertCircle
                    className="h-9 w-9 text-red-500"
                    strokeWidth={2}
                  />
                </div>
                <h2
                  id="special-request-modal-title"
                  className="font-chillax text-2xl font-bold text-text-primary"
                >
                  No pudimos enviar la solicitud
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
                    className="flex-1 cursor-pointer rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Intentar de nuevo
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 cursor-pointer rounded-xl border border-default px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-black/5"
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
