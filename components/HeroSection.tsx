"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-background pb-16">
      {/* Contenedor del Hero (Imagen y Texto) */}
      <div className="relative flex min-h-[80vh] w-full flex-col justify-center overflow-hidden lg:min-h-[85vh]">
        {/* Imagen de fondo con sutil animación de zoom inicial */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        {/* Gradiente mejorado: Más oscuro a la izquierda para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f5d50]/90 via-[#2f5d50]/50 to-transparent" />
        {/* Gradiente inferior para suavizar la transición al componente solapado */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2f5d50]/40" />

        {/* Contenido Principal */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
              Estadía boutique en Santiago
            </span>

            {/* Asumiendo que tienes 'font-chillax' en tu tailwind.config */}
            <h1 className="mt-6 font-chillax text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Bienvenido a tu hogar en Santiago
            </h1>

            <p className="mt-6 font-inter text-base leading-relaxed text-gray-200 sm:text-lg">
              Descubre una experiencia cálida, elegante y cómoda en una
              ubicación estratégica para disfrutar la ciudad, descansar y vivir
              una estadía con identidad local.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#reservar"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-accent/30 active:scale-95 md:h-14"
              >
                Reservar ahora
              </Link>

              <Link
                href="#ubicaciones"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 active:scale-95 md:h-14"
              >
                Ver ubicaciones
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Buscador / Booking Bar (Solapado usando margen negativo) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-20 mx-auto -mt-16 w-full max-w-7xl px-4 sm:px-6 lg:-mt-24 lg:px-8"
      >
        <div className="rounded-2xl border border-default bg-surface p-4 shadow-2xl backdrop-blur-xl md:rounded-3xl md:p-6 lg:p-8">
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_auto] lg:gap-6">
            {/* Destino */}
            <div className="group rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Destino
              </label>
              <select className="w-full appearance-none cursor-pointer bg-transparent text-sm font-medium text-text-primary outline-none transition-colors group-hover:text-primary">
                <option>Santiago Centro</option>
                <option>San Miguel</option>
                <option>República</option>
              </select>
            </div>

            {/* Huéspedes */}
            <div className="group rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Huéspedes
              </label>
              <select className="w-full appearance-none cursor-pointer bg-transparent text-sm font-medium text-text-primary outline-none transition-colors group-hover:text-primary">
                <option>2 huéspedes</option>
                <option>1 huésped</option>
                <option>3 huéspedes</option>
                <option>4 huéspedes</option>
              </select>
            </div>

            {/* Fechas */}
            <div className="group rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Fechas
              </label>
              <input
                type="text"
                placeholder="Selecciona tus fechas"
                className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary/70"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="inline-flex h-full min-h-[56px] w-full items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
            >
              Consultar
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
