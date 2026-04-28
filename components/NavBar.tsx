"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Nav Links — synced with actual section IDs
   ───────────────────────────────────────────── */
const navItems = [
  { label: "Ubicaciones", href: "#ubicaciones" },
  { label: "Habitaciones", href: "#habitaciones" },
  { label: "Entorno", href: "#entorno" },
  { label: "Traslados", href: "#traslados" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);

  /* ── Scroll: hide/show + frosted state ── */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Show solid background after scrolling past hero
    setHasScrolled(currentScrollY > 40);

    // Hide on scroll down (past 100px), show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
      setIsOpen(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  /* ── Active section detection via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Smooth scroll handler ── */
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 hover:bg-white/20 hover:backdrop-blur-xl ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        hasScrolled
          ? "border-b border-[#e5e5e5]/60 bg-white/80 shadow-[0_1px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="relative flex items-center">
          <Image
            src="/images/logo-hotel-casa-paraiso.png"
            alt="Hotel Casa Paraíso"
            width={140}
            height={56}
            className="h-14 w-auto cursor-pointer transition-opacity duration-300 hover:opacity-80"
            priority
          />
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative rounded-lg px-4 py-2 font-inter text-[18px] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#2f5d50]"
                    : hasScrolled
                      ? "text-[#6f6f6f] hover:text-[#2b2b2b]"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {/* Active indicator dot */}
                <span
                  className={`absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#c8a97e] transition-all duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* ── Desktop CTA Button ── */}
        <div className="hidden md:block">
          <a
            href="#reservar"
            onClick={(e) => scrollToSection(e, "#reservar")}
            className={`group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 font-inter text-[13px] font-semibold transition-all duration-300 active:scale-95 ${
              hasScrolled
                ? "bg-[#2f5d50] text-white shadow-sm hover:bg-[#23473c] hover:shadow-md"
                : "border border-white/30 bg-[#23473c] text-white"
            }`}
          >
            Reservar
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* ── Mobile Menu Toggle ── */}
        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 md:hidden ${
            isOpen
              ? "bg-[#2f5d50] text-white"
              : hasScrolled
                ? "border border-[#e5e5e5] text-[#2b2b2b] hover:border-[#2f5d50]/30 hover:text-[#2f5d50]"
                : "border border-white/30 text-white hover:bg-white/10"
          }`}
        >
          <span className="sr-only">{isOpen ? "Cerrar" : "Menú"}</span>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile Menu Panel ── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[#e5e5e5]/50 px-6 py-5">
            <span className="font-chillax text-lg font-bold text-[#2b2b2b]">
              Menú
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5f5f3] text-[#6f6f6f] transition-colors hover:bg-[#e5e5e5] hover:text-[#2b2b2b]"
              aria-label="Cerrar menú"
            >
              <X size={16} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3.5 font-inter text-[15px] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#2f5d50]/8 text-[#2f5d50]"
                      : "text-[#6f6f6f] hover:bg-[#f5f5f3] hover:text-[#2b2b2b]"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${80 + index * 50}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8a97e]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="border-t border-[#e5e5e5]/50 px-4 py-5">
            <a
              href="#reservar"
              onClick={(e) => scrollToSection(e, "#reservar")}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2f5d50] font-inter text-[14px] font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#23473c] active:scale-[0.98]"
            >
              Reservar ahora
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center font-inter text-[11px] text-[#9a9a9a]">
              Disponibilidad inmediata · Sin compromiso
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
