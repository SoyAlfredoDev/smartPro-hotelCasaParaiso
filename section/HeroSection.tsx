"use client";

import { motion } from "framer-motion";
import SearcherComponent from "@/components/SearcherComponent";
import { Suspense } from "react";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative min-h-[70vh] flex w-full flex-col overflow-hidden md:justify-center">
        {/* Imagen de fondo con sutil animación de zoom inicial */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 h-[85vh] w-full"
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
        <div className="z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-10 md:py-20 lg:px-8 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl pt-10 md:pt-0"
          >
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs max-w-[300px] font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm ">
              Estadía boutique en Santiago
            </span>

            {/* Asumiendo que tienes 'font-chillax' en tu tailwind.config */}
            <h1 className="mt-6 font-chillax text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Bienvenido a tu hogar en Santiago
            </h1>

            <p className="mt-6 font-inter text-base leading-relaxed text-gray-200 text-lg md:text-xl mb-[10px]">
              Descubre una experiencia cálida, elegante y cómoda en una
              ubicación estratégica para disfrutar la ciudad, descansar y vivir
              una estadía con identidad local.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-50 flex w-full justify-center h-[400px] md:h-[200px] lg:h-[140px] ">
        <div className="absolute top-[-100px] z-50 w-full max-w-7xl sm:bottom-[-280px] md:bottom-[-200px] lg:bottom-[-80px] xl:bottom-[-80px]">
          {/* AQUÍ APLICAMOS EL SUSPENSE SOLO AL BUSCADOR */}
          <Suspense
            fallback={
              <div className="flex min-h-[100px] w-full items-center justify-center rounded-2xl bg-surface shadow-2xl backdrop-blur-xl">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            }
          >
            <SearcherComponent />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
