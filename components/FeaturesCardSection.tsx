"use client";

import { MapPin, Bed, Utensils, User, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: "-60px" as const, amount: 0.2 };

const features = [
  {
    id: 1,
    icon: MapPin,
    title: "Ubicación estratégica",
    description: "Fácil acceso a los principales puntos de la ciudad.",
  },
  {
    id: 2,
    icon: Bed,
    title: "Habitaciones cómodas",
    description: "Espacios modernos y acogedores para tu descanso.",
  },
  {
    id: 3,
    icon: Utensils,
    title: "Restaurante en el hotel",
    description: "Disfruta de nuestra cocina turca e internacional.",
  },
  {
    id: 4,
    icon: User,
    title: "Atención personalizada",
    description: "Nos enfocamos en que tu experiencia sea única.",
  },
];

const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

export default function FeaturesCardSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 pb-24 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.header
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-14 text-center md:mb-16 lg:mb-20"
        >
          <motion.p
            variants={headerItemVariants}
            className="mb-4 text-[16px] font-medium uppercase tracking-[0.2em] text-gray-500"
          >
            HOTEL CASA PARAÍSO
          </motion.p>

          <motion.div
            variants={headerItemVariants}
            className="mx-auto h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent"
          />

          <motion.h1
            variants={headerItemVariants}
            className="mt-6 font-chillax text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl lg:text-6xl"
          >
            Todo lo que buscas en{" "}
            <span className="bg-gradient-to-r from-[#2f5d50] to-[#8fa89e] bg-clip-text text-transparent">
              una estadía
            </span>
          </motion.h1>

          <motion.p
            variants={headerItemVariants}
            className="mx-auto mt-6 max-w-xl font-inter text-[16px] leading-[1.8] text-[#6f6f6f]"
          >
            Ubicación estratégica, habitaciones cómodas, restaurante y atención
            personalizada en un solo lugar.
          </motion.p>
        </motion.header>

        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              reduceMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  reduceMotion: boolean | null;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  reduceMotion,
}: FeatureCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              transition: { duration: 0.35, ease: EASE_PREMIUM },
            }
      }
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100/80 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-500 ease-out hover:border-[#c8a97e]/25 hover:shadow-[0_12px_32px_rgba(47,93,80,0.08)] sm:p-7"
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#2f5d50]/[0.06] transition-colors duration-500 group-hover:bg-[#2f5d50]/10"
          whileHover={
            reduceMotion ? undefined : { scale: 1.04, transition: { duration: 0.3 } }
          }
        >
          <Icon
            className="h-6 w-6 text-[#2f5d50] transition-transform duration-500 group-hover:scale-105"
            strokeWidth={2.25}
          />
        </motion.div>

        <h3 className="pt-0.5 text-[16px] font-bold leading-snug tracking-tight text-gray-800">
          {title}
        </h3>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-gray-500 sm:mt-6">
        {description}
      </p>
    </motion.article>
  );
}
