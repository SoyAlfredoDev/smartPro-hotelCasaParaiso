import type { TailwindConfig } from "@react-email/components";

export const BRAND = {
  primary: "#01c676",
  secondary: "#094fd1",
  dark: "#021f41",
  muted: "#6b7280",
  surface: "#f8fafc",
  white: "#ffffff",
} as const;

export const HOTEL_NAME = "Casa Paraíso Hotel";
export const HOTEL_WEBSITE = "https://casaparaisohotel.cl";
export const DEFAULT_ADMIN_PANEL_URL = "https://casaparaisohotel.cl/admin/reservas";

export const tailwindConfig: TailwindConfig = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: BRAND.primary,
          secondary: BRAND.secondary,
          dark: BRAND.dark,
          muted: BRAND.muted,
          surface: BRAND.surface,
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
};
