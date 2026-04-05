"use client";

import Link from "next/link";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 pt-3 z-50 w-full border-b bg-surface/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={220}
            height={220}
            className="cursor-pointer my-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-md font-medium text-secondary transition-colors duration-200 hover:text-primary"
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
