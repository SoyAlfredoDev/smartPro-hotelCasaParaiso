"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────────
   WhatsApp Button — Hotel Casa Paraíso
   Floating CTA · Premium · Responsive
   ───────────────────────────────────────────── */

const WHATSAPP_NUMBER = "56955103829";
const DEFAULT_MESSAGE =
  "Hola, me gustaría obtener más información sobre las reservas en Hotel Casa Paraíso.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  DEFAULT_MESSAGE,
)}`;

/* Transition curve matching the project design system */
const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ─── WhatsApp SVG Icon (native, lightweight) ─── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
      id="whatsapp-floating-button"
    >
      {/* ─── Tooltip "¿Necesitas ayuda?" — desktop only ─── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: smoothEase }}
            className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 md:block"
          >
            <span
              className="inline-flex items-center whitespace-nowrap rounded-xl px-4 py-2.5 font-inter text-[13px] font-medium tracking-wide text-white"
              style={{
                background: "linear-gradient(135deg, #2f5d50 0%, #1e3f36 100%)",
                boxShadow:
                  "0 8px 32px rgba(47, 93, 80, 0.3), 0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              ¿Necesitas ayuda?
              {/* Tooltip arrow */}
              <span
                className="absolute right-[-6px] top-1/2 -translate-y-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "6px solid #1e3f36",
                }}
              />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main button ─── */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctanos por WhatsApp"
        /* Entry animation */
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          ease: smoothEase,
        }}
        /* Hover & tap micro-interactions */
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative flex items-center justify-center rounded-full text-white"
        style={{
          width: 60,
          height: 60,
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow:
            "0 8px 32px rgba(37, 211, 102, 0.35), 0 4px 12px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Hover glow ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered
              ? "0 0 0 6px rgba(37, 211, 102, 0.15)"
              : "0 0 0 0px rgba(37, 211, 102, 0)",
          }}
          transition={{ duration: 0.35, ease: smoothEase }}
          aria-hidden="true"
        />

        {/* Icon */}
        <WhatsAppIcon className="relative z-10 h-7 w-7" />

        {/* ─── Pulse ping notification dot ─── */}
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          {/* Ping ring — continuous subtle animation */}
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{
              backgroundColor: "#86efac",
              animationDuration: "2.5s",
            }}
          />
          {/* Solid dot */}
          <span
            className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white"
            style={{ backgroundColor: "#4ade80" }}
          />
        </span>
      </motion.a>
    </div>
  );
}
