"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Users,
  Coffee,
  Wifi,
  Car,
  Dog,
  Wine,
  Tv,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getRooms } from "@/lib/rooms/getRooms";

// Función helper para renderizar el ícono correcto de Lucide
const getAmenityIcon = (amenityName: string) => {
  const name = amenityName.toLowerCase();
  if (name.includes("wi-fi") || name.includes("wifi"))
    return <Wifi className="h-3 w-3" />;
  if (name.includes("tv")) return <Tv className="h-3 w-3" />;
  if (name.includes("cafetería") || name.includes("coffee"))
    return <Coffee className="h-3 w-3" />;
  if (name.includes("estacionamiento") || name.includes("car"))
    return <Car className="h-3 w-3" />;
  if (name.includes("pet") || name.includes("mascota"))
    return <Dog className="h-3 w-3" />;
  if (name.includes("minibar") || name.includes("vino"))
    return <Wine className="h-3 w-3" />;
  if (name.includes("capacidad") || name.includes("persona"))
    return <Users className="h-3 w-3" />;
  return <CheckCircle2 className="h-3 w-3" />;
};

// Animation variants – immersive dark-bg style
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1,
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

interface Room {
  id: string;
  name: string;
  description: string;
  hotelId: string;
  category: string;
  capacity: number;
  price: number;
  images: string[];
  amenities: string[];
}

export default function FeaturedStaysSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    getRooms().then((data) => setRooms(data));
  }, []);
  return (
    <section
      id="habitaciones"
      className="relative overflow-hidden bg-[#1e3f36] py-20 sm:py-24 lg:py-32"
    >
      {/* Background texture & glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large gold glow top-right */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[15%] -top-[10%] h-[700px] w-[700px] rounded-full bg-[#c8a97e] blur-[180px]"
        />
        {/* Green glow bottom-left */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-[#8fa89e] blur-[150px]"
        />
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header – elegant white on dark green */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mb-16 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/20 bg-[#c8a97e]/10 px-4 py-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Nuestras Habitaciones
            </motion.span>

            <h2 className="mt-5 font-chillax text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Diseñadas para tu{" "}
              <span className="bg-gradient-to-r from-[#c8a97e] to-[#d4bb96] bg-clip-text text-transparent">
                comodidad
              </span>
            </h2>

            <p className="mt-5 max-w-xl font-inter text-[15px] leading-[1.8] text-white/60">
              Elige entre nuestras distintas opciones de alojamiento, pensadas
              para brindarte el mejor descanso según tus necesidades de viaje.
            </p>
          </div>

          <Link
            href="#reservar"
            className="btn-accent group/btn flex items-center gap-2 self-start rounded-xl px-7 py-3.5 font-inter text-[13px] lg:self-auto"
          >
            Ver disponibilidad
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </motion.div>

        {/* Cards Grid – glassmorphism on dark */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {rooms.map((room) => (
            <motion.article
              key={room.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.1] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Image Container */}
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
                />
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3f36] via-[#1e3f36]/20 to-transparent opacity-90" />

                {/* Floating tag */}
                <div className="absolute left-4 top-4 z-20">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-3 py-1 font-inter text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {room.category}
                  </span>
                </div>

                {/* Price tag floating bottom-right */}
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="rounded-xl border border-[#c8a97e]/30 bg-[#c8a97e]/15 px-3.5 py-2 backdrop-blur-md">
                    <span className="block font-inter text-[18px] font-bold text-[#c8a97e]">
                      {room.price}
                    </span>
                    <span className="block -mt-0.5 font-inter text-[9px] font-medium tracking-wider uppercase text-[#c8a97e]/70">
                      por noche
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-chillax text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#c8a97e]">
                  {room.name}
                </h3>

                {/* Room details */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.08]">
                      <Users className="h-3 w-3 text-[#c8a97e]" />
                    </div>
                    <span className="font-inter text-[13px] text-white/60">
                      Capacidad:{" "}
                      <strong className="text-white/90">{room.capacity}</strong>
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.08]">
                      <svg
                        className="h-3 w-3 text-[#c8a97e]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <span className="font-inter text-[13px] leading-snug text-white/60">
                      Incluye:{" "}
                      <strong className="text-white/90">
                        {room.description}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="group/amenity inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 font-inter text-[10px] font-medium text-white/50 transition-all duration-300 hover:border-[#c8a97e]/20 hover:bg-[#c8a97e]/8 hover:text-[#c8a97e]"
                    >
                      <span className="transition-colors group-hover/amenity:text-[#c8a97e]">
                        {getAmenityIcon(amenity)}
                      </span>
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Divider & Actions */}
                <div className="mt-auto pt-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`#reservar-${room.name.toLowerCase().replace(/ /g, "-")}`}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-5 font-inter text-[12px] font-bold text-[#1e3f36] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] active:scale-95"
                    >
                      Reservar
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    <Link
                      href="#contacto"
                      className="group/link flex items-center gap-1.5 font-inter text-[12px] font-semibold text-white/40 transition-colors duration-300 hover:text-[#c8a97e]"
                    >
                      Detalles
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
