"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Utensils,
  BedDouble,
  Coffee,
  ConciergeBell,
  Building2,
  ArrowRight,
} from "lucide-react";
import NavBar from "@/components/NavBar";

interface HotelProps {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  commune?: string;
  codePostal?: string;
}

interface PhotoItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  img: string;
  gridClass: string;
}

const HotelDetailHeroSection = ({
  name = "",
  description = "",
  address = "",
  city = "",
  commune = "",
  codePostal = "",
}: HotelProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const photos: PhotoItem[] = [
    {
      id: 1,
      title: "Suite Principal",
      description:
        "Lujo minimalista con vistas panorámicas y textiles orgánicos.",
      icon: BedDouble,
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
      gridClass: "md:col-span-2 md:row-span-2 h-[350px] md:h-full",
    },
    {
      id: 2,
      title: "Gastronomía de Autor",
      description:
        "Sabores locales reinterpretados por nuestro chef ejecutivo.",
      icon: Utensils,
      img: "https://images.unsplash.com/photo-1550966841-3ee3ad15f33f?q=80&w=2070&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:row-span-1 h-[250px] md:h-full",
    },
    {
      id: 3,
      title: "Cafetería Premium",
      description: "Granos seleccionados y repostería artesanal cada mañana.",
      icon: Coffee,
      img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:row-span-1 h-[250px] md:h-full",
    },
    {
      id: 4,
      title: "Servicio Concierge",
      description: "Atención personalizada las 24 horas para cada necesidad.",
      icon: ConciergeBell,
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:row-span-1 h-[250px] md:h-full",
    },
    {
      id: 5,
      title: "Arquitectura",
      description: "Diseño contemporáneo que rinde homenaje al entorno.",
      icon: Building2,
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:row-span-1 h-[250px] md:h-full",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden px-6 lg:px-16 py-28 md:py-36 bg-transparent"
    >
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, 40, -40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] h-[800px] w-[800px] rounded-full bg-[#2f5d50]/10 blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#c8a97e]/15 blur-[130px]"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* Header Section */}
        <div className="mb-16 md:mb-20 max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8a97e]/10">
              <MapPin className="h-4 w-4 text-[#c8a97e]" />
            </div>
            <span className="font-inter text-xs font-semibold uppercase tracking-widest text-[#6f6f6f]">
              {`${address}, ${city}, ${commune}, ${codePostal}`}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-chillax text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight bg-gradient-to-r  from-[#b5966b] via-[#2f5d50] to-[#2f5d50] bg-clip-text text-transparent"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-inter text-lg md:text-xl text-[#6f6f6f] leading-relaxed max-w-2xl"
          >
            {description}
          </motion.p>
        </div>

        {/* Dynamic Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[700px]">
          {photos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const PhotoCard = ({ photo, index }: { photo: PhotoItem; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease for an elegant reveal
      }}
      className={`${photo.gridClass} group [perspective:1200px] w-full`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 18,
          mass: 1.2,
        }}
        className="relative w-full h-full [transform-style:preserve-3d] cursor-pointer"
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500">
            <img
              src={photo.img}
              alt={photo.title}
              className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.08]"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

            {/* Subtle border overlay for depth */}
            <div className="absolute inset-0 rounded-[24px] border border-white/20 pointer-events-none" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 pointer-events-none transform transition-transform duration-500 group-hover:-translate-y-2">
            <h3 className="font-chillax text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg">
              {photo.title}
            </h3>
            <div className="h-0.5 w-12 bg-[#c8a97e] mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0" />
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] bg-[#2f5d50] rounded-[24px] p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-[0_20px_40px_rgb(0,0,0,0.2)] overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Decorative Grain and Glow on Back */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
          <div className="absolute top-0 right-0 h-48 w-48 bg-white/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-black/30 blur-[40px] rounded-full translate-y-1/3 -translate-x-1/3" />

          {/* Border Overlay */}
          <div className="absolute inset-0 rounded-[24px] border border-[#8fa89e]/20 pointer-events-none" />

          <motion.div
            animate={{ scale: isFlipped ? 1 : 0.8, opacity: isFlipped ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <photo.icon className="h-10 w-10 md:h-12 md:w-12 text-[#c8a97e] mb-4 md:mb-6 relative z-10 transition-transform duration-300 hover:scale-110" />
          </motion.div>

          <h4 className="font-chillax text-white text-xl md:text-2xl font-bold mb-3 md:mb-4 relative z-10">
            {photo.title}
          </h4>

          <p className="font-inter text-[#8fa89e] text-xs md:text-sm leading-relaxed mb-6 md:mb-8 relative z-10 max-w-[95%] md:max-w-[85%] font-light">
            {photo.description}
          </p>

          <div className="relative z-10 flex items-center gap-2 text-[#c8a97e] text-xs font-bold uppercase tracking-widest transition-colors hover:text-white">
            Ver detalle <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HotelDetailHeroSection;
