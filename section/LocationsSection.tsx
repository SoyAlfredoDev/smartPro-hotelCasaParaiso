"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import hotels from "@/public/assets/hotels";

/* ── Variants ── */
const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardWrapperVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: 4 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 18,
      mass: 1.2,
    },
  },
};

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 1.02,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/* ── Hotel Card Component ── */
function HotelCard({
  hotel,
  index,
}: {
  hotel: (typeof hotels)[0];
  index: number;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const [direction, setDirection] = useState(0);
  const isReversed = index % 2 !== 0;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImg((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = hotel.images.length - 1;
      if (nextIndex >= hotel.images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <motion.article
      variants={cardRevealVariants}
      className={`group grid grid-cols-1 gap-0 overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-shadow duration-700 hover:shadow-[0_20px_60px_rgba(47,93,80,0.12)] lg:grid-cols-2 shadow-lg  ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
      style={{ perspective: "1200px" }}
    >
      {/* Image Gallery Side */}
      <div
        className={`relative h-[340px] overflow-hidden lg:h-auto lg:min-h-[480px] ${
          isReversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImg}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 28 },
              opacity: { duration: 0.35 },
              scale: { duration: 0.4 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={hotel.images[currentImg]}
              alt={`Vista de ${hotel.id}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-transparent" />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-20 flex items-center justify-between px-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              paginate(-1);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/40 active:scale-90"
            aria-label="Imagen anterior"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/40 active:scale-90"
            aria-label="Siguiente imagen"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {hotel.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentImg ? 1 : -1);
                setCurrentImg(idx);
              }}
              className={`h-1 rounded-full transition-all duration-400 ${
                idx === currentImg
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Floating Location Badge */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-3.5 py-2 backdrop-blur-xl"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
            <svg
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="font-inter text-[11px] font-semibold tracking-wide text-white">
            {hotel.address}
          </span>
        </motion.div>
      </div>

      {/* Content Side */}
      <div
        className={`relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 ${
          isReversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {/* Decorative accent corner */}
        <div
          className="absolute right-0 top-0 h-32 w-32 opacity-[0.04]"
          style={{
            background: `radial-gradient(circle at top right, ${hotel.accent}, transparent 70%)`,
          }}
        />

        {/* Number index */}
        <span className="font-chillax text-[80px] font-bold leading-none text-[#2f5d50]/80 select-none">
          0{index + 1}
        </span>

        <h3 className="mt-2 font-chillax text-3xl font-bold tracking-tight text-[#2b2b2b] transition-colors duration-500 group-hover:text-[#2f5d50] sm:text-4xl">
          {hotel.name}
        </h3>

        {/* Gold decorative line */}
        <motion.div
          variants={lineVariants}
          className="mt-4 h-[2px] w-12 origin-left rounded-full bg-gradient-to-r from-[#c8a97e] to-[#c8a97e]/30"
        />

        <p className="mt-5 font-inter text-[15px] leading-[1.8] text-[#6f6f6f]">
          {hotel.description}
        </p>

        {/* Amenities as elegant inline list */}
        <div className="mt-6 flex flex-wrap gap-3">
          {hotel.amenities.map((amenity, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#f5f5f3]/80 px-3.5 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#2f5d50] transition-all duration-300 hover:border-[#c8a97e]/40 hover:bg-[#c8a97e]/8"
            >
              <span className="h-1 w-1 rounded-full bg-[#c8a97e]" />
              {amenity.name}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center items-center gap-4 pt-2">
          <Link
            href={`/hotel/${hotel.id}`}
            className="btn-primary gap-2 rounded-xl px-7 py-3 font-inter text-[13px]"
          >
            Ver hotel
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section Component ── */
export default function LocationsSection() {
  return (
    <section
      id="ubicaciones"
      className="relative overflow-hidden bg-[#f5f5f3] py-24"
    >
      {/* Animated ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -left-[8%] top-[5%] h-[450px] w-[450px] rounded-full bg-[#8fa89e] opacity-[0.12] blur-[150px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[8%] bottom-[5%] h-[550px] w-[550px] rounded-full bg-[#c8a97e] opacity-[0.08] blur-[160px]"
          animate={{ x: [0, -40, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute left-[40%] top-[60%] h-[300px] w-[300px] rounded-full bg-[#2f5d50] opacity-[0.06] blur-[120px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/25 bg-[#c8a97e]/8 px-5 py-2 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8a97e] animate-pulse-soft" />
            Nuestras Ubicaciones
          </motion.span>

          <h2 className="mt-6 font-chillax text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl lg:text-6xl">
            Modernidad y{" "}
            <span className="bg-gradient-to-r from-[#2f5d50] to-[#8fa89e] bg-clip-text text-transparent">
              confort
            </span>
          </h2>

          <div className="mx-auto mt-4 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent" />

          <p className="mt-6 max-w-xl font-inter text-[16px] leading-[1.8] text-[#6f6f6f]">
            Descubre nuestras sucursales diseñadas para ofrecerte la mejor
            atención, servicios de primera y una excelente ubicación en la
            ciudad.
          </p>
        </motion.div>

        {/* Stacked editorial cards */}
        <motion.div
          variants={cardWrapperVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="flex flex-col gap-10 lg:gap-14"
        >
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.id} hotel={hotel} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
