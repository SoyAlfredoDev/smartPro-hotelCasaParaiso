import Image from "next/image";
import Navbar from "@/components/NavBar";
import HeroSection from "@/section/HeroSection";
import LocationsSection from "@/section/LocationsSection";
import FeaturedStaysSection from "@/section/FeaturedStaysSection";
import ExperiencesSection from "@/section/ExperiencesSection";
import BookingFormSection from "@/section/BookingFormSection";
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
