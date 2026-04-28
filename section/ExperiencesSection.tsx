"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Train,
  Ticket,
  TreePine,
  Building,
  Coffee,
  ArrowUpRight,
} from "lucide-react";

// Datos de lugares de interés cercanos
const attractions = [
  {
    title: "Cerro Santa Lucía",
    description:
      "Un oasis de naturaleza y arquitectura en pleno centro. Sube a la cima para disfrutar de las mejores vistas panorámicas de Santiago.",
    image: "/images/Porta_cerro_santa_lucia.jpg",
    tag: "Naturaleza",
    icon: TreePine,
    span: "large",
  },
  {
    title: "Fantasilandia",
    description:
      "El parque de diversiones más icónico del país, ubicado a pocos minutos. Ideal para una tarde llena de adrenalina y diversión.",
    image:
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=1200&q=80",
    tag: "Entretención",
    icon: Ticket,
    span: "normal",
  },
  {
    title: "Red de Metro",
    description:
      "Nuestros hoteles cuentan con acceso rápido a las principales estaciones de Metro, conectándote con toda la ciudad en minutos.",
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80",
    tag: "Conectividad",
    icon: Train,
    span: "normal",
  },
  {
    title: "Barrio Lastarria",
    description:
      "Sumérgete en la cultura santiaguina. Museos, centros culturales, cine independiente y una oferta gastronómica inigualable.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    tag: "Cultura",
    icon: Coffee,
    span: "large",
  },
  {
    title: "Palacio de La Moneda",
    description:
      "Conoce el centro cívico y el patrimonio histórico del país, rodeado de plazas y arquitectura clásica a pasos de tu alojamiento.",
    image: "/images/palacio-de-la-moneda.jpg",
    tag: "Historia",
    icon: Building,
    span: "large",
  },
  {
    title: "Movistar Arena",
    description:
      "Asiste a los mejores conciertos y eventos internacionales alojándote a una distancia privilegiada del recinto.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    tag: "Eventos",
    icon: MapPin,
    span: "normal",
  },
];

// Stagger animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AttractionsSection() {
  return (
    <section
      id="entorno"
      className="relative overflow-hidden bg-[#faf8f5] py-24 lg:py-32"
    >
      {/* Warm decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top warm glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#c8a97e] blur-[160px]"
        />
        {/* Bottom green glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -right-[5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#2f5d50] blur-[160px]"
        />
      </div>

      {/* Decorative vertical line accent */}
      <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#c8a97e]/15 to-transparent lg:block" />
      <div className="pointer-events-none absolute right-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#c8a97e]/15 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header – Left-aligned for variety */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mb-16 max-w-3xl lg:mb-20 "
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#c8a97e]" />
            <span className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8a97e]">
              Descubre el entorno
            </span>
          </div>

          <h2 className="mt-6 font-chillax text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Tu punto de partida <br className="hidden lg:block" />
            <span className="text-[#2f5d50]">ideal</span>
          </h2>

          <p className="mt-6 max-w-xl font-inter text-[15px] leading-[1.8] text-[#6f6f6f]">
            Nuestra ubicación estratégica te sitúa a pasos de los lugares más
            emblemáticos, centros de entretenimiento y la mejor conectividad de
            la ciudad.
          </p>
        </motion.div>

        {/* Bento-style asymmetric grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 "
        >
          {attractions.map((place, index) => {
            const Icon = place.icon;
            const isLarge = place.span === "large";

            return (
              <motion.article
                key={place.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.35 } }}
                className={`group relative overflow-hidden rounded-[1.75rem] ${
                  isLarge
                    ? "md:col-span-2 lg:col-span-2"
                    : "md:col-span-1 lg:col-span-1"
                }`}
              >
                {/* Full-bleed image card with content overlay */}
                <div
                  className={`relative w-full overflow-hidden ${
                    isLarge ? "h-[320px] lg:h-[380px]" : "h-[380px]"
                  }`}
                >
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    sizes={
                      isLarge
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />

                  {/* Gradient overlays for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2f5d50]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Floating tag top-left */}
                  <div className="absolute left-5 top-5 z-20 ">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-inter text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl">
                      <Icon className="h-3 w-3" />
                      {place.tag}
                    </span>
                  </div>

                  {/* Map link icon top-right */}
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + " Santiago Chile")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-white/25"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  {/* Content overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
                    <h3 className="font-chillax text-2xl font-bold text-white sm:text-3xl">
                      {place.title}
                    </h3>

                    {/* Description – revealed on hover with smooth slide */}
                    <motion.p
                      initial={false}
                      className="mt-2 max-w-lg font-inter text-[13px] leading-relaxed text-white/70 transition-all duration-500 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100"
                    >
                      {place.description}
                    </motion.p>

                    {/* Inline map link */}
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + " Santiago Chile")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-inter text-[12px] font-semibold text-[#c8a97e] opacity-0 transition-all duration-500 group-hover:opacity-100"
                    >
                      Ver en el mapa
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
