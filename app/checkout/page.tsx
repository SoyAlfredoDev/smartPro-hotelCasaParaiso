import DetailCheckoutView from "@/components/checkout/DetailCheckoutView";
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
