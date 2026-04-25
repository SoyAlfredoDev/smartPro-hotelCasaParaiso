import { Star, MapPin, Heart, Share2 } from "lucide-react";

interface HeaderProps {
  title: string;
  hotelId: string;
  stars: number;
}

export default function RoomHeader({ title, hotelId, stars }: HeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {/* Estrellas */}
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>

        {/* Título */}
        <h1 className="mt-2 text-3xl font-bold text-text-primary md:text-4xl">
          {title}
        </h1>

        {/* Ubicación */}
        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-text-secondary">
          <MapPin size={16} className="text-primary" />
          <span>
            {hotelId == "hotel-san-miguel"
              ? "Hotel Casa Paraiso San Miguel, Av Salesianos 1130 San Miguel"
              : "Hotel Casa Paraiso Republica, Republica 19 Santiago"}
          </span>
          <button className="text-primary hover:underline">
            {}- Excelente ubicación
          </button>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary text-primary transition-colors hover:bg-primary/10">
          <Heart size={20} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary text-primary transition-colors hover:bg-primary/10">
          <Share2 size={20} />
        </button>
        <button className="h-10 rounded-lg bg-primary px-6 font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-95">
          Reservar
        </button>
      </div>
    </div>
  );
}
