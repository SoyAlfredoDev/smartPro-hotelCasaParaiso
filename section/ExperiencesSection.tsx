"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const experiences = [
  {
    title: "Escapada Romántica",
    description:
      "Un ambiente íntimo y acogedor ideal para desconectar y disfrutar en pareja con todos los detalles cuidados.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Viaje de Negocios",
    description:
      "Espacios funcionales y bien ubicados para maximizar tu productividad sin perder comodidad.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Estadía Familiar",
    description:
      "Ambientes amplios y cómodos para compartir con familia, con todo lo necesario para una experiencia relajada.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
];

// Animaciones consistentes con la sección anterior
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ExperiencesSection() {
  return (
    <section id="experiencias" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Experiencias
          </span>

          <h2 className="mt-5 font-chillax text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Mucho más que una estadía
          </h2>

          <p className="mt-5 font-inter text-base leading-relaxed text-text-secondary sm:text-lg">
            Diseñamos experiencias pensadas para distintos tipos de huéspedes,
            combinando comodidad, ubicación y estilo en cada detalle.
          </p>
        </motion.div>

        {/* Grid Animado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {experiences.map((exp) => (
            <motion.article
              key={exp.title}
              variants={cardVariants}
              className="group relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-3xl lg:h-[420px]"
            >
              {/* Contenedor de Imagen de Fondo */}
              <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-surface">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />

                {/* Gradiente Overlay: Usando tu tono oscuro #021f41 para mayor elegancia */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8fa89e]/75 via-[#8fa89e]/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              </div>

              {/* Contenido (Texto y Botón) */}
              <div className="relative z-10 flex flex-col p-6 sm:p-8">
                <h3 className="font-chillax text-2xl font-bold text-white shadow-sm">
                  {exp.title}
                </h3>

                <p className="mt-3 font-inter text-sm leading-relaxed text-gray-200">
                  {exp.description}
                </p>

                <div className="mt-6">
                  <Link
                    href="#reservar"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
