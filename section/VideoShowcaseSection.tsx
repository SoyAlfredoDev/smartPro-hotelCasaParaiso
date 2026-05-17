"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

/* ─── Animation Variants ─── */
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const captionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/* ─── Component ─── */
export default function VideoShowcaseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, closeModal]);

  return (
    <>
      <section
        id="video-showcase"
        className="relative overflow-hidden bg-[#faf8f5] py-24 lg:py-32"
      >
        {/* ── Decorative Background Glows ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#c8a97e] blur-[160px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute -left-[5%] bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#2f5d50] blur-[160px]"
          />
        </div>

        {/* ── Decorative Vertical Lines ── */}
        <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#c8a97e]/15 to-transparent lg:block" />
        <div className="pointer-events-none absolute right-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#c8a97e]/15 to-transparent lg:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Editorial Header ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="mb-16 max-w-3xl lg:mb-20"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c8a97e]" />
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8a97e]">
                Experiencia Audiovisual
              </span>
            </div>

            <h2 className="mt-6 font-chillax text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Vive la experiencia <br className="hidden lg:block" />
              <span className="text-[#2f5d50]">antes de llegar</span>
            </h2>

            <p className="mt-6 max-w-xl font-inter text-[15px] leading-[1.8] text-[#6f6f6f]">
              Sumérgete en los espacios, la atmósfera y los detalles que hacen
              de nuestra estadía una experiencia inolvidable. Un recorrido
              cinematográfico por nuestros rincones más especiales.
            </p>
          </motion.div>

          {/* ── Video Frame ── */}
          <motion.div
            variants={frameVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="relative"
          >
            {/* Main video container */}
            <div
              className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12)]"
              onClick={openModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal();
                }
              }}
              aria-label="Reproducir video del hotel"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/images/video-thumbnail-hotel.png"
                  alt="Vista cinematográfica del Hotel Casa Paraíso"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  priority
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5 transition-opacity duration-500 group-hover:from-black/50 group-hover:via-black/10" />

                {/* Cinematic bars for ultra-wide effect */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-gradient-to-b from-black/30 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* ── Centered Play Button ── */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Outer ring pulse */}
                  <span className="absolute inset-0 animate-ping rounded-full border border-white/20" />

                  {/* Main play button */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/40 sm:h-24 sm:w-24">
                    <Play className="ml-1 h-8 w-8 fill-white text-white sm:h-9 sm:w-9" />
                  </div>
                </motion.div>
              </div>

              {/* ── Bottom Info Bar ── */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6 sm:p-8">
                <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-inter text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl">
                    <Play className="h-2.5 w-2.5 fill-white" />
                    Reproducir recorrido
                  </span>
                </div>

                <span className="font-inter text-[12px] font-medium tracking-wide text-white/50 transition-colors duration-300 group-hover:text-white/70">
                  01:19
                </span>
              </div>
            </div>

            {/* ── Decorative subtle shadow accent ── */}
            <div className="pointer-events-none absolute -bottom-4 left-[5%] right-[5%] h-12 rounded-[2rem] bg-[#2f5d50]/5 blur-2xl" />
          </motion.div>

          {/* ── Bottom Caption ── */}
          <motion.div
            variants={captionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-40px" }}
            className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8a97e]" />
              <span className="font-inter text-[13px] font-medium text-[#6f6f6f]">
                Espacios diseñados para tu bienestar
              </span>
            </div>
            <div className="hidden h-4 w-px bg-[#e0dcd7] sm:block" />
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2f5d50]" />
              <span className="font-inter text-[13px] font-medium text-[#6f6f6f]">
                Un staff cálido y atento a cada detalle
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Full-Screen Video Modal
         ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          >
            {/* Modal content – stop propagation so clicking video doesn't close */}
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative mx-4 w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:text-white sm:-right-12 sm:top-0"
                aria-label="Cerrar video"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Player */}
              <div className="overflow-hidden rounded-[1.25rem] bg-black shadow-2xl">
                <div className="relative aspect-[16/9]">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    autoPlay
                    playsInline
                    muted={isMuted}
                    controls
                    poster="/images/video-thumbnail-hotel.png"
                  >
                    {/* Replace this src with the actual hotel video URL */}
                    <source src="videos/hotel-01.mp4" type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              </div>

              {/* Mute toggle + caption below video */}
              <div className="mt-4 flex items-center justify-between">
                <p className="font-inter text-[13px] font-medium text-white/50">
                  Hotel Casa Paraíso — Recorrido Cinematográfico
                </p>
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-inter text-[11px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white/90"
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX className="h-3.5 w-3.5" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" />
                  )}
                  {isMuted ? "Activar sonido" : "Silenciar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
