// /store/useBookingStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
  persist(
    (set) => ({
      hotelId: null,
      checkIn: null,
      checkOut: null,

      adultsQuantity: null,
      childrenQuantity: null,
      petsQuantity: null,
      roomsQuantity: null,
      peopleQuantity: null,

      nights: null,

      roomsSelected: null,
      totalPrice: 100000,

      setReservetionHotelId: (hotelId) => set({ hotelId }),
      setReservationCheckIn: (checkIn) => set({ checkIn }),
      setReservationCheckOut: (checkOut) => set({ checkOut }),

      setReservetionAdults: (adultsQuantity) => set({ adultsQuantity }),
      setReservetionChildren: (childrenQuantity) => set({ childrenQuantity }),
      setReservetionPets: (petsQuantity) => set({ petsQuantity }),
      setReservetionPeopleQuantity: (peopleQuantity) => set({ peopleQuantity }),

      //how many rooms the user need
      setReservationRooms: (roomsQuantity) => set({ roomsQuantity }),

      setReservationNights: (nights) => set({ nights }),
      //rooms selected by the user
      setReservationRoomSelected: (roomsSelected) => set({ roomsSelected }),
      setReservationTotalPrice: (totalPrice) => set({ totalPrice }),

      clearReservation: () =>
        set({
          hotelId: null,
          checkIn: null,
          checkOut: null,

          adultsQuantity: null,
          childrenQuantity: null,
          petsQuantity: null,
          roomsQuantity: null,

          nights: null,

          roomsSelected: null,
          totalPrice: null,
        }),
    }),
    {
      name: "booking-storage",
    },
  ),
);
