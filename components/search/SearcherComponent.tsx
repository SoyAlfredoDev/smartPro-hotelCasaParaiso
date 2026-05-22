"use client";

import hotels from "@/public/assets/hotels";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ButtonCheck from "@/components/ui/buttonCheck";
import GuestsSearcherBar from "@/components/search/GuestsSearcherBar";
import { ChevronDown } from "lucide-react";
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
  const [isLooking, setIsLooking] = useState(false);
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
  const adultsQuantity = useBookingStore((state) => state.adultsQuantity);
  const childrenQuantity = useBookingStore((state) => state.childrenQuantity);
  const petsQuantity = useBookingStore((state) => state.petsQuantity);
  const roomsQuantity = useBookingStore((state) => state.roomsQuantity);

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

  useEffect(() => {
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
    } else {
    }
  }, [
    hotelId,
    adultsQuantity,
    childrenQuantity,
    petsQuantity,
    roomsQuantity,
    checkIn,
    checkOut,
    nights,
  ]);

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
          updated.numberNights = calculateNights(
            updated.dateCheckIn,
            updated.dateCheckOut,
          );
        } else {
          updated.numberNights = 0;
        }
      }
      return updated;
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLooking(true);

    if (
      reservation.dateCheckOut &&
      reservation.dateCheckIn &&
      reservation.dateCheckOut < reservation.dateCheckIn
    ) {
      setIsLooking(false);
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

    setTimeout(() => {
      setIsLooking(false);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative z-0 w-full"
      id="search"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:rounded-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr_auto] lg:divide-x lg:divide-gray-200">
            {/* HOTEL */}
            <div className="group flex min-h-[72px] flex-col justify-center border-b border-gray-200 px-5 py-4 lg:border-b-0">
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
                Hotel
              </label>
              <select
                name="hotelId"
                value={reservation.hotelId}
                onChange={handleChange}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-gray-900 outline-none"
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
            <div className="relative flex min-h-[72px] flex-col justify-center border-b border-gray-200 lg:border-b-0">
              <button
                type="button"
                className="group h-full w-full px-5 py-4 text-left"
                onClick={() => setShowGuests(!showGuests)}
              >
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
                  Huéspedes y Hab.
                </span>
                <div className="flex w-full items-center justify-between gap-2 text-sm font-semibold text-gray-900">
                  <span>
                    {reservation.adults + reservation.children} pers. ·{" "}
                    {reservation.rooms} hab.
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${
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
            <div className="flex items-stretch p-3 lg:p-4">
              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#3d6355] px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#345e4d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 lg:min-h-full lg:min-w-[140px]"
                disabled={isLooking}
              >
                {isLooking ? "Buscando..." : "Consultar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
