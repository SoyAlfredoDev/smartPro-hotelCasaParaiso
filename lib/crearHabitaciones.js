// ─── Carga de entorno (fuera de Next.js) ───
import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Validamos que DATABASE_URL esté presente antes de continuar
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL no está definida. Revisa tu archivo .env");
  process.exit(1);
}

// Creamos un PrismaClient independiente (no usamos el singleton de Next.js)
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const habitaciones = [
  {
    id: 201,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 202,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 203,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 204,
    name: null,
    description: "4 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Cuadruple",
    price: 100000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 205,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 206,
    name: null,
    description: "1 cama matrimonial y 1 cama individual",
    hotelID: "hotel-san-miguel",
    category: "Familiar",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 207,
    name: null,
    description: "1 cama matrimonial y 1 cama individual",
    hotelID: "hotel-san-miguel",
    category: "Familiar",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 208,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 209,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 210,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 211,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 212,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 214,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 215,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 216,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 301,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 302,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 303,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 304,
    name: null,
    description: "4 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Cuadruple",
    price: 100000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 305,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 306,
    name: null,
    description: "1 cama matrimonial y 1 cama individual",
    hotelID: "hotel-san-miguel",
    category: "Familiar",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 309,
    name: null,
    description: "1 cama matrimonial y 1 cama individual",
    hotelID: "hotel-san-miguel",
    category: "Familiar",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 310,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 311,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 312,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 314,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 315,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 401,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 402,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 403,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 404,
    name: null,
    description: "4 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Cuadruple",
    price: 100000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 405,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 407,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 408,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 409,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 410,
    name: null,
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 411,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 412,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 414,
    name: null,
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 415,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 416,
    name: null,
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
];

async function bulkCreateRooms() {
  try {
    console.log("⏳ Iniciando carga masiva...");

    const resultado = await prisma.room.createMany({
      data: habitaciones.map((h) => ({
        // 1. Aseguramos que el id sea String (según tu modelo)
        id: String(h.id),

        // 2. Resolvemos el problema del name: null
        name: `Habitación ${h.id}`,

        description: h.description,

        // 3. Corregimos hotelID -> hotelId (minúscula al final)
        hotelId: h.hotelID,

        category: h.category,

        // 4. Calculamos capacity dinámicamente según la categoría
        capacity:
          h.category.includes("Doble") || h.category.includes("Matrimonial")
            ? 2
            : h.category.includes("Triple") || h.category.includes("Familiar")
              ? 3
              : h.category.includes("Cuadruple")
                ? 4
                : 2,

        price: h.price,
        images: h.images,
        amenities: h.amenities,
      })),
      skipDuplicates: true, // Si ya existe una, la ignora y sigue con las demás
    });

    console.log(`✅ ¡Éxito! Se han creado ${resultado.count} habitaciones.`);
  } catch (error) {
    console.error("❌ Error crítico en la carga masiva:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end(); // Cerramos el pool de pg para evitar fugas de conexiones
  }
}

// Ejecutar la función
bulkCreateRooms();
