"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
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

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/* ── Hotel Card Component ── */
interface HotelCardProps {
  hotel: (typeof hotels)[0] & { video?: string };
  index: number;
}

function HotelCard({ hotel, index }: HotelCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversed = index % 2 !== 0;

  // Sincronizar estados nativos del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        setBuffered((bufferedEnd / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("progress", handleProgress);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("progress", handleProgress);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error(
            "Error al intentar reproducir el video en este dispositivo:",
            error,
          );
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.article
      variants={cardRevealVariants}
      className={`group grid grid-cols-1 gap-0 overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-shadow duration-700 hover:shadow-[0_20px_60px_rgba(47,93,80,0.12)] lg:grid-cols-2 shadow-lg  ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
      style={{ perspective: "1200px" }}
    >
      {/* Video Side */}
      <div
        className={`relative h-[340px] overflow-hidden bg-black lg:h-auto lg:min-h-[480px] ${
          isReversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <video
          ref={videoRef}
          src={hotel.video}
          poster={hotel.images?.[0] || "/images/republica/hotel/lobby-02.jpg"}
          loop
          muted={isMuted}
          playsInline // Atributo crítico para evitar que iOS abra el reproductor nativo en pantalla completa
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.01]"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-transparent" />

        {/* Custom Central Play Button Overlay ─ Ajustado para verse siempre en móviles */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pb-14 md:pb-12">
          <button
            onClick={togglePlay}
            className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 md:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#2f5d50] hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>

        {/* Control Bar ─ Visible por defecto en móviles al no existir hover */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-2">
          {/* Timeline and Buffer Tracker ─ Mayor área interactiva para el touch de los dedos */}
          <div className="relative w-full flex items-center group/timeline h-4 md:h-2">
            {/* Fake Buffer line */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-white/20 rounded-full pointer-events-none"
              style={{ width: `${buffered}%` }}
            />
            {/* Fake Active line */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#c8a97e] rounded-full pointer-events-none z-10"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
            {/* Real Input Ranger */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleScrub}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className="w-full bg-white/10 h-1 rounded-full pointer-events-none" />
          </div>

          {/* Controls Metadata Row */}
          <div className="flex items-center justify-between text-white font-inter text-xs">
            <div className="flex items-center gap-4 md:gap-3">
              <button
                onClick={togglePlay}
                className="p-1 hover:text-[#c8a97e] transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={14} fill="currentColor" />
                ) : (
                  <Play size={14} fill="currentColor" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-1 hover:text-[#c8a97e] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <span className="tracking-wider select-none text-[11px] text-gray-300 ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
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
