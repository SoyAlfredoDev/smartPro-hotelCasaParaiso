"use client";

import { restaurants } from "@/public/assets/restaurants";
import RestaurantsCard from "@/components/bars/RestaurantCard";
import { motion, Variants } from "framer-motion";
import HeaderSection from "@/components/HeaderSections";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function RestaurantsSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#c8a97e] blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -right-[5%] bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#2f5d50] blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderSection
          badge="Gastronomía de Autor"
          title1="Nuestros Bares y"
          title2="Restaurantes"
          description="Disfruta de una experiencia culinaria excepcional en nuestros espacios gastronómicos, donde cada sabor cuenta una historia."
          isBgDark={false}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {restaurants.map((restaurant, index) => (
            <RestaurantsCard key={restaurant.id || index} restaurant={restaurant} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
