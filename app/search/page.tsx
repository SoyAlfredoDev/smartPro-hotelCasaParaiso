"use client";

import Navbar from "@/components/NavBar";

import HeroSection from "@/section/HeroSection";
import RoomCard from "@/components/rooms/RoomCard";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import FeaturedStaysSection from "@/section/FeaturedStaysSection";

import { useBookingStore } from "@/store/useBookingStore";
import { getRooms } from "@/lib/rooms/getRooms";

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
  night: number;
}

// 1. Separamos la lógica que usa 'useSearchParams' en su propio componente
function SearchResults() {
  const [isLoading, setIsLoading] = useState(true);
  const [roomsAvailable, setRoomsAvailable] = useState<Room[]>([]);

  const reservetionHotelId = useBookingStore((state) => state.hotelId);
  const reservetionAdults = useBookingStore((state) => state.adultsQuantity);
  const reservetionChildren = useBookingStore(
    (state) => state.childrenQuantity,
  );
  const reservetionPets = useBookingStore((state) => state.petsQuantity);
  const reservetionRooms = useBookingStore((state) => state.roomsQuantity);

  const fetchRooms = async () => {
    try {
      const rooms = await getRooms(reservetionHotelId);
      // Filtro por capacidad
      const totalPeople = reservetionAdults + reservetionChildren;
      const filteredRoomsByCapacity = rooms.filter((room: Room) => {
        return room.capacity >= totalPeople;
      });

      console.log("filteredRoomsByCapacity", filteredRoomsByCapacity);

      setRoomsAvailable(filteredRoomsByCapacity);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
  }, [
    reservetionHotelId,
    reservetionAdults,
    reservetionChildren,
    reservetionPets,
    reservetionRooms,
  ]); // Dependencia clave para que reaccione a los cambios de URL

  return (
    <div className="z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-[60px] ">
      <div className=" w-full bg-white mt-10 rounded-2xl p-6 shadow-md ">
        {isLoading ? (
          <div className="flex h-full min-h-[400px] items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-primary"></div>
          </div>
        ) : roomsAvailable.length === 0 && !isLoading ? (
          <div className="flex flex-col h-full min-h-[400px] items-center justify-center">
            <h2 className="text-xl font-bold text-primary md:text-2xl text-center">
              lo sentimos no encontramos habitaciones disponibles.
            </h2>
            <Link
              href="/#"
              className="mt-4 inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Ver todas las habitaciones disponibles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="w-full">
            <h2 className="mb-8 text-2xl font-bold text-primary">
              Habitaciones disponibles
            </h2>
            {/* Uso de Grid para ordenar las tarjetas perfectamente */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
      <div className="mb-[60px]">
        <SearchResults />
      </div>
      <FeaturedStaysSection />
      <Footer />
    </div>
  );
}
