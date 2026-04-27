"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  LogOut,
} from "lucide-react";

interface NavBarAdminProps {
  activeTab: "rooms" | "bookings";
  onTabChange: (tab: "rooms" | "bookings") => void;
}

export default function NavBarAdmin({ activeTab, onTabChange }: NavBarAdminProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      router.push("/");
    }
  };

  const tabs = [
    { id: "rooms" as const, label: "Habitaciones", icon: BedDouble },
    { id: "bookings" as const, label: "Reservaciones", icon: CalendarCheck },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide font-['AQ_Chillax',sans-serif]">
                Casa Paraiso
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">
                Panel Admin
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                    ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg bg-[var(--primary)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors duration-200 text-sm cursor-pointer"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
