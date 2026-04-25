import { MapPin } from "lucide-react";

interface SidebarProps {
  score: number;
  reviewsCount: number;
  reviewHighlight: string;
}

export default function RoomSidebar({
  score,
  reviewsCount,
  reviewHighlight,
}: SidebarProps) {
  return (
    <div className="sticky top-24 flex flex-col gap-6">
      {/* Tarjeta de Puntuación */}
      <div className="rounded-2xl border border-default bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-text-primary">Fantástico</h3>
            <p className="text-sm text-text-secondary">
              {reviewsCount} comentarios
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg font-bold text-white">
            {score}
          </div>
        </div>

        <div className="mt-4 border-t border-default pt-4">
          <p className="text-sm italic text-text-secondary">
            "{reviewHighlight}"
          </p>
        </div>
      </div>

      {/* Tarjeta de Mapa Simulada */}
      <div className="relative h-40 overflow-hidden rounded-2xl bg-gray-200">
        <img
          src="https://via.placeholder.com/400x200?text=Mapa"
          alt="Mapa"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105">
            <MapPin size={16} />
            Ver en el mapa
          </button>
        </div>
      </div>
    </div>
  );
}
