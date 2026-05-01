import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casaparaisohotel.cl"),
  title: {
    default: "Casa Paraíso Hotel | Experiencia de Lujo y Confort en Santiago",
    template: "%s | Casa Paraíso Hotel",
  },
  description:
    "Descubre Casa Paraíso Hotel en Santiago. Habitaciones boutique, comodidad, excelente ubicación y una experiencia inolvidable. Reserva tu estadía ideal.",
  keywords: [
    "hotel boutique",
    "hotel santiago",
    "casa paraiso",
    "alojamiento santiago",
    "reservas hotel",
    "chile",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Casa Paraíso Hotel | Tu hogar lejos de casa en Santiago",
    description:
      "Hotel boutique con enfoque en comodidad, ubicación y experiencia. Reserva ahora y disfruta de la mejor atención.",
    url: "https://casaparaisohotel.cl",
    siteName: "Casa Paraíso Hotel",
    images: [
      {
        url: "/images/logo-hotel-casa-paraiso.png",
        width: 1200,
        height: 630,
        alt: "Logo Casa Paraíso Hotel",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Paraíso Hotel",
    description: "Hotel boutique con enfoque en comodidad, ubicación y experiencia.",
    images: ["/images/logo-hotel-casa-paraiso.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
