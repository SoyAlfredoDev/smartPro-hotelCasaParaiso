"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Copy } from "lucide-react";

interface LocationProps {
  hotelName?: string;
  address?: string;
  lat?: string;
  lng?: string;
  googleMapsEmbedUrl?: string;
}

export default function LocationMapSection({
  hotelName = "Hotel Casa Paraíso",
  address = "Avenida República 19, Santiago Centro, Chile",
  googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1352458428163!2d-70.66907482343834!3d-33.44510049725892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c50710609b43%3A0xc6a8c4309a47796d!2sAv.%20Rep%C3%BAblica%2019%2C%208370040%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1714400000000!5m2!1ses-419!2scl",
}: LocationProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mapY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Dirección copiada al portapapeles");
  };

  return (
    <section
      id="ubicacion"
      ref={containerRef}
      className="relative bg-[#f5f5f3] py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative Blur Glow */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[#8fa89e]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          {/* Columna de Información */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex rounded-full border border-[#2f5d50]/20 bg-[#2f5d50]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2f5d50]"
            >
              Ubicación Privilegiada
            </motion.span>

            <h2 className="mt-6 font-chillax text-4xl font-bold leading-tight text-[#2b2b2b] md:text-5xl lg:text-6xl tracking-tight">
              En el corazón de la elegancia
            </h2>

            <p className="mt-6 font-inter text-lg text-[#6f6f6f] leading-relaxed">
              {hotelName} se encuentra ubicado en un sector histórico y
              estratégico, permitiendo un acceso fluido a los puntos de interés
              más importantes de la ciudad.
            </p>

            {/* Card de Dirección */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 rounded-3xl border border-[#e5e5e5]/60 bg-white/60 backdrop-blur-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2f5d50]/10 text-[#2f5d50] shadow-inner">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-inter text-[11px] font-bold uppercase tracking-[0.15em] text-[#9a9a9a]">
                    Dirección
                  </p>
                  <p className="mt-1.5 font-inter text-base font-semibold text-[#2b2b2b] leading-tight">
                    {address}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-5 py-2.5 text-sm font-semibold text-[#6f6f6f] transition-all hover:bg-[#f5f5f3] hover:text-[#2b2b2b] hover:shadow-sm active:scale-95"
                >
                  <Copy className="h-4 w-4" /> Copiar
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#2f5d50] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1e3f36] hover:shadow-[0_8px_20px_rgba(47,93,80,0.3)] active:scale-95"
                >
                  <Navigation className="h-4 w-4" /> Cómo llegar
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna del Mapa */}
          <motion.div
            style={{ y: mapY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative lg:col-span-7 p-[-8]"
          >
            {/* Ventana Física Effect */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square xl:aspect-video w-full overflow-hidden rounded-[2.5rem] bg-[#e5e5e5]">
              {/* Outer Frame with Inner Shadow to look like a window */}
              <div className="absolute inset-0 z-10 pointer-events-none rounded-[2.5rem] border-[12px] border-white shadow-[inset_0_4px_20px_rgba(0,0,0,0.15)]" />

              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5" />

              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute  inset-0 grayscale-[0.3] opacity-90 transition-all duration-1000 hover:grayscale-0 hover:opacity-100 object-cover "
              ></iframe>
            </div>

            {/* Decoración flotante con animación sutil */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 hidden h-20 w-20 rounded-2xl bg-primary p-4 shadow-[0_20px_40px_rgba(200,169,126,0.4)] lg:block z-50"
            >
              <MapPin className="h-full w-full text-white opacity-80" />
            </motion.div>

            {/* Drop Shadow for the entire window */}
            <div className="absolute inset-0 -z-10 translate-y-8 scale-95 rounded-[3rem] bg-black/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
