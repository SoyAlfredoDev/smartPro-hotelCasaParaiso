"use client";

import hotels from "@/public/assets/hotels";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ButtonCheck from "@/components/ui/buttonCheck";
import GuestsSearcherBar from "@/components/GuestsSearcherBar";
import { Users, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Reservation {
  hotel: string;
  adults: number;
  children: number;
  pets: number;
  rooms: number;
  dateCheckIn: string | null;
  dateCheckOut: string | null;
}

const getNumber = (value: string | null) => {
  if (!value) return 0;
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
};

export default function SearcherComponent() {
  const [showGuests, setShowGuests] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];
  const router = useRouter();
  const searchParams = useSearchParams();
  let hotelParam = "all";
  let adultsParam = 2;
  let childrenParam = 0;
  let roomsParam = 1;
  let dateCheckInParam = today;
  let dateCheckOutParam = tomorrow;
  if (searchParams) {
    hotelParam = searchParams.get("hotel") ?? "";
    adultsParam = getNumber(searchParams.get("adults"));
    childrenParam = getNumber(searchParams.get("children"));
    roomsParam = getNumber(searchParams.get("rooms"));
    dateCheckInParam = searchParams.get("dateCheckIn") ?? today;
    dateCheckOutParam = searchParams.get("dateCheckOut") ?? tomorrow;
  }

  const [reservation, setReservation] = useState<Reservation>({
    hotel: hotelParam,
    adults: adultsParam,
    children: childrenParam,
    pets: 0,
    rooms: roomsParam,
    dateCheckIn: dateCheckInParam,
    dateCheckOut: dateCheckOutParam,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    const finalValue = type === "number" ? Number(value) : value;

    if (name === "dateCheckIn" && value < today) {
      return;
    }
    if (name === "dateCheckOut" && value < today) {
      return;
    }

    if (
      name === "dateCheckOut" &&
      reservation.dateCheckIn &&
      value < reservation.dateCheckIn
    ) {
      alert("La fecha de salida debe ser mayor a la fecha de entrada");
      return;
    }

    setReservation((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      reservation.dateCheckOut &&
      reservation.dateCheckIn &&
      reservation.dateCheckOut < reservation.dateCheckIn
    ) {
      alert("La fecha de salida debe ser mayor a la fecha de entrada");
      return;
    }
    const params = new URLSearchParams(reservation as any);
    router.push(`/search?${params.toString()}#search`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative p-4 w-full "
      id="search"
    >
      <div className="z-10 rounded-2xl border border-default shadow-md bg-surface p-4 backdrop-blur-xl md:rounded-3xl md:p-6 lg:p-8 ">
        <form
          onSubmit={handleSubmit}
          // Ajusté el grid para que soporte los 5 elementos (Destino, In, Out, Huéspedes, Botón)
        >
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr_auto] lg:gap-6 items-end ">
            {/* Destino */}
            <div className="group h-full flex flex-col justify-center rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Hotel
              </label>
              <select
                name="hotel"
                value={reservation.hotel}
                onChange={handleChange}
                className="w-full appearance-none cursor-pointer bg-transparent text-sm font-medium text-text-primary outline-none transition-colors group-hover:text-primary"
              >
                <option value="all">Todos</option>
                {hotels?.map((hotel: any) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name + " - " + hotel.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Check In/Out */}
            <ButtonCheck
              label="Check In"
              placeholder="fecha de entrada"
              name="dateCheckIn"
              value={reservation.dateCheckIn}
              onChange={handleChange}
            />

            <ButtonCheck
              label="Check Out"
              placeholder="fecha de salida"
              name="dateCheckOut"
              value={reservation.dateCheckOut}
              onChange={handleChange}
            />

            {/* Wrapper Relativo para Huéspedes + Dropdown */}
            <div className="relative h-full flex flex-col justify-center">
              {/* Botón que abre el modal, ahora muestra el resumen */}
              <button
                type="button"
                className="group h-full w-full text-left rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                onClick={() => setShowGuests(!showGuests)}
              >
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Huéspedes y Habs.
                </span>
                <div className="flex w-full items-center justify-between text-sm font-medium text-text-primary">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-primary" />
                    <span className="line-clamp-1">
                      {reservation.adults + reservation.children} pax,{" "}
                      {reservation.rooms} hab
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-primary transition-transform duration-300 ${
                      showGuests ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Overlay invisible para cerrar al hacer clic afuera */}
              {showGuests && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowGuests(false)}
                />
              )}

              {/* Popover / Modal Flotante con Framer Motion */}
              <AnimatePresence>
                {showGuests && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-red-500 left-0 top-full mt-3 w-full min-w-[280px] z-50 rounded-2xl border-2 border-gray-400 bg-surface p-4 shadow-2xl md:w-80 shadow-[0_0_10px_0_rgba(0,0,0,0.5)] "
                  >
                    <GuestsSearcherBar
                      adults={reservation.adults}
                      children={reservation.children}
                      pets={reservation.pets}
                      rooms={reservation.rooms}
                      onChange={handleChange}
                      onClose={() => setShowGuests(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botón Consultar */}
            <div className="w-full">
              <button
                type="submit"
                className="inline-flex h-full min-h-[56px] w-full items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95 bg-yellow-500 md:hidden lg:block"
              >
                Consultar
              </button>
            </div>
          </div>
          <div className="relative hidden w-full flex-col items-end justify-end md:flex lg:hidden">
            <button
              type="button"
              className="inline-flex min-h-[56px] w-[300px] items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
            >
              Consultar
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
