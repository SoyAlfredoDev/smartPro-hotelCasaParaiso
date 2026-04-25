"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const locations = [
  {
    title: "San Miguel",
    description:
      "Un entorno residencial tranquilo con excelente conectividad, ideal para descansar sin alejarse de la ciudad.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Restobar San Miguel",
    description:
      "Vive una experiencia única combinando alojamiento y vida nocturna en un mismo lugar con ambiente moderno.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "República",
    description:
      "Ubicación estratégica cercana a universidades, metro y puntos clave de la ciudad para una estadía práctica.",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
];

// Variantes de animación para la cascada (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function LocationsSection() {
  return (
    <section
      id="ubicaciones"
      className="bg-background py-20 mt-[130px] sm:mt-[380px] md:mt-[180px] lg:mt-[80px] lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Ubicaciones
          </span>

          <h2 className="mt-5 font-chillax text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Elige dónde quieres vivir tu experiencia
          </h2>

          <p className="mt-5 font-inter text-base leading-relaxed text-text-secondary sm:text-lg">
            Contamos con distintas ubicaciones pensadas para adaptarse a tu
            estilo de viaje, ya sea descanso, vida urbana o cercanía a puntos
            clave.
          </p>
        </motion.div>

        {/* Grid de Tarjetas Animadas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {locations.map((loc) => (
            <motion.article
              key={loc.title}
              variants={cardVariants}
              className="group flex flex-col overflow-hidden rounded-3xl border border-default bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Contenedor de Imagen con Overlay */}
              <div className="relative h-[280px] w-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface via-surface/10 to-transparent opacity-80" />
                <Image
                  src={loc.image}
                  alt={`Vista de ${loc.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="relative z-20 flex flex-1 flex-col p-6 pt-2 sm:p-8 sm:pt-4">
                <h3 className="font-chillax text-2xl font-bold text-text-primary">
                  {loc.title}
                </h3>

                <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-text-secondary">
                  {loc.description}
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-default/50 pt-6">
                  <Link
                    href="#reservar"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
                  >
                    Reservar
                  </Link>

                  <Link
                    href="#contacto"
                    className="group/link flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Ver más
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
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
