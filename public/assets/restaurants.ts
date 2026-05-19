import { Utensils, GlassWater, Wine } from "lucide-react";

export const restaurants = [
  {
    id: "resto-bar-republica",
    address: "Republica 19 Santiago, Santiago, Santiago, 8340000",
    title: "Restobar Republica",
    subtitle: "Gastronomía Chilena de Autor",
    description:
      "Disfruta de una experiencia culinaria única con platos tradicionales reinventados con ingredientes locales en un ambiente natural.",
    image: "/images/republica/restaurants/restaurant-05.jpg",
    features: ["Terraza", "Cata de Vinos", "Música en vivo"],
    icon: Utensils,
    color: "#c8a97e",
  },
  {
    id: "restaurante-republica-2",
    title: "Restaurante Republica",
    address: "Republica 19 Santiago, Santiago, Santiago, 8340000",
    subtitle: "Sabores del Pacífico",
    description:
      "Pescados frescos y mariscos capturados diariamente con vistas privilegiadas.",
    image: "/images/republica/restaurants/restaurant-06.jpg",
    features: ["Vistas al Cerro", "Coctelería", "Cenas Románticas"],
    icon: GlassWater,
    color: "#8fa89e",
  },
  {
    id: "restarurante-san-miguel",
    title: "Restaurante San Miguel",
    address: "Av Salesianos 1130, San Miguel, Santiago, San Miguel, 8930000",
    subtitle: "Tapas y Vinos Premium",
    description:
      "Una selección única de cepas nacionales acompañada de las mejores tapas de Santiago.",
    image: "/images/san-miguel/restaurants/restaurant-03.jpg",
    features: ["Bodega Privada", "Degustaciones", "Eventos"],
    icon: Wine,
    color: "#c8a97e",
  },
];
