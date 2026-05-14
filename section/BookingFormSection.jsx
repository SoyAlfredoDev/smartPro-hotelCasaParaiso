"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Mail,
  MessageSquare,
  Phone,
  User,
  Users,
  Send,
  Shield,
  Clock,
  Sparkles,
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

export default function BookingFormSection() {
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="space-y-5"
            >
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div
                  custom={0}
                  variants={fieldMotion}
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
                >
                  <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                    Nombre completo
                  </label>
                  <div className="flex items-center gap-3">
                    <User
                      size={16}
                      className="text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                    />
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none placeholder:text-[#b5b5b5]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={fieldMotion}
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
                >
                  <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                    Correo electrónico
                  </label>
                  <div className="flex items-center gap-3">
                    <Mail
                      size={16}
                      className="text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                    />
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none placeholder:text-[#b5b5b5]"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Row 2: Phone & Guests */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div
                  custom={2}
                  variants={fieldMotion}
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
                >
                  <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                    Teléfono
                  </label>
                  <div className="flex items-center gap-3">
                    <Phone
                      size={16}
                      className="text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                    />
                    <input
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      className="w-full bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none placeholder:text-[#b5b5b5]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={fieldMotion}
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
                >
                  <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                    Huéspedes
                  </label>
                  <div className="flex items-center gap-3">
                    <Users
                      size={16}
                      className="text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                    />
                    <select className="w-full cursor-pointer bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none">
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
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
                >
                  <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                    Check-in
                  </label>
                  <div className="flex items-center gap-3">
                    <CalendarDays
                      size={16}
                      className="text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                    />
                    <input
                      type="date"
                      className="w-full bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div
                  custom={5}
                  variants={fieldMotion}
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
                >
                  <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                    Check-out
                  </label>
                  <div className="flex items-center gap-3">
                    <CalendarDays
                      size={16}
                      className="text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                    />
                    <input
                      type="date"
                      className="w-full bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Row 4: Location */}
              <motion.div
                custom={6}
                variants={fieldMotion}
                className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
              >
                <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                  Ubicación de interés
                </label>
                <select className="w-full cursor-pointer bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none">
                  <option>San Miguel</option>
                  <option>Restobar San Miguel</option>
                  <option>República</option>
                </select>
              </motion.div>

              {/* Row 5: Message */}
              <motion.div
                custom={7}
                variants={fieldMotion}
                className="group rounded-2xl border border-[#e5e5e5] bg-[#faf8f5] px-4 py-3.5 transition-all duration-300 focus-within:border-[#2f5d50]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(47,93,80,0.08)]"
              >
                <label className="mb-2 block font-inter text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                  Mensaje
                </label>
                <div className="flex items-start gap-3">
                  <MessageSquare
                    size={16}
                    className="mt-0.5 text-[#8fa89e] transition-colors group-focus-within:text-[#2f5d50]"
                  />
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos qué tipo de estadía buscas..."
                    className="w-full resize-none bg-transparent font-inter text-[14px] font-medium text-[#2b2b2b] outline-none placeholder:text-[#b5b5b5]"
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
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2f5d50] to-[#3a7466] px-8 font-inter text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(47,93,80,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(47,93,80,0.35)]"
                >
                  <Send className="h-4 w-4" />
                  Solicitar reserva
                </motion.button>
              </motion.div>
            </motion.div>
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
