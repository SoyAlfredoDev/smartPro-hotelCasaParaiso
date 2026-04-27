"use client";

import { useState } from "react";
import NavBarAdmin from "@/components/admin/NavBarAdmin";
import RoomsAdmin from "@/components/admin/RoomsAdmin";
import BookingsAdmin from "@/components/admin/BookingsAdmin";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"rooms" | "bookings">("rooms");

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <NavBarAdmin activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "rooms" ? (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <RoomsAdmin />
            </motion.div>
          ) : (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <BookingsAdmin />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
