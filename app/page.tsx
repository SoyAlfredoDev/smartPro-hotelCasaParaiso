import Navbar from "@/components/NavBar";
import HeroSection from "@/section/HeroSection";
import LocationsSection from "@/section/LocationsSection";
import FeaturedStaysSection from "@/section/FeaturedStaysSection";
import ExperiencesSection from "@/section/ExperiencesSection";
import AdditionalServicesSection from "@/section/AdditionalServicesSection";
import BookingFormSection from "@/section/BookingFormSection";
import Footer from "@/components/Footer";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Casa Paraíso Hotel",
  image: "https://casaparaisohotel.cl/images/logo-hotel-casa-paraiso.png",
  description:
    "Hotel boutique con enfoque en comodidad, ubicación y experiencia. Tu hogar lejos de casa en Santiago.",
  url: "https://casaparaisohotel.cl",
  telephone: "+56935841793",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida República #19",
    addressLocality: "Santiago",
    addressRegion: "RM",
    postalCode: "8320000",
    addressCountry: "CL",
  },
  priceRange: "$$",
};

export default function Home() {
  return (
    <>
      <Script
        id="hotel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <HeroSection />

      <LocationsSection />
      <FeaturedStaysSection />
      <ExperiencesSection />
      <AdditionalServicesSection />
      <BookingFormSection />

      <Footer />
    </>
  );
}
