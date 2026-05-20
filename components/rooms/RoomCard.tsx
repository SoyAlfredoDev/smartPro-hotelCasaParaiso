"use client";

import { useState } from "react";
import {
  Users,
  Coffee,
  Wifi,
  Car,
  Dog,
  Wine,
  Tv,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";

interface RoomProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  night: number;
}

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

const getAmenityIcon = (amenityName: string) => {
  const normalized = amenityName.toLowerCase();

  if (normalized.includes("breakfast") || normalized.includes("desayuno")) {
    return <Coffee size={14} className="text-primary" />;
  }
  if (normalized.includes("wifi") || normalized.includes("wi-fi")) {
    return <Wifi size={14} className="text-primary" />;
  }
  if (
    normalized.includes("parking") ||
    normalized.includes("estacionamiento")
  ) {
    return <Car size={14} className="text-primary" />;
  }
  if (normalized.includes("pet") || normalized.includes("mascota")) {
    return <Dog size={14} className="text-primary" />;
  }
  if (normalized.includes("mini bar") || normalized.includes("minibar")) {
    return <Wine size={14} className="text-primary" />;
  }
  if (normalized.includes("tv") || normalized.includes("televisión")) {
    return <Tv size={14} className="text-primary" />;
  }

  return <CheckCircle2 size={14} className="text-primary" />;
};

export default function RoomCard({ room }: { room: RoomProps }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [direction, setDirection] = useState(0);

  const setReservationRoomSelected = useBookingStore(
    (state) => state.setReservationRoomSelected,
  );
  const setReservationTotalPrice = useBookingStore(
    (state) => state.setReservationTotalPrice,
  );
  const nights = useBookingStore((state) => state.nights);
  const router = useRouter();

  const hasMultipleImages = room.images && room.images.length > 1;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImg((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = room.images.length - 1;
      if (nextIndex >= room.images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleReserveRoom = (room: RoomProps) => {
    setReservationRoomSelected(room);
    setReservationTotalPrice(room.price * (nights || 1));
    router.push("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group mx-auto my-3 flex max-w-[540px] w-full flex-col overflow-hidden rounded-2xl border border-default bg-surface shadow-sm transition-all duration-300 hover:border-primary/50 shadow-md"
    >
      {/* 1. Contenedor de Imagen */}
      <div className="relative h-64 w-full shrink-0 overflow-hidden bg-background md:h-80">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImg}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={
                room.images[currentImg] ||
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
              }
              alt={`Imagen de ${room.name}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Etiqueta flotante */}
        <div className="absolute right-3 top-3 z-20 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
          Disponible
        </div>

        {/* Flechas de Navegación (Corregidas para Mobile) */}
        {hasMultipleImages && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                paginate(-1);
              }}
              className="pointer-events-auto flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full border border-default bg-white/90 text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                paginate(1);
              }}
              className="pointer-events-auto flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full border border-default bg-white/90 text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Indicadores de posición (Corregidos para Mobile) */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            {room.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImg ? "w-4 bg-primary" : "w-1 bg-primary/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Contenedor de Información */}
      <div className="flex flex-1 flex-col justify-between p-5 lg:p-7 ">
        {/* Cabecera y Descripción */}
        <div>
          <div className="mb-2 flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
              {room.name}
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-black text-primary">
                {room.price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </span>
              <span className="text-xs uppercase tracking-wider text-text-secondary">
                Por noche
              </span>
            </div>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3 md:text-base">
            {room.description}
          </p>
        </div>

        {/* Footer de la tarjeta: Capacidad y Amenidades */}
        <div className="mt-6 flex flex-col gap-4 border-t border-default pt-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Capacidad */}
          <div className="flex w-full items-center gap-2 text-sm font-medium text-text-primary whitespace-nowrap sm:w-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users size={16} />
            </div>
            <span>Hasta {room.capacity} personas</span>
          </div>

          {/* Amenidades */}
          <div className="flex w-full flex-wrap gap-2 sm:justify-end">
            {Array.isArray(room.amenities) ? (
              room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 rounded-lg bg-background/50 px-2.5 py-1 text-xs font-semibold text-text-secondary border border-default capitalize"
                >
                  {getAmenityIcon(amenity)}
                  {amenity}
                </span>
              ))
            ) : (
              <span className="flex items-center gap-1.5 text-sm text-text-secondary capitalize">
                {getAmenityIcon(room.amenities)}
                {room.amenities}
              </span>
            )}
          </div>
        </div>

        {/* Acción de Reserva */}
        <div className="mt-6 flex w-full items-center justify-between border-t border-default pt-4">
          <button
            onClick={() => handleReserveRoom(room)}
            className="flex items-center gap-2 text-sm font-medium whitespace-nowrap border border-default rounded-lg bg-primary px-5 py-2.5 text-white transition-all duration-300 hover:bg-primary/90 active:scale-98 cursor-pointer shadow-sm"
          >
            <Calendar size={16} />
            Reservar habitación
          </button>
        </div>
      </div>
    </motion.div>
  );
}
