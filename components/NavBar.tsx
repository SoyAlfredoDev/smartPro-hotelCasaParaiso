"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

/* ───────────────────────────────────────────── */
const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Ubicaciones", href: "#ubicaciones" },
  { label: "Habitaciones", href: "#habitaciones" },
  { label: "Entorno", href: "#entorno" },
  { label: "Traslados", href: "#traslados" },
  { label: "Solicitud Especiales", href: "#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");

  const lastScrollY = useRef(0);

  /* ── Scroll ── */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setHasScrolled(currentScrollY > 40);

    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsVisible(false);
      setIsOpen(false);
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;

    // 👇 detectar top
    if (currentScrollY < 100) {
      setActiveSection("#inicio");
    }
  }, []);

  /* ── Active section ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.href);
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

  /* ── Lock scroll mobile ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Smooth scroll ── */
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = 80;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        hasScrolled
          ? "border-b border-[#e5e5e5]/60 bg-white/90 shadow-[0_1px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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

        {/* Desktop */}
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
                      : "text-gray-700 hover:text-gray-900 text-[20px]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#c8a97e] transition-all duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative z-9999 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 md:hidden ${
            isOpen
              ? " text-primary"
              : hasScrolled
                ? "border border-[#e5e5e5] text-[#2b2b2b] hover:border-[#2f5d50]/30 hover:text-[#2f5d50]"
                : "border border-white/30 hover:bg-white/10"
          }`}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 -transition-all duration-500 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute z-9999   right-0 top-0 flex h-full w-[85%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#e5e5e5]/50 px-6 py-5">
            <span className="font-chillax text-lg font-bold text-[#2b2b2b]">
              Menú
            </span>
            <button className="" onClick={() => setIsOpen(false)}>
              <X size={16} className="text-white" />
            </button>
          </div>

          <nav className="flex flex-1 bg-white flex-col gap-1 px-4 py-6">
            {navItems.map((item) => {
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
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8a97e]" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
