"use client";

import Navbar from "@/components/NavBar";

import HeroSection from "@/section/HeroSection";
import RoomCard from "@/components/rooms/RoomCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Footer from "@/components/Footer";
import FeaturedStaysSection from "@/section/FeaturedStaysSection";
 
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

const getNumber = (value: string | null) => {
  if (!value) return 0;
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
};

// 1. Separamos la lógica que usa 'useSearchParams' en su propio componente
function SearchResults() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [roomsAvailable, setRoomsAvailable] = useState<Room[]>([]);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");
      const rooms = await res.json();

      const hotelParam = searchParams.get("hotel") ?? "";
      const adultsParam = getNumber(searchParams.get("adults"));
      const childrenParam = getNumber(searchParams.get("children"));

      // Filtro por hotel (manejando el caso en que el parámetro esté vacío o sea 'all')
      let filteredRooms = rooms;
      if (hotelParam !== "all" && hotelParam !== "") {
        filteredRooms = rooms.filter((room: Room) => room.hotelId === hotelParam);
      }

      // Filtro por capacidad
      const totalPeople = adultsParam + childrenParam;
      filteredRooms = filteredRooms.filter(
        (room: Room) => room.capacity >= totalPeople,
      );

      setRoomsAvailable(filteredRooms);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setIsLoading(false);
      return;
    }
  };
  useEffect(() => {
    // Activamos el loading cada vez que cambian los parámetros
    setIsLoading(true);
    fetchRooms();
  }, [searchParams]); // Dependencia clave para que reaccione a los cambios de URL

  return (
    <div className="z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white mt-10 rounded-2xl p-6">
        {isLoading ? (
          <div className="flex h-full min-h-[400px] items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-primary"></div>
          </div>
        ) : roomsAvailable.length === 0 ? (
          <div className="flex h-full min-h-[400px] items-center justify-center">
            <h2 className="text-xl font-bold text-primary md:text-2xl text-center">
              No se encontraron habitaciones disponibles para tu búsqueda.
            </h2>
          </div>
        ) : (
          <div className="w-full">
            <h2 className="mb-8 text-2xl font-bold text-primary">
              Habitaciones disponibles ({roomsAvailable.length})
            </h2>
            {/* Uso de Grid para ordenar las tarjetas perfectamente */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {roomsAvailable.map((room: Room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Componente Principal exportado
export default function SearchPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="mt-[230px] sm:mt-[380px] md:mt-[180px] lg:mt-[80px]">
        {/* 3. Suspense Boundary: Obligatorio en Next.js para rutas que leen parámetros de cliente */}
        <Suspense
          fallback={
            <div className="flex min-h-[50vh]  items-center justify-center">
              <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-primary"></div>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
      <FeaturedStaysSection />
      <Footer />
    </div>
  );
}
