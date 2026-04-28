"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, Heart } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const company = {
    rut: "77.010.418-1",
    name: "ATLANTIC GROUP SPA",
    address: "Avenida República #19, Santiago, RM, código postal 8320000",
    address2: "Salesiano #1130, San Miguel, RM, código postal 8900000",
    email: "contacto@hotelcasaparaiso.cl",
    phone: "+56 9 3584 1793",
    whatsapp: "56935841793",
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary">
      {/* Decorative accent line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c8a97e]/40 to-transparent" />

      {/* Subtle background glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#2f5d50] opacity-[0.06] blur-[150px]" />
        <div className="absolute -right-[5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-[#c8a97e] opacity-[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        {/* Top Section: Brand & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-8 border-b border-white/[0.06] pb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex items-center gap-4 my-auto">
            <Image
              src="/images/logo-hotel-casa-paraiso.png"
              alt="Logo"
              width={100}
              height={100}
              className="bg-surface rounded-lg my-[-20px] p-2 w-[200px]"
            />
            <p className="mt-3 max-w-md font-inter text-[18px] leading-relaxed text-white/90">
              Hotel boutique con enfoque en comodidad, ubicación y experiencia.
              Tu hogar lejos de casa en Santiago.
            </p>
          </div>

          {/* Social links – elevated pill style */}
          <div className="flex items-center gap-3 my-auto">
            <span className="mr-2 font-inter text-[18px] font-bold uppercase tracking-[0.2em] text-white/90">
              Síguenos
            </span>
            <Link
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.04] text-white/90 transition-all duration-300 hover:border-[#c8a97e]/30 hover:bg-[#c8a97e]/10 hover:text-[#c8a97e]"
            >
              <FaInstagram className="text-[24px]" />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.04] text-white/90 transition-all duration-300 hover:border-[#c8a97e]/30 hover:bg-[#c8a97e]/10 hover:text-[#c8a97e]"
            >
              <FaFacebook className="text-[24px]" />
            </Link>
            <Link
              href="#"
              aria-label="Tiktok"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.04] text-white/90 transition-all duration-300 hover:border-[#c8a97e]/30 hover:bg-[#c8a97e]/10 hover:text-[#c8a97e]"
            >
              <FaTiktok className="text-[24px]" />
            </Link>
          </div>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-inter text-[16px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]">
              Contacto
            </h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <MapPin className="h-3.5 w-3.5 text-white/80" />
                </div>
                <span className="font-inter text-[16px] leading-relaxed text-white/80">
                  {company.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <MapPin className="h-3.5 w-3.5 text-white/80" />
                </div>
                <span className="font-inter text-[16px] leading-relaxed text-white/80">
                  {company.address2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Phone className="h-3.5 w-3.5 text-white/80" />
                </div>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  className="font-inter text-[16px] text-white/80 transition-colors duration-300 hover:text-[#c8a97e]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Mail className="h-3.5 w-3.5 text-white/80" />
                </div>
                <Link
                  href={`mailto:${company.email}`}
                  className="font-inter text-[13px] text-white/80 transition-colors duration-300 hover:text-[#c8a97e]"
                >
                  {company.email}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-inter text-[16px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]">
              Alojamientos
            </h3>
            <ul className="mt-5 space-y-2">
              {footerLinks.alojamientos.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group/link flex items-center gap-1.5 font-inter text-[16px] text-white/80 transition-colors duration-300 hover:text-[#c8a97e]"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-inter text-[16px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]">
              Empresa
            </h3>
            <ul className="mt-5 space-y-2">
              {footerLinks.empresa.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group/link flex items-center gap-1.5 font-inter text-[16px] text-white/80 transition-colors duration-300 hover:text-[#c8a97e]"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Info */}
          <motion.div variants={itemVariants}>
            <h3 className="font-inter text-[16px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]">
              Información Legal
            </h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                <p className="font-inter text-[16px] font-bold uppercase tracking-wider text-white/80">
                  Razón Social
                </p>
                <p className="mt-1 font-inter text-[16px] font-semibold text-white/80">
                  {company.name}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                <p className="font-inter text-[16px] font-bold uppercase tracking-wider text-white/80">
                  RUT
                </p>
                <p className="mt-1 font-inter text-[16px] font-semibold text-white/80">
                  {company.rut}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div variants={itemVariants}>
            <h3 className="font-inter text-[16px] font-bold uppercase tracking-[0.2em] text-[#c8a97e]">
              Métodos de pago
            </h3>
            <div className="mt-5 flex items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <Image
                src="/images/webpay-2048x979.png"
                alt="Métodos de pago - Webpay"
                width={200}
                height={96}
                className="h-auto w-full max-w-[200px] opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-center gap-1.5 font-inter text-[16px] text-white/80">
            © {currentYear} {company.name}. Todos los derechos reservados.
            <span className="hidden sm:inline">·</span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              Hecho con <Heart className="h-3 w-3 text-[#c8a97e]/50" /> en
              Santiago
            </span>
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              className="font-inter text-[16px] text-white/80 transition-colors duration-300 hover:text-white/60"
              href="#"
            >
              Política de privacidad
            </Link>
            <Link
              className="font-inter text-[16px] text-white/80 transition-colors duration-300 hover:text-white/60"
              href="#"
            >
              Términos y condiciones
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
