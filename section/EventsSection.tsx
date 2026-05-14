"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  PartyPopper,
  Rocket,
  Mic2,
  GlassWater,
  Presentation,
} from "lucide-react";
import EventCard from "@/components/events/EventCard";
import EventsHeader from "@/components/events/EventsHeader";

/* ─────────────────────────────────────────────
   Event Categories Data
   ───────────────────────────────────────────── */
const eventCategories = [
  {
    title: "Eventos Corporativos",
    description:
      "Equipamiento audiovisual de última generación, conectividad premium y un espacio diseñado para que tu empresa deje huella. Reuniones, seminarios y conferencias con estándar ejecutivo.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    tag: "Corporativo",
    icon: Building2,
    layout: "featured" as const,
  },
  {
    title: "Celebraciones Privadas",
    description:
      "Cumpleaños, aniversarios y fiestas íntimas en un entorno sofisticado. Cada detalle pensado para crear recuerdos inolvidables con quienes más importan.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    tag: "Celebraciones",
    icon: PartyPopper,
    layout: "standard" as const,
  },
  {
    title: "Lanzamientos de Marca",
    description:
      "Un escenario premium para presentar tus productos al mundo. Iluminación escénica, zonas de networking y producción integral para máximo impacto mediático.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    tag: "Lanzamientos",
    icon: Rocket,
    layout: "standard" as const,
  },
  {
    title: "Galas & Premiaciones",
    description:
      "Alfombra roja, iluminación dramática y un espacio que respira exclusividad. Organizamos cada elemento para que tu gala sea un evento de clase mundial.",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
    tag: "Galas",
    icon: GlassWater,
    layout: "standard" as const,
  },
  {
    title: "Conferencias & Charlas",
    description:
      "Acústica profesional, sistema de microfonía avanzado y layout flexible para audiencias de hasta 500 personas. El foro ideal para compartir ideas.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    tag: "Conferencias",
    icon: Presentation,
    layout: "standard" as const,
  },
];

/**
 * 
 * {
    title: "Shows & Espectáculos",
    description:
      "Escenario equipado con luces inteligentes, sonido envolvente y backstage profesional. Ideal para shows en vivo, stand-up y espectáculos artísticos.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    tag: "Espectáculos",
    icon: Mic2,
    layout: "standard" as const,
  }
 */

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/* ─────────────────────────────────────────────
   Bottom CTA Banner
   ───────────────────────────────────────────── */
const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */
export default function EventsSection() {
  const handleRequestQuote = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="eventos"
      className="relative overflow-hidden bg-[#1a3a31] py-20 sm:py-24 lg:py-32"
    >
      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large warm glow — top-right */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.06, 0.11, 0.06],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[12%] -top-[8%] h-[700px] w-[700px] rounded-full bg-[#c8a97e] blur-[200px]"
        />
        {/* Green glow — bottom-left */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.04, 0.09, 0.04],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -bottom-[15%] -left-[8%] h-[600px] w-[600px] rounded-full bg-[#8fa89e] blur-[180px]"
        />
        {/* Center accent glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute left-[40%] top-[50%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a97e] blur-[200px]"
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative vertical line accents */}
      <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#c8a97e]/10 to-transparent lg:block" />
      <div className="pointer-events-none absolute right-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#c8a97e]/10 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <EventsHeader />

        {/* ── Bento Grid — Asymmetric Mosaic ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoFlow: "dense" }}
        >
          {eventCategories.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              description={event.description}
              image={event.image}
              tag={event.tag}
              icon={event.icon}
              layout={event.layout}
              onRequestQuote={handleRequestQuote}
            />
          ))}
        </motion.div>

        {/* ── Bottom CTA Banner ── */}
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-xl sm:p-12 lg:p-16">
            {/* Inner glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#c8a97e]/10 blur-[120px]" />

            <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-xl">
                <h3 className="font-chillax text-2xl font-bold text-white sm:text-3xl">
                  ¿Tienes un evento en mente?
                </h3>
                <p className="mt-3 font-inter text-[14px] leading-[1.7] text-white/50">
                  Nuestro equipo de producción está listo para diseñar una
                  experiencia a la medida. Solicita tu cotización personalizada
                  sin compromiso.
                </p>
              </div>

              <button
                onClick={handleRequestQuote}
                className="btn-accent group/btn flex shrink-0 items-center gap-2.5 rounded-xl px-8 py-4 font-inter text-[13px] font-bold uppercase tracking-wider"
              >
                Contáctanos
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
