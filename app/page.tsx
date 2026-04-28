import Navbar from "@/components/NavBar";
import HeroSection from "@/section/HeroSection";
import LocationsSection from "@/section/LocationsSection";
import FeaturedStaysSection from "@/section/FeaturedStaysSection";
import ExperiencesSection from "@/section/ExperiencesSection";
import AdditionalServicesSection from "@/section/AdditionalServicesSection";
import BookingFormSection from "@/section/BookingFormSection";
import Footer from "@/components/Footer";
import SirvoyWidget from "@/components/SirvoyWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <LocationsSection />
      <FeaturedStaysSection />
      <ExperiencesSection />
      <AdditionalServicesSection />
      <BookingFormSection />

      <div className="flex justify-center py-8">
        <div className="flex justify-center bg-white p-4 rounded-lg shadow-lg">
          <SirvoyWidget />
        </div>
      </div>
      <Footer />
    </>
  );
}
