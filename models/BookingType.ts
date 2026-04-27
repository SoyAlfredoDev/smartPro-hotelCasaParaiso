export type BookingStatus = "pendiente" | "confirmada" | "finalizada" | "cancelada";

export interface BookingType {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  roomId: string;
  room: {
    id: string;
    name: string;
    category: string;
    images: string[];
  };
}
