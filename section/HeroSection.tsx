"use client";

import { motion } from "framer-motion";
import SearcherComponent from "@/components/search/SearcherComponent";
import Image from "next/image";
import { Suspense } from "react";
import FeaturesCardSection from "@/components/FeaturesCardSection";
import { usePathname } from "next/navigation";

export default function HeroSection() {
  const pathname = usePathname();
  return (
    <section className="w-full bg-[#f9f9f7]" id="hero">
      {/* Imagen hero — ~42% del viewport */}
      <div className="relative h-[44vh] min-h-[640px] max-h-[500px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src="/images/hero.png"
            alt="Casa Paraíso Hotel"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Barra de reserva flotante */}
      <div className="relative z-20 -mt-10 sm:-mt-12 md:-mt-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="flex min-h-[88px] w-full items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#3d6355]"></div>
              </div>
            }
          >
            <SearcherComponent />
          </Suspense>
        </div>
      </div>

      {/* Contenido: encabezado + tarjetas */}
      {pathname === "/" && (
        <div className="relative w-full pt-12 md:pt-16">
          <FeaturesCardSection />
        </div>
      )}
    </section>
  );
}
