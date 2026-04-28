"use client";

import { motion, Variants } from "framer-motion";
import {
  Crown,
  Car,
  Shield,
  Clock,
  Globe,
  MapPin,
  Plane,
  Star,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */
const services = [
  {
    id: "exclusive",
    tier: "Exclusive Premium",
    tagline: "La excelencia en cada trayecto",
    description:
      "Vehículos de gama alta con conductores bilingües capacitados para ofrecer un servicio discreto y personalizado. Ideal para ejecutivos, parejas o quienes desean un traslado con la más alta distinción.",
    icon: Crown,
    accentColor: "#c8a97e",
    accentBg: "rgba(200, 169, 126, 0.12)",
    accentBorder: "rgba(200, 169, 126, 0.20)",
    features: [
      { icon: Star, label: "Vehículos de gama alta" },
      { icon: Globe, label: "Conductores bilingües" },
      { icon: Shield, label: "Máxima privacidad" },
      { icon: MapPin, label: "Seguimiento en tiempo real" },
      { icon: Plane, label: "Recepción directa en aeropuerto" },
      { icon: Clock, label: "Disponibilidad 24/7" },
    ],
    cta: "Reservar traslado VIP",
  },
  {
    id: "confort",
    tier: "Confort Estándar",
    tagline: "Comodidad y eficiencia urbana",
    description:
      "Una opción impecable para tus desplazamientos en la ciudad o hacia el aeropuerto. Vehículos modernos, puntuales y con toda la comodidad que necesitas para moverte con tranquilidad.",
    icon: Car,
    accentColor: "#8fa89e",
    accentBg: "rgba(143, 168, 158, 0.12)",
    accentBorder: "rgba(143, 168, 158, 0.20)",
    features: [
      { icon: Car, label: "Vehículos modernos y cómodos" },
      { icon: Clock, label: "Puntualidad garantizada" },
      { icon: Plane, label: "Traslados aeropuerto ↔ hotel" },
      { icon: MapPin, label: "Seguimiento en tiempo real" },
      { icon: Globe, label: "Conductores bilingües" },
      { icon: Shield, label: "Seguro de pasajeros incluido" },
    ],
    cta: "Solicitar traslado",
  },
];

const highlights = [
  {
    icon: Clock,
    title: "Disponibilidad 24/7",
    text: "Servicio operativo las 24 horas, los 7 días de la semana, sin importar tu horario de llegada.",
  },
  {
    icon: Globe,
    title: "Conductores bilingües",
    text: "Comunicación fluida en español e inglés para tu total comodidad.",
  },
  {
    icon: MapPin,
    title: "Seguimiento en tiempo real",
    text: "Monitorea la ubicación de tu vehículo desde la solicitud hasta la llegada.",
  },
  {
    icon: Plane,
    title: "Recepción en aeropuerto",
    text: "Tu conductor te espera con señalética personalizada en la zona de llegadas.",
  },
];

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */
const sectionHeader: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 45,
      damping: 18,
      mass: 1,
    },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const highlightCard: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function AdditionalServicesSection() {
  return (
    <section
      id="traslados"
      className="relative overflow-hidden bg-[#141414] py-24 lg:py-32"
    >
      {/* ── Ambient Glows ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.04, 0.09, 0.04],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[12%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#c8a97e] blur-[200px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute -left-[8%] bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#2f5d50] blur-[180px]"
        />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/20 bg-[#c8a97e]/8 px-5 py-2 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]"
          >
            <Car className="h-3.5 w-3.5" />
            Movilidad Exclusiva
          </motion.span>

          <h2 className="mt-6 font-chillax text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Servicios de traslado{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#c8a97e] to-[#d4bb96] bg-clip-text text-transparent">
              y movilidad
            </span>
          </h2>

          <div className="mx-auto mt-5 h-[1.5px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#c8a97e]/50 to-transparent" />

          <p className="mt-6 font-inter text-[15px] leading-[1.8] text-white/50">
            Llegar y moverte por Santiago nunca fue tan fácil. Elige el nivel de
            servicio que mejor se adapte a tu estilo y déjanos encargarnos de
            cada detalle de tu transporte.
          </p>
        </motion.div>

        {/* ── Service Tier Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {services.map((service) => {
            const TierIcon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardReveal}
                whileHover={{ y: -6, transition: { duration: 0.4 } }}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                {/* Card inner glow on hover */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-[200px] w-[200px] rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: service.accentColor }}
                />

                <div className="relative z-10 flex flex-1 flex-col p-8 sm:p-10">
                  {/* Tier Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-105"
                        style={{
                          background: service.accentBg,
                          borderColor: service.accentBorder,
                        }}
                      >
                        <TierIcon
                          className="h-6 w-6"
                          style={{ color: service.accentColor }}
                        />
                      </div>
                      <div>
                        <h3 className="font-chillax text-xl font-bold text-white sm:text-2xl">
                          {service.tier}
                        </h3>
                        <p
                          className="mt-0.5 font-inter text-[12px] font-medium tracking-wide"
                          style={{ color: service.accentColor }}
                        >
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {service.id === "exclusive" && (
                      <span className="flex items-center gap-1 rounded-full border border-[#c8a97e]/20 bg-[#c8a97e]/10 px-3 py-1 font-inter text-[9px] font-bold uppercase tracking-widest text-[#c8a97e]">
                        <Sparkles className="h-3 w-3" />
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-6 font-inter text-[14px] leading-[1.8] text-white/45">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-30px" }}
                    className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    {service.features.map((feat) => {
                      const FeatIcon = feat.icon;
                      return (
                        <motion.div
                          key={feat.label}
                          variants={featureItem}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                            style={{
                              background: service.accentBg,
                              borderColor: service.accentBorder,
                            }}
                          >
                            <FeatIcon
                              className="h-3.5 w-3.5"
                              style={{ color: service.accentColor }}
                            />
                          </div>
                          <span className="font-inter text-[13px] font-medium text-white/60">
                            {feat.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Divider + CTA */}
                  <div className="mt-auto pt-8">
                    <div
                      className="h-px w-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${service.accentColor}20, transparent)`,
                      }}
                    />
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 font-inter text-[13px] font-semibold text-white transition-shadow duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}cc)`,
                          boxShadow: `0 4px 20px ${service.accentColor}30`,
                        }}
                      >
                        {service.cta}
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>

                      <a
                        href="tel:+56935841793"
                        className="group/phone flex items-center gap-2 font-inter text-[12px] font-semibold text-white/35 transition-colors duration-300 hover:text-white/70"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Consultar por teléfono
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/phone:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Highlights Strip ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={highlightCard}
                custom={index}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c8a97e]/8 text-[#c8a97e] transition-all duration-300 group-hover:bg-[#c8a97e]/15">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h4 className="mt-3 font-inter text-[13px] font-bold text-white/80">
                  {item.title}
                </h4>
                <p className="mt-1.5 font-inter text-[12px] leading-relaxed text-white/35">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Trust Footer Line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#8fa89e]/60" />
            <span className="font-inter text-[11px] font-medium text-white/30">
              Conductores verificados
            </span>
          </div>
          <div className="hidden h-3 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#8fa89e]/60" />
            <span className="font-inter text-[11px] font-medium text-white/30">
              Seguro de pasajeros incluido
            </span>
          </div>
          <div className="hidden h-3 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#8fa89e]/60" />
            <span className="font-inter text-[11px] font-medium text-white/30">
              Cancelación flexible
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
