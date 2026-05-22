"use client";

import hotels from "@/public/assets/hotels";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import ButtonCheck from "@/components/ui/buttonCheck";
import GuestsSearcherBar from "@/components/search/GuestsSearcherBar";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { calculateNights } from "@/utils/calculateNights";
import { calculateDate } from "@/utils/calculateDate";
import {
  getMinCheckOutDate,
  getMinCheckInDate,
  isISODateBefore,
  isISODateOnOrBefore,
} from "@/utils/dateHelpers";
import {
  MAX_GUESTS,
  MAX_ROOMS,
  MIN_ADULTS,
  MIN_ROOMS,
  getTotalGuests,
  validateSearchReservation,
} from "@/lib/validation/searchReservation";

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

const clampGuestField = (
  name: string,
  value: number,
  adults: number,
  children: number,
): number => {
  if (name === "adults") {
    const maxAdults = Math.max(MIN_ADULTS, MAX_GUESTS - children);
    return Math.min(Math.max(value, MIN_ADULTS), maxAdults);
  }
  if (name === "children") {
    const maxChildren = Math.max(0, MAX_GUESTS - adults);
    return Math.min(Math.max(value, 0), maxChildren);
  }
  if (name === "pets") return Math.max(0, value);
  if (name === "rooms") {
    return Math.min(Math.max(value, MIN_ROOMS), MAX_ROOMS);
  }
  return value;
};

export default function SearcherComponent() {
  const [showGuests, setShowGuests] = useState(false);
  const [isLooking, setIsLooking] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const guestsPanelRef = useRef<HTMLDivElement>(null);
  const guestsTriggerRef = useRef<HTMLButtonElement>(null);
  const initializedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const syncNights = (
    checkInDate: string | null,
    checkOutDate: string | null,
  ) => {
    if (checkInDate && checkOutDate) {
      return calculateNights(checkInDate, checkOutDate);
    }
    return 0;
  };

  useEffect(() => {
    const { today, tomorrow } = calculateDate();

    if (!initializedRef.current) {
      initializedRef.current = true;
      const checkInDate = checkIn ?? today;
      const checkOutDate = checkOut ?? tomorrow;
      setReservation({
        hotelId: hotelId ?? "all",
        adults: adultsQuantity ?? 2,
        children: childrenQuantity ?? 0,
        pets: petsQuantity ?? 0,
        rooms: roomsQuantity ?? 1,
        dateCheckIn: checkInDate,
        dateCheckOut: checkOutDate,
        numberNights: nights ?? syncNights(checkInDate, checkOutDate),
        totalPrice: 0,
      });
      return;
    }

    const hasStoreData =
      hotelId != null ||
      checkIn != null ||
      checkOut != null ||
      nights != null ||
      adultsQuantity != null;

    if (!hasStoreData) return;

    setReservation((prev) => {
      if (!prev) return prev;
      const nextCheckIn = checkIn ?? prev.dateCheckIn;
      const nextCheckOut = checkOut ?? prev.dateCheckOut;
      return {
        ...prev,
        hotelId: hotelId ?? prev.hotelId,
        adults: adultsQuantity ?? prev.adults,
        children: childrenQuantity ?? prev.children,
        pets: petsQuantity ?? prev.pets,
        rooms: roomsQuantity ?? prev.rooms,
        dateCheckIn: nextCheckIn,
        dateCheckOut: nextCheckOut,
        numberNights: nights ?? syncNights(nextCheckIn, nextCheckOut),
      };
    });
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

  useEffect(() => {
    setIsLooking(false);
  }, [pathname]);

  const closeGuests = useCallback(() => setShowGuests(false), []);

  useEffect(() => {
    if (!showGuests) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        guestsPanelRef.current?.contains(target) ||
        guestsTriggerRef.current?.contains(target)
      ) {
        return;
      }
      closeGuests();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGuests();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showGuests, closeGuests]);

  const minCheckIn = getMinCheckInDate();
  const minCheckOut = reservation?.dateCheckIn
    ? getMinCheckOutDate(reservation.dateCheckIn)
    : minCheckIn;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = e.target;
    setFormError(null);

    if (!reservation) return;

    if (name === "dateCheckIn" || name === "dateCheckOut") {
      if (isISODateBefore(value, minCheckIn)) return;

      if (
        name === "dateCheckOut" &&
        reservation.dateCheckIn &&
        isISODateOnOrBefore(value, reservation.dateCheckIn)
      ) {
        setFormError("La fecha de salida debe ser posterior a la de entrada.");
        return;
      }

      setReservation((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, [name]: value };

        if (name === "dateCheckIn" && updated.dateCheckIn) {
          if (
            !updated.dateCheckOut ||
            isISODateOnOrBefore(updated.dateCheckOut, updated.dateCheckIn)
          ) {
            updated.dateCheckOut = getMinCheckOutDate(updated.dateCheckIn);
          }
        }

        updated.numberNights = syncNights(
          updated.dateCheckIn,
          updated.dateCheckOut,
        );
        return updated;
      });
      return;
    }

    const rawNumber = type === "number" ? getNumber(value) : value;
    const finalValue =
      type === "number"
        ? clampGuestField(
            name,
            rawNumber as number,
            reservation.adults,
            reservation.children,
          )
        : rawNumber;

    setReservation((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: finalValue };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!reservation || isLooking) return;

    const validationError = validateSearchReservation(reservation, minCheckIn);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);
    setIsLooking(true);
    closeGuests();

    setReservetionHotelId(reservation.hotelId);
    setReservationNights(reservation.numberNights);
    setReservationCheckIn(reservation.dateCheckIn);
    setReservationCheckOut(reservation.dateCheckOut);
    setReservetionAdults(reservation.adults);
    setReservetionChildren(reservation.children);
    setReservetionPets(reservation.pets);
    setReservationRooms(reservation.rooms);
    setReservetionPeopleQuantity(
      getTotalGuests(reservation.adults, reservation.children),
    );

    setTimeout(() => {
      setIsLooking(false);
      router.push("/search");
    }, 2000);
  };

  if (!reservation) {
    return (
      <div
        className="flex min-h-[88px] w-full items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:rounded-3xl"
        aria-busy="true"
        aria-label="Cargando buscador"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#3d6355]" />
      </div>
    );
  }

  const totalGuests = getTotalGuests(reservation.adults, reservation.children);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative z-30 w-full"
      id="search"
    >
      <div className="rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:rounded-3xl">
        <form onSubmit={handleSubmit} noValidate>
          {formError && (
            <div
              role="alert"
              className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700"
            >
              {formError}
            </div>
          )}

          <div className="grid w-full grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr_auto] lg:divide-x lg:divide-gray-200">
            {/* HOTEL */}
            <div className="group flex min-h-[72px] flex-col justify-center border-b border-gray-200 px-5 py-4 lg:border-b-0">
              <label
                htmlFor="search-hotelId"
                className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400"
              >
                Hotel
              </label>
              <select
                id="search-hotelId"
                name="hotelId"
                value={reservation.hotelId}
                onChange={handleChange}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-[#3d6355]/40 rounded-sm"
              >
                <option value="all">Todos</option>
                {hotels?.map((hotel: { id: string | number; name: string }) => (
                  <option key={hotel.id} value={String(hotel.id)}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            <ButtonCheck
              label="Check In"
              placeholder="fecha de entrada"
              name="dateCheckIn"
              value={reservation.dateCheckIn}
              onChange={handleChange}
              min={minCheckIn}
            />

            <ButtonCheck
              label="Check Out"
              placeholder="fecha de salida"
              name="dateCheckOut"
              value={reservation.dateCheckOut}
              onChange={handleChange}
              min={minCheckOut}
            />

            {/* GUESTS */}
            <div className="relative z-40 flex min-h-[72px] flex-col justify-center border-b border-gray-200 lg:border-b-0">
              <button
                ref={guestsTriggerRef}
                type="button"
                className="group h-full w-full px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3d6355]/40"
                onClick={() => setShowGuests((open) => !open)}
                aria-expanded={showGuests}
                aria-haspopup="dialog"
                aria-controls="guests-search-panel"
              >
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
                  Huéspedes y Hab.
                </span>
                <div className="flex w-full items-center justify-between gap-2 text-sm font-semibold text-gray-900">
                  <span>
                    {totalGuests} pers. · {reservation.rooms} hab.
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                      showGuests ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </div>
              </button>

              <AnimatePresence>
                {showGuests && (
                  <motion.div
                    ref={guestsPanelRef}
                    id="guests-search-panel"
                    role="dialog"
                    aria-modal="false"
                    aria-label="Configurar huéspedes y habitaciones"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full z-[60] mt-3 w-full min-w-[280px] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl md:w-80"
                  >
                    <GuestsSearcherBar
                      adults={reservation.adults}
                      children={reservation.children}
                      pets={reservation.pets}
                      rooms={reservation.rooms}
                      onChange={handleChange}
                      onClose={closeGuests}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOTÓN */}
            <div className="flex items-stretch p-3 lg:p-4">
              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#3d6355] px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#345e4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d6355] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 lg:min-h-full lg:min-w-[140px]"
                disabled={isLooking}
                aria-busy={isLooking}
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
