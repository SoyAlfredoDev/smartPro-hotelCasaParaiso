import { Metadata } from "next";
import DetailCheckoutView from "@/components/checkout/DetailCheckoutView";
import { isKlapPaymentsEnabled } from "@/lib/klap/isKlapPaymentsEnabled";

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
  const paymentsEnabled = isKlapPaymentsEnabled();

  return (
    <>
      <NavBar />
      <DetailCheckoutView paymentsEnabled={paymentsEnabled} />
      <Footer />
    </>
  );
}
