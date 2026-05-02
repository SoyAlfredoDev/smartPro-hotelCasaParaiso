"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elena Rodríguez",
    role: "Viajera de Negocios",
    content:
      "La atención al detalle en Casa Paraíso es excepcional. El diseño de la suite superó mis expectativas y la tranquilidad del entorno me permitió trabajar y descansar perfectamente.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mark Thompson",
    role: "Turista Internacional",
    content:
      "Ubicación inmejorable. Estás en el corazón de la ciudad pero dentro del hotel se siente una paz absoluta. El servicio de traslado VIP fue puntual y muy profesional.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofía & Javier",
    role: "Escapada Romántica",
    content:
      "Una joya boutique. El desayuno de autor en el restaurante es algo que todavía recordamos. Volveremos sin duda en nuestro próximo aniversario.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 lg:py-36"
    >
      {/* Elementos Decorativos de Fondo con Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] bg-[#8fa89e]/10 blur-[140px] rounded-full" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] bg-[#c8a97e]/10 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Cabecera de Sección */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="inline-block rounded-full border border-[#2f5d50]/15 bg-[#2f5d50]/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2f5d50]">
              Experiencias Reales
            </span>
            <h2 className="mt-6 font-chillax text-4xl font-bold text-[#2b2b2b] md:text-5xl lg:text-6xl tracking-tight max-w-2xl leading-tight">
              Lo que dicen nuestros huéspedes
            </h2>
          </motion.div>
        </div>

        {/* Grid de Testimonios */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative flex flex-col justify-between rounded-[2.5rem] border border-[#e5e5e5]/50 bg-white p-10 transition-all duration-500 hover:-translate-y-3 hover:border-[#2f5d50]/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(47,93,80,0.15)]"
            >
              <div className="relative">
                <Quote className="absolute -top-6 -left-6 h-12 w-12 text-[#2f5d50]/5 rotate-180 transform -scale-x-100" />

                {/* Estrellas */}
                <div className="mb-8 flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) + (idx * 0.1) }}
                    >
                      <Star
                        className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                          i < item.rating
                            ? "fill-[#c8a97e] text-[#c8a97e] drop-shadow-[0_0_8px_rgba(200,169,126,0.6)]"
                            : "fill-transparent text-[#e5e5e5]"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <p className="font-inter text-base italic leading-relaxed text-[#6f6f6f] relative z-10">
                  "{item.content}"
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4 border-t border-[#e5e5e5]/50 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f3] text-[#8fa89e] shadow-inner">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-chillax text-sm font-bold text-[#2b2b2b] tracking-wide">
                    {item.name}
                  </h4>
                  <p className="font-inter text-[11px] font-medium text-[#9a9a9a] uppercase tracking-wider mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Sutil */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 flex justify-center items-center gap-6 text-[#9a9a9a]"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e5e5e5]" />
          <p className="font-inter text-xs font-bold uppercase tracking-[0.2em] text-[#6f6f6f]">
            Promedio 4.9/5 en plataformas
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e5e5e5]" />
        </motion.div>
      </div>
    </section>
  );
}
