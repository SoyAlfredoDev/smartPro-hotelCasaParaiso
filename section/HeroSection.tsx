"use client";

import { motion } from "framer-motion";
import SearcherComponent from "@/components/search/SearcherComponent";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export default function HeroSection() {
  return (
    <section className="w-full" id="hero">
      <div className="relative min-h-[600px] md:min-h-[70vh] flex w-full flex-col overflow-hidden md:justify-center">
        <div className="h-[40px] md:hidden"></div>
        {/* Imagen de fondo con sutil animación de zoom inicial */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 h-[85vh] w-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
            alt="Casa Paraíso Hotel"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        {/* Gradiente mejorado: Más oscuro a la izquierda para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f5d50] via-[#2f5d50]/60 to-transparent" />
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
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/80 bg-[#c8a97e]/10 px-4 py-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Estadía boutique en Santiago
            </motion.span>

            {/* Asumiendo que tienes 'font-chillax' en tu tailwind.config */}
            <h1 className="mt-6 font-chillax text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Bienvenido a tu hogar en Santiago
            </h1>

            <p className="mt-6 font-inter text-gray-200 leading-relaxed  text-lg md:text-xl mb-[10px]">
              Descubre una experiencia cálida, elegante y cómoda en una
              ubicación estratégica para disfrutar la ciudad, descansar y vivir
              una estadía con identidad local.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 flex w-full justify-center h-[400px] md:h-[200px] lg:h-[140px] ">
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
