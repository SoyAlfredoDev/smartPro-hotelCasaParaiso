"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Habitaciones", href: "#habitaciones" },
  { label: "Ubicaciones", href: "#ubicaciones" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Servicios", href: "#servicios" },
  { label: "Reservar", href: "#reservar" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ocultar si hacemos scroll hacia abajo y pasamos los primeros 80px
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsOpen(false); // Buena práctica: cerrar el menú móvil si hacen scroll
      } else {
        // Mostrar si hacemos scroll hacia arriba
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Usamos passive: true para no bloquear el rendimiento del scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    // Cambiamos 'sticky' por 'fixed' para que la traslación funcione perfectamente en toda la página
    <header
      className={`fixed top-0 z-50 w-full border-b bg-gray backdrop-blur-lg transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/images/logo-hotel-casa-paraiso.png"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer h-full"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-md font-medium text-text-secondary transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#reservar"
            className="inline-flex items-center justify-center rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary/95 hover:shadow-md active:scale-95"
          >
            Reservar
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary text-primary transition-colors hover:bg-background md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-primary bg-surface md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-background"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="#reservar"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary/95 hover:shadow-md active:scale-[0.98]"
            >
              Reservar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
