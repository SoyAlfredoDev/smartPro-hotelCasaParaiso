export interface BookingConfirmationEmailProps {
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomName: string;
  roomCategory?: string;
  guests: number;
  bookingId?: string;
}

export interface BookingAdminNotificationEmailProps {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  roomName: string;
  roomCategory: string;
  roomId: string;
  status?: string;
  notes?: string | null;
  adminPanelUrl?: string;
}

export interface SpecialRequestConfirmationEmailProps {
  requestNumber: string;
  applicantName: string;
  eventDate: string;
  eventType: string;
  details: string;
}

export interface SpecialRequestAdminNotificationEmailProps
  extends SpecialRequestConfirmationEmailProps {
  applicantEmail: string;
  applicantPhone: string;
  status?: string;
  adminPanelUrl?: string;
}
