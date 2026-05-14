"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

export interface EventCardProps {
  title: string;
  description: string;
  image: string;
  tag: string;
  icon: LucideIcon;
  /** Controls the grid span: "featured" takes 2 cols, "tall" is taller */
  layout: "featured" | "tall" | "standard";
  /** Framer Motion variant key */
  variants?: Variants;
  onRequestQuote?: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 22,
      mass: 0.9,
    },
  },
};

export default function EventCard({
  title,
  description,
  image,
  tag,
  icon: Icon,
  layout,
  variants = cardVariants,
  onRequestQuote,
}: EventCardProps) {
  const isFeatured = layout === "featured";
  const isTall = layout === "tall";

  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`group relative overflow-hidden rounded-[1.75rem] cursor-pointer ${
        isFeatured
          ? "md:col-span-2 lg:col-span-2"
          : "md:col-span-1 lg:col-span-1"
      } ${isTall ? "md:row-span-2" : ""}`}
    >
      {/* Image Container */}
      <div
        className={`relative w-full overflow-hidden ${
          isFeatured
            ? "h-[340px] lg:h-[420px]"
            : isTall
              ? "h-[380px] lg:h-[840px] bg-red"
              : "h-[380px] lg:h-[420px]"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />

        {/* Multi-layer gradient overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2f5d50]/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Subtle top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        {/* Floating tag badge — top-left */}
        <div className="absolute left-5 top-5 z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-500 group-hover:border-[#c8a97e]/30 group-hover:bg-[#c8a97e]/15">
            <Icon className="h-3.5 w-3.5" />
            {tag}
          </span>
        </div>

        {/* Decorative corner accent — top-right */}
        <div className="absolute  right-5 top-5 z-20 h-12 w-12 rounded-full border border-white/10 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-[#c8a97e]" />
          </div>
        </div>

        {/* Content overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
          {/* Title */}
          <h3
            className={`font-chillax font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#c8a97e] ${
              isFeatured
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            {title}
          </h3>

          {/* Description — revealed on hover with smooth slide */}
          <p className="mt-3 max-w-lg font-inter text-[13px] leading-[1.8] text-white/60 transition-all duration-500 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:mt-3 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
            {description}
          </p>

          {/* CTA Button — slides up on hover */}
          <div className="mt-4 translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-xl border border-[#c8a97e]/30 bg-[#c8a97e]/15 px-5 py-2.5 font-inter text-[12px] font-bold uppercase tracking-wider text-[#c8a97e] backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-[#c8a97e]/50 hover:bg-[#c8a97e]/25 active:scale-95"
            >
              Solicitar Cotización
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Decorative bottom line accent */}
          <div className="mt-5 h-px w-0 bg-gradient-to-r from-[#c8a97e] to-transparent transition-all duration-700 ease-out group-hover:w-full" />
        </div>
      </div>
    </motion.article>
  );
}
