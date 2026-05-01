import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Búsqueda de Habitaciones",
  description:
    "Busca y encuentra la habitación perfecta en Casa Paraíso Hotel. Habitaciones disponibles para tus fechas en Santiago.",
  alternates: {
    canonical: "/search",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
