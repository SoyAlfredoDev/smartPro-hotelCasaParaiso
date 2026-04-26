"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const footerLinks = {
  alojamientos: [
    { label: "Habitaciones", href: "#habitaciones" },
    { label: "Ubicaciones", href: "#ubicaciones" },
    { label: "Servicios", href: "#servicios" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Experiencias", href: "#experiencias" },
    { label: "Contacto", href: "#contacto" },
  ],
};

export default function Footer() {
  const company = {
    rut: "77.010.418-1",
    name: "ATLANTIC GROUP SPA",
    address: "Avenida República #19, Santiago, Región Metropolitana",
    email: "contacto@hotelcasaparaiso.cl",
    phone: "+56935841793",
  };
  return (
    <footer className="border-t border-default bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <p className="text-sm font-bold text-white">{company.name}</p>
            <p className="text-sm text-white">{company.rut}</p>

            <p className="mt-4 text-sm leading-7 text-white">
              Estadías boutique pensadas para quienes buscan comodidad,
              ubicación y una experiencia acogedora en la ciudad.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-background text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md active:scale-95"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-background text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md active:scale-95"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Alojamientos
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.alojamientos.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Empresa
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.empresa.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Contacto
            </h3>

            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-primary" size={18} />
                <span className="text-sm leading-6 text-white">
                  {company.address}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-white" size={18} />
                <Link
                  href="tel:+56900000000"
                  className="text-sm text-white transition-colors duration-200 hover:text-primary"
                >
                  +56 9 0000 0000
                </Link>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-white" size={18} />
                <Link
                  href="mailto:reservas@casapariako.cl"
                  className="text-sm text-white transition-colors duration-200 hover:text-primary"
                >
                  {company.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-default pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white">
            © 2026 {company.name}. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#"
              className="text-sm text-white transition-colors duration-200 hover:text-primary"
            >
              Política de privacidad
            </Link>
            <Link
              href="#"
              className="text-sm text-white transition-colors duration-200 hover:text-primary"
            >
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
