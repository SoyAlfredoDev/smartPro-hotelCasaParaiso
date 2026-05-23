import { Utensils, GlassWater, Wine } from "lucide-react";

export const restaurants = [
  {
    id: "resto-bar-republica",
    address: "Republica 19 Santiago, Santiago, Santiago, 8340000",
    title: "Restobar Republica",
    subtitle: "Gastronomía Chilena de Autor",
    description: "",
    image: "/images/republica/restaurants/restaurant-01.jpg",
    video:
      "https://res.cloudinary.com/dtg53cua9/video/upload/v1779320806/restobar-republica_q6emp4.mp4",
    features: ["Terraza", "Cata de Vinos", "Música en vivo"],
    icon: Utensils,
    color: "#c8a97e",
  },
  {
    id: "restaurante-republica-2",
    title: "Restaurante Republica",
    address: "Republica 19 Santiago, Santiago, Santiago, 8340000",
    subtitle: "Sabores del Pacífico",
    description: "",
    image: "/images/republica/restaurants/restaurant-06.jpg",
    video:
      "https://res.cloudinary.com/dtg53cua9/video/upload/v1779321691/restaurant-republica_h0v23b.mp4",
    features: ["Vistas al Cerro", "Coctelería", "Cenas Románticas"],
    icon: GlassWater,
    color: "#8fa89e",
  },
  {
    id: "restarurante-san-miguel",
    title: "Restaurante San Miguel",
    address: "Av Salesianos 1130, San Miguel, Santiago, San Miguel, 8930000",
    subtitle: "Tapas y Vinos Premium",
    description: "",
    image: "/images/san-miguel/restaurants/restaurant-03.jpg",
    video:
      "https://res.cloudinary.com/dtg53cua9/video/upload/v1779320300/restaurant-san-miguel_qgsc7w.mp4",
    features: ["Ambiente Acogedor", "Coctelería", "Eventos"],
    icon: Wine,
    color: "#c8a97e",
  },
];
