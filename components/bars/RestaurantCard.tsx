"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

interface Restaurant {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video: string;
  features: string[];
  icon: any;
  color: string;
}

export default function RestaurantsCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const Icon = restaurant.icon;
  const [isPlaying, setIsPlaying] = useState(true); // Asumimos true porque tiene autoPlay
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error al reproducir:", error));
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-card transition-all duration-500 hover:shadow-elevated border border-[#e5e5e5]/50 hover:border-[#c8a97e]/30"
    >
      {/* Video Section */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[300px]">
        <video
          ref={videoRef}
          src={restaurant.video}
          poster={restaurant.image}
          autoPlay={false}
          loop
          muted
          playsInline // CRÍTICO: Evita que el video se abra en un modal en iOS/Móviles
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Subtle gradient overlay for image depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none" />

        {/* Floating badge */}
        <div className="absolute left-5 top-5 z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <Icon className="h-3.5 w-3.5 text-[#c8a97e]" />
            <span className="font-inter text-[10px] font-bold uppercase tracking-widest text-[#2f5d50]">
              {restaurant.subtitle}
            </span>
          </div>
        </div>

        {/* Botón central Play/Pause (Optimizado para móvil y desktop) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 md:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#2f5d50] hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <h3 className="font-chillax text-2xl font-bold tracking-tight text-[#2b2b2b] transition-colors duration-300 group-hover:text-[#2f5d50]">
          {restaurant.title}
        </h3>

        <p className="mt-3 line-clamp-3 font-inter text-[14px] leading-[1.7] text-[#6f6f6f]">
          {restaurant.description}
        </p>

        {/* Features Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {restaurant.features.map((feat) => (
            <span
              key={feat}
              className="inline-flex items-center rounded-lg bg-[#faf8f5] px-2.5 py-1.5 font-inter text-[11px] font-medium text-[#2f5d50] transition-colors group-hover:bg-[#2f5d50]/5"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-auto pt-8">
          <div className="h-px w-full bg-gradient-to-r from-[#e5e5e5] to-transparent mb-5 transition-colors duration-300 group-hover:from-[#c8a97e]/30" />

          <Link
            href={`/restaurant/${restaurant.id}`}
            className="group/link inline-flex items-center gap-2 font-inter text-[13px] font-bold text-[#c8a97e] transition-colors hover:text-[#b5966b]"
          >
            Explorar espacio
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
