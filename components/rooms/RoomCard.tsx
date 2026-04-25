import {
  Users,
  Coffee,
  Wifi,
  Car,
  Dog,
  Wine,
  Tv,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// 1. Tipado correcto para autocompletado y evitar errores
interface RoomProps {
  id?: string;
  name: string;
  description: string;
  price: number | string;
  capacity: number;
  amenities: string[] | string; // Soporta array o string simple
  images: string;
}

// 2. Función auxiliar para mapear el nombre del servicio a su ícono correspondiente
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

  // Ícono por defecto si no coincide con ninguno de los anteriores
  return <CheckCircle2 size={14} className="text-primary" />;
};

export default function RoomCard({ room }: { room: RoomProps }) {
  return (
    <motion.div
      // Animación de entrada fluida al aparecer en pantalla
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group mx-auto my-3 flex w-full max-w-[1000px] flex-col overflow-hidden rounded-2xl border border-default bg-surface shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl md:flex-row"
    >
      {/* Contenedor de Información (70% en Desktop, orden 2 en móvil, 1 en desktop) */}
      <div className="order-2 flex flex-1 flex-col justify-between p-5 md:order-1 md:w-[70%] lg:p-7">
        {/* Cabecera y Descripción */}
        <div>
          <div className="mb-2 flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
              {room.name}
            </h3>
            {/* Precio destacado en la esquina superior derecha del área de texto */}
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
        <div className="mt-6  gap-4 border-t border-default pt-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Capacidad */}
          <div className="flex w-full items-center gap-2 text-sm font-medium text-text-primary whitespace-nowrap">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users size={16} />
            </div>
            <span>Hasta {room.capacity} personas</span>
          </div>

          {/* Amenidades */}
          <div className="w-full flex flex-wrap mt-2 gap-2">
            {Array.isArray(room.amenities) ? (
              room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  // Añadí flex, items-center y gap-1.5 para alinear el ícono con el texto
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
        <div className="mt-6 flex w-full items-center justify-between border-t border-default pt-4">
          <Link
            href={`/room/${room.id}`}
            className="flex items-center gap-2 text-sm font-medium whitespace-nowrap border border-default rounded-lg px-2.5 py-1 bg-primary text-white px-4 py-2 cursor-pointer"
          >
            <Eye size={16} />
            ver habitación
          </Link>
        </div>
      </div>

      {/* Contenedor de Imagen (30% en Desktop, orden 1 en móvil, 2 en desktop) */}
      <div className="relative order-1 h-56 w-full shrink-0 overflow-hidden bg-background md:order-2 md:h-auto md:w-[30%]">
        <img
          src={room.images[0]}
          alt={`Imagen de ${room.name}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Etiqueta flotante opcional sobre la imagen */}
        <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm md:hidden">
          Disponible
        </div>
      </div>
    </motion.div>
  );
}
