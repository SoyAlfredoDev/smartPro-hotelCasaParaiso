"use client";

import { motion, Variants } from "framer-motion";
import { CalendarDays } from "lucide-react";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function EventsHeader() {
  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      className="mb-16 lg:mb-20"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        {/* Left: editorial text block */}
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/20 bg-[#c8a97e]/10 px-4 py-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Eventos & Celebraciones
          </motion.span>

          {/* Title */}
          <h2 className="mt-5 font-chillax text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Tu evento,{" "}
            <br className="hidden lg:block" />
            <span className="bg-gradient-to-r from-[#c8a97e] to-[#d4bb96] bg-clip-text text-transparent">
              nuestra escena
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl font-inter text-[15px] leading-[1.8] text-white/60">
            Nuestro auditorio premium se transforma para albergar desde
            reuniones corporativas de alto nivel hasta las celebraciones más
            memorables. Diseñado para impresionar.
          </p>

          {/* Decorative animated line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-6 h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-[#c8a97e] to-transparent"
          />
        </div>

        {/* Right: stats / social proof */}
        <div className="flex gap-8 lg:gap-10">
          {[
            { value: "200+", label: "Eventos\nRealizados" },
            { value: "98%", label: "Satisfacción\nClientes" },
            { value: "500", label: "Capacidad\nMáxima" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="text-center lg:text-left"
            >
              <span className="block font-chillax text-3xl font-bold text-[#c8a97e] lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 block whitespace-pre-line font-inter text-[11px] font-medium uppercase tracking-widest text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
