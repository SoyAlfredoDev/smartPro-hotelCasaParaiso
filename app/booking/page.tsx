import type { Metadata } from "next";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingValidationView from "@/src/components/booking/BookingValidationView";

export const metadata: Metadata = {
  title: "Consultar reserva",
  description:
    "Consulta el estado de tu reserva en Casa Paraíso Hotel con tu apellido y número de reserva.",
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <BookingValidationView />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
