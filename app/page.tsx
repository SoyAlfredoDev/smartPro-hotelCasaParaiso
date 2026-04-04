import Image from "next/image";
import Navbar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturedStaysSection from "@/components/FeaturedStaysSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedStaysSection />
    </>
  );
}
