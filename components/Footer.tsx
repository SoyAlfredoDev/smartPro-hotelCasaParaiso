"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { div } from "framer-motion/client";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Footer() {
  const company = {
    rut: "77.010.418-1",
    name: "ATLANTIC GROUP SPA",
    address: "Avenida República #19, Santiago, RM",
    email: "contacto@hotelcasaparaiso.cl",
    phone: "+56 9 3584 1793",
    whatsapp: "56935841793",
  };

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* BRAND */}
            <motion.div variants={itemVariants}>
              <h2 className="text-base sm:text-lg font-bold">{company.name}</h2>

              <p className="mt-1 text-xs sm:text-sm opacity-80">
                RUT: {company.rut}
              </p>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed opacity-90">
                Estadías boutique con enfoque en comodidad, ubicación y
                experiencia.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <FaInstagram className="text-lg" />
                </Link>

                <Link
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <FaFacebook className="text-lg" />
                </Link>
              </div>
            </motion.div>

            {/* ALOJAMIENTOS */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs sm:text-sm font-semibold uppercase opacity-80">
                Alojamientos
              </h3>

              <ul className="mt-3 space-y-2">
                {footerLinks.alojamientos.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm opacity-90 transition hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* EMPRESA */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs sm:text-sm font-semibold uppercase opacity-80">
                Empresa
              </h3>

              <ul className="mt-3 space-y-2">
                {footerLinks.empresa.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm opacity-90 transition hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CONTACTO */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs sm:text-sm font-semibold uppercase opacity-80">
                Contacto
              </h3>

              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 opacity-80" size={18} />
                  <span className="opacity-90 text-xs sm:text-sm">
                    {company.address}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="shrink-0 opacity-80" size={18} />
                  <Link
                    href={`https://wa.me/${company.whatsapp}`}
                    className="opacity-90 hover:opacity-100 transition"
                  >
                    {company.phone}
                  </Link>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="shrink-0 opacity-80" size={18} />
                  <Link
                    href={`mailto:${company.email}`}
                    className="opacity-90 hover:opacity-100 transition"
                  >
                    {company.email}
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* BOTTOM BAR */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 border-t border-white/20 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-[11px] sm:text-xs opacity-75">
              © {currentYear} {company.name}. Todos los derechos reservados.
            </p>

            <div className="flex flex-wrap gap-4 text-[11px] sm:text-xs">
              <Link className="opacity-75 hover:opacity-100" href="#">
                Política de privacidad
              </Link>
              <Link className="opacity-75 hover:opacity-100" href="#">
                Términos y condiciones
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
      <div className="w-full h-5 bg-background"></div>
    </div>
  );
}
