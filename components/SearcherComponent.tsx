"use client";

import hotels from "@/public/assets/hotels";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ButtonCheck from "@/components/ui/buttonCheck";
import GuestsSearcherBar from "@/components/GuestsSearcherBar";
import { Users, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { calculateNights } from "@/utils/calculateNights";
import { calculateDate } from "@/utils/calculateDate";

interface Reservation {
  hotelId: string;
  adults: number;
  children: number;
  pets: number;
  rooms: number;
  dateCheckIn: string | null;
  dateCheckOut: string | null;
  numberNights: number | null;
  totalPrice: number | null;
}

const getNumber = (value: string | null) => {
  if (!value) return 0;
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
};

export default function SearcherComponent() {
  const [showGuests, setShowGuests] = useState(false);
  const router = useRouter();

  // funciones store
  const setReservetionHotelId = useBookingStore(
    (state) => state.setReservetionHotelId,
  );
  const setReservationCheckIn = useBookingStore(
    (state) => state.setReservationCheckIn,
  );
  const setReservationCheckOut = useBookingStore(
    (state) => state.setReservationCheckOut,
  );
  const setReservetionAdults = useBookingStore(
    (state) => state.setReservetionAdults,
  );
  const setReservetionChildren = useBookingStore(
    (state) => state.setReservetionChildren,
  );
  const setReservetionPets = useBookingStore(
    (state) => state.setReservetionPets,
  );
  const setReservationNights = useBookingStore(
    (state) => state.setReservationNights,
  );
  const setReservetionPeopleQuantity = useBookingStore(
    (state) => state.setReservetionPeopleQuantity,
  );
  const setReservationRooms = useBookingStore(
    (state) => state.setReservationRooms,
  );

  const nights = useBookingStore((state) => state.nights);
  const hotelId = useBookingStore((state) => state.hotelId);
  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);
  const adultsQuantity = useBookingStore((state) => state.adults);
  const childrenQuantity = useBookingStore((state) => state.children);
  const petsQuantity = useBookingStore((state) => state.pets);
  const roomsQuantity = useBookingStore((state) => state.roomsQuantity);
  const roomsSelected = useBookingStore((state) => state.roomsSelected);
  const totalPrice = useBookingStore((state) => state.totalPrice);

  // fechas
  const dateRange = calculateDate();
  const today = dateRange.today;
  const tomorrow = dateRange.tomorrow;
  const [reservation, setReservation] = useState<Reservation>({
    hotelId: "all",
    adults: 2,
    children: 0,
    pets: 0,
    rooms: 1,
    dateCheckIn: today,
    dateCheckOut: tomorrow,
    numberNights: calculateNights(today, tomorrow),
    totalPrice: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (nights > 0 || hotelId) {
      setReservation((prev) => ({
        ...prev,
        hotelId: hotelId || prev.hotelId,
        adults: adultsQuantity || prev.adults,
        children: childrenQuantity || prev.children,
        pets: petsQuantity || prev.pets,
        rooms: roomsQuantity || prev.rooms,
        dateCheckIn: checkIn || prev.dateCheckIn,
        dateCheckOut: checkOut || prev.dateCheckOut,
        numberNights: nights || prev.numberNights,
      }));
    }
  }, [hotelId, adultsQuantity, childrenQuantity, petsQuantity, roomsQuantity, checkIn, checkOut, nights]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = e.target;

    const finalValue = type === "number" ? getNumber(value) : value;

    if (name === "dateCheckIn" && value < today) return;
    if (name === "dateCheckOut" && value < today) return;

    if (
      name === "dateCheckOut" &&
      reservation.dateCheckIn &&
      value < reservation.dateCheckIn
    ) {
      alert("La fecha de salida debe ser mayor a la fecha de entrada");
      return;
    }

    setReservation((prev) => {
      const updated = { ...prev, [name]: finalValue };
      if (name === "dateCheckIn" || name === "dateCheckOut") {
        if (updated.dateCheckIn && updated.dateCheckOut) {
          updated.numberNights = calculateNights(updated.dateCheckIn, updated.dateCheckOut);
        } else {
          updated.numberNights = 0;
        }
      }
      return updated;
    });
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

    setReservetionHotelId(reservation.hotelId);
    setReservationNights(reservation.numberNights);
    setReservationCheckIn(reservation.dateCheckIn);
    setReservationCheckOut(reservation.dateCheckOut);
    setReservetionAdults(reservation.adults);
    setReservetionChildren(reservation.children);
    setReservetionPets(reservation.pets);
    setReservationRooms(reservation.rooms);
    setReservetionPeopleQuantity(reservation.adults + reservation.children);

    router.push(`/search`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative p-4 w-full"
      id="search"
    >
      <div className="z-10 rounded-2xl border border-default shadow-md bg-surface p-4 backdrop-blur-xl md:rounded-3xl md:p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr_auto] lg:gap-6 items-end">
            {/* HOTEL */}
            <div className="group h-full flex flex-col justify-center rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Hotel
              </label>
              <select
                name="hotelId"
                value={reservation.hotelId}
                onChange={handleChange}
                className="w-full appearance-none cursor-pointer bg-transparent text-sm font-medium text-text-primary outline-none transition-colors group-hover:text-primary"
              >
                <option value="all">Todos</option>
                {hotels?.map((hotel: any) => (
                  <option key={hotel.id} value={String(hotel.id)}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CHECK IN */}
            <ButtonCheck
              label="Check In"
              placeholder="fecha de entrada"
              name="dateCheckIn"
              value={reservation.dateCheckIn}
              onChange={handleChange}
            />

            {/* CHECK OUT */}
            <ButtonCheck
              label="Check Out"
              placeholder="fecha de salida"
              name="dateCheckOut"
              value={reservation.dateCheckOut}
              onChange={handleChange}
            />

            {/* GUESTS */}
            <div className="relative h-full flex flex-col justify-center">
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
                    <span>
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

              {showGuests && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowGuests(false)}
                />
              )}

              <AnimatePresence>
                {showGuests && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-3 w-full min-w-[280px] z-50 rounded-2xl border-2 border-gray-400 bg-surface p-4 shadow-2xl md:w-80"
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

            {/* BOTÓN */}
            <div className="w-full">
              <button
                type="submit"
                className="inline-flex h-full min-h-[56px] w-full items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95 md:hidden lg:block"
              >
                Consultar
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
