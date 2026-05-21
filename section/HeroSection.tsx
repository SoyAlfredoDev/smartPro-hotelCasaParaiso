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
            src="/images/hero.png"
            alt="Casa Paraíso Hotel"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        {/* Gradiente mejorado: Más oscuro a la izquierda para asegurar legibilidad */}
        <div className="absolute inset-0 " />
        {/* Gradiente inferior para suavizar la transición al componente solapado */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2f5d50]/40" />

        {/* Contenido Principal */}
        <div className="z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-10 md:py-20 lg:px-8 ">
          
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
