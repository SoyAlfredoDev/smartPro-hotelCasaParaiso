import {
  Coffee,
  Wifi,
  Car,
  Dog,
  Wine,
  Tv,
  CheckCircle2,
  Wind,
  Waves,
  Dumbbell,
} from "lucide-react";

interface RoomAmenitiesProps {
  // Aceptamos un array de strings con los servicios
  amenities: string[];
}

// Función para mapear el servicio con su ícono
const getAmenityIcon = (amenityName: string) => {
  const normalized = amenityName.toLowerCase();

  if (normalized.includes("breakfast") || normalized.includes("desayuno")) {
    return <Coffee size={20} className="text-primary" />;
  }
  if (
    normalized.includes("wifi") ||
    normalized.includes("wi-fi") ||
    normalized.includes("internet")
  ) {
    return <Wifi size={20} className="text-primary" />;
  }
  if (
    normalized.includes("parking") ||
    normalized.includes("estacionamiento") ||
    normalized.includes("parqueo")
  ) {
    return <Car size={20} className="text-primary" />;
  }
  if (normalized.includes("pet") || normalized.includes("mascota")) {
    return <Dog size={20} className="text-primary" />;
  }
  if (normalized.includes("mini bar") || normalized.includes("minibar")) {
    return <Wine size={20} className="text-primary" />;
  }
  if (
    normalized.includes("tv") ||
    normalized.includes("televisión") ||
    normalized.includes("pantalla")
  ) {
    return <Tv size={20} className="text-primary" />;
  }
  if (
    normalized.includes("air") ||
    normalized.includes("aire") ||
    normalized.includes("ac")
  ) {
    return <Wind size={20} className="text-primary" />;
  }
  if (
    normalized.includes("pool") ||
    normalized.includes("piscina") ||
    normalized.includes("alberca")
  ) {
    return <Waves size={20} className="text-primary" />;
  }
  if (normalized.includes("gym") || normalized.includes("gimnasio")) {
    return <Dumbbell size={20} className="text-primary" />;
  }

  // Ícono por defecto
  return <CheckCircle2 size={20} className="text-primary" />;
};

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  // Si no hay amenidades, no renderizamos nada
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="mt-10 border-t border-default pt-8">
      <h2 className="mb-6 text-2xl font-bold text-text-primary">
        Servicios de la habitación
      </h2>

      {/* Cuadrícula responsiva: 1 columna en móvil, 2 en mediano, 3 en pantallas grandes */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-background/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              {getAmenityIcon(amenity)}
            </div>
            <span className="text-base font-medium text-text-secondary capitalize">
              {amenity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
