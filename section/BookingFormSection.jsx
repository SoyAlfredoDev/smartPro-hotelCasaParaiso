"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Mail,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";

const fieldMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * index,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

export default function BookingFormSection() {
  return (
    <section id="reservar" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="overflow-hidden rounded-[28px] border border-default bg-surface shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-primary px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-12">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                viewport={{ once: true }}
                className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
              >
                Reserva tu estadía
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-5 max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Solicita disponibilidad de forma rápida y simple
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-4 max-w-lg text-sm leading-7 text-white/80 sm:text-base"
              >
                Completa el formulario y recibe información sobre fechas,
                ubicación y disponibilidad según tu estadía ideal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-8 grid gap-4"
              >
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-white">
                    Respuesta clara y directa
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Ideal para una maqueta profesional orientada a conversión.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-white">
                    Diseño consistente con la landing
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    Mantiene la misma línea visual limpia, cálida y elegante.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div
                    custom={0}
                    variants={fieldMotion}
                    className="rounded-2xl border border-default bg-background px-4 py-3"
                  >
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Nombre completo
                    </label>
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-primary" />
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={fieldMotion}
                    className="rounded-2xl border border-default bg-background px-4 py-3"
                  >
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Correo electrónico
                    </label>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-primary" />
                      <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div
                    custom={2}
                    variants={fieldMotion}
                    className="rounded-2xl border border-default bg-background px-4 py-3"
                  >
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Teléfono
                    </label>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-primary" />
                      <input
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={3}
                    variants={fieldMotion}
                    className="rounded-2xl border border-default bg-background px-4 py-3"
                  >
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Huéspedes
                    </label>
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-primary" />
                      <select className="w-full cursor-pointer bg-transparent text-sm font-medium text-text-primary outline-none">
                        <option>1 huésped</option>
                        <option>2 huéspedes</option>
                        <option>3 huéspedes</option>
                        <option>4 huéspedes</option>
                        <option>5+ huéspedes</option>
                      </select>
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div
                    custom={4}
                    variants={fieldMotion}
                    className="rounded-2xl border border-default bg-background px-4 py-3"
                  >
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Check-in
                    </label>
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-primary" />
                      <input
                        type="date"
                        className="w-full bg-transparent text-sm font-medium text-text-primary outline-none"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={5}
                    variants={fieldMotion}
                    className="rounded-2xl border border-default bg-background px-4 py-3"
                  >
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Check-out
                    </label>
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-primary" />
                      <input
                        type="date"
                        className="w-full bg-transparent text-sm font-medium text-text-primary outline-none"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  custom={6}
                  variants={fieldMotion}
                  className="rounded-2xl border border-default bg-background px-4 py-3"
                >
                  <label className="mb-2 block text-xs font-medium text-text-secondary">
                    Ubicación de interés
                  </label>
                  <select className="w-full cursor-pointer bg-transparent text-sm font-medium text-text-primary outline-none">
                    <option>San Miguel</option>
                    <option>Restobar San Miguel</option>
                    <option>República</option>
                  </select>
                </motion.div>

                <motion.div
                  custom={7}
                  variants={fieldMotion}
                  className="rounded-2xl border border-default bg-background px-4 py-3"
                >
                  <label className="mb-2 block text-xs font-medium text-text-secondary">
                    Mensaje
                  </label>
                  <div className="flex items-start gap-3">
                    <MessageSquare size={18} className="mt-0.5 text-primary" />
                    <textarea
                      rows={5}
                      placeholder="Cuéntanos qué tipo de estadía buscas"
                      className="w-full resize-none bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary"
                    />
                  </div>
                </motion.div>

                <motion.div
                  custom={8}
                  variants={fieldMotion}
                  className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-xs leading-6 text-text-secondary">
                    Al enviar este formulario, un asesor puede contactarte para
                    confirmar disponibilidad.
                  </p>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-95"
                  >
                    Solicitar reserva
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
