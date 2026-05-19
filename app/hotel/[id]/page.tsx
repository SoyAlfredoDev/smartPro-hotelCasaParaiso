"use client";

import React from "react";
import { motion } from "framer-motion";
import HotelDetailHeroSection from "@/components/hotels/HotelDetailHeroSection";
import LocationMapSection from "@/components/hotels/LocationMapSection";
import TestimonialsSection from "@/components/hotels/TestimonialsSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import hotels from "@/public/assets/hotels";
import { useParams } from "next/navigation";
import ExperiencesSection from "@/section/ExperiencesSection";
import VideoShowcaseSection from "@/section/VideoShowcaseSection";

export default function HotelDetailPage() {
  const params = useParams();
  const hotel = hotels.find((h) => h.id === params.id);
  console.log("params", params.id, hotel);

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex min-h-screen flex-col bg-[#f5f5f3] selection:bg-[#2f5d50]/20 selection:text-[#2f5d50]"
      >
        <NavBar />

        <div className="flex-1 w-full overflow-hidden">
          {/* Parallax and smooth transitions are handled inside each section */}
          <HotelDetailHeroSection
            name={hotel?.name}
            description={hotel?.description}
            address={hotel?.address}
            city={hotel?.city}
            commune={hotel?.commune}
            codePostal={hotel?.codePostal}
          />

          {/* Decorative separator to soften transitions */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent opacity-50" />
        </div>
        <VideoShowcaseSection />
        <LocationMapSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent opacity-50" />

        <ExperiencesSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent opacity-50" />

        <TestimonialsSection />
        <Footer />
      </motion.main>
    </>
  );
}
