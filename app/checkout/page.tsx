import { Metadata } from "next";
import DetailCheckoutView from "@/components/checkout/DetailCheckoutView";

export const metadata: Metadata = {
  title: "Checkout de Reserva",
  robots: {
    index: false,
    follow: false,
  },
};
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function CheckoutPage() {
  return (
    <>
      <NavBar />
      <DetailCheckoutView />
      <Footer />
    </>
  );
}
