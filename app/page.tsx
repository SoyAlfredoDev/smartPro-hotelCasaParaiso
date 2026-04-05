import Image from "next/image";
import Navbar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import LocationsSection from "@/components/LocationsSection";
import FeaturedStaysSection from "@/components/FeaturedStaysSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import BookingFormSection from "@/components/BookingFormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LocationsSection />
      <FeaturedStaysSection />
      <ExperiencesSection />
      <BookingFormSection />
      <Footer />
    </>
  );
}
