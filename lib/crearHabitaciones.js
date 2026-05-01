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
    id: 1,
    name: "Habitación Doble",
    description: "2 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Doble",
    capacity: 2,
    price: 50000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 2,
    name: "Habitación Triple",
    description: "3 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Triple",
    capacity: 3,
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 3,
    name: "Habitación Cuádruple",
    description: "4 Camas Individuales",
    hotelID: "hotel-san-miguel",
    category: "Cuadruple",
    capacity: 4,
    price: 100000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 4,
    name: "Habitación Familiar",
    description: "1 cama matrimonial y 1 cama individual",
    hotelID: "hotel-san-miguel",
    category: "Familiar",
    capacity: 3,
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "/images/Portada_habitación.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: 5,
    name: "Habitación Matrimonial",
    description: "1 Cama Matrimonial",
    hotelID: "hotel-san-miguel",
    category: "Matrimonial",
    capacity: 2,
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
