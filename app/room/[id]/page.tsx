"use client";

import { motion } from "framer-motion";
import RoomHeader from "@/components/rooms/RoomHeader";
import ImageGallery from "@/components/rooms/ImageGallery";
import RoomSidebar from "@/components/rooms/RoomSidebar";
import RoomAmenities from "@/components/rooms/RoomAmenities";
import Navbar from "@/components/NavBar";
import { useParams } from "next/navigation";
import rooms from "@/public/assets/rooms";
import Footer from "@/components/Footer";

// Asegúrate de que las propiedades coincidan exactamente con tu archivo rooms.ts
interface Room {
  id: string;
  name: string;
  hotelId: string;
  stars: number;
  images: string[];
  description: string;
  score: number;
  reviewsCount: number;
  reviewHighlight: string;
  amenities: string[];
}

export default function RoomDetailsPage() {
  const { id } = useParams();

  // 1. Buscamos la habitación directamente de forma síncrona.
  // No necesitamos useState ni useEffect para datos locales estáticos.
  const roomData = rooms.find((room) => room.id === id) as Room | undefined;

  // 2. Manejo de errores: ¿Qué pasa si el ID no existe en tu archivo rooms?
  if (!roomData) {
    return (
      <div className="min-h-screen bg-background bg-red-500">
        <Navbar />
        <div className="flex  items-center justify-center">
          <h2 className="text-2xl font-bold text-primary">
            Habitación no encontrada
          </h2>
        </div>
      </div>
    );
  }

  // 3. Si existe, renderizamos la página (ahora es 100% seguro leer roomData.title)
  return (
    <div className="min-h-scree">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-25 max-w-7xl px-4  sm:px-6 lg:px-8 mb-10"
      >
        {/* Cabecera */}
        <RoomHeader
          title={roomData.name}
          hotelId={roomData.hotelId}
          stars={roomData.stars}
        />

        {/* Galería de Fotos */}
        <ImageGallery images={roomData.images} />

        {/* Contenedor Principal Dividido (70/30 en Desktop) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Lado Izquierdo: Descripción y Detalles */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-default bg-surface p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                Acerca de este alojamiento
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-text-secondary">
                {roomData.description}
              </p>
            </div>
            <RoomAmenities amenities={roomData.amenities} />
          </div>

          {/* Lado Derecho: Sidebar */}
          <div className="lg:col-span-1">
            <RoomSidebar
              score={roomData.score}
              reviewsCount={roomData.reviewsCount}
              reviewHighlight={roomData.reviewHighlight}
            />
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
