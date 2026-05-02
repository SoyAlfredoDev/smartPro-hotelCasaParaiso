"use client";

import React from "react";
import { motion } from "framer-motion";
import HotelDetailHeroSection from "@/components/hotels/HotelDetailHeroSection";
import LocationMapSection from "@/components/hotels/LocationMapSection";
import TestimonialsSection from "@/components/hotels/TestimonialsSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function HotelDetailPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex min-h-screen flex-col bg-[#f5f5f3] selection:bg-[#2f5d50]/20 selection:text-[#2f5d50]"
    >
      <NavBar />
      
      <div className="flex-1 w-full overflow-hidden">
        {/* Parallax and smooth transitions are handled inside each section */}
        <HotelDetailHeroSection />
        
        {/* Decorative separator to soften transitions */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent opacity-50" />
        
        <LocationMapSection />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent opacity-50" />
        
        <TestimonialsSection />
      </div>

      <Footer />
    </motion.main>
  );
}
