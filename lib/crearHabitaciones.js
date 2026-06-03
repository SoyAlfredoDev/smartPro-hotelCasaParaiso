// ─── Carga de entorno (fuera de Next.js) ───
import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL no está definida. Revisa tu archivo .env");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const habitaciones = [
  {
    id: "01",
    name: "Habitación Doble",
    description: "2 Camas Individuales",
    hotelId: "hotel-republica",
    category: "Doble",
    capacity: 2,
    price: 50000,
    images: [
      "/images/republica/rooms/double-01.jpg",
      "/images/republica/badroom-01.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "02",
    name: "Habitación Triple",
    description: "3 Camas Individuales",
    hotelId: "hotel-republica",
    category: "Triple",
    capacity: 3,
    price: 75000,
    images: [
      "/images/republica/rooms/triple-01.jpg",
      "/images/republica/badroom-01.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "03",
    name: "Habitación Cuádruple",
    description: "4 Camas Matrimoniales",
    hotelId: "hotel-republica",
    category: "Cuadruple",
    capacity: 8,
    price: 100000,
    images: [
      "/images/republica/rooms/cuadruple-01.jpg",
      "/images/republica/rooms/cuadruple-02.jpg",
      "/images/republica/badroom-01.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "04",
    name: "Habitación Familiar",
    description: "1 cama matrimonial y 1 cama individual",
    hotelId: "hotel-republica",
    category: "Familiar",
    capacity: 3,
    price: 75000,
    images: [
      "/images/republica/rooms/familiar-01.jpg",
      "/images/republica/rooms/familiar-02.jpg",
      "/images/republica/badroom-01.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "05",
    name: "Habitación Matrimonial",
    description: "1 Cama Matrimonial",
    hotelId: "hotel-republica",
    category: "Matrimonial",
    capacity: 2,
    price: 50000,
    images: [
      "/images/republica/rooms/matrimonial-01.jpg",
      "/images/republica/rooms/matrimonial-02.jpg",
      "/images/republica/badroom-01.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "06",
    name: "Habitación Single",
    description: "1 Cama Individual",
    hotelId: "hotel-republica",
    category: "single",
    capacity: 1,
    price: 45000,
    images: [
      "/images/republica/rooms/single-01.jpg",
      "/images/republica/rooms/single-02.jpg",
      "/images/republica/badroom-01.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "11",
    name: "Habitación Matrimonial",
    description: "1 Cama Matrimonial",
    hotelId: "hotel-san-miguel",
    category: "Matrimonial",
    capacity: 2,
    price: 45000,
    images: [
      "/images/san-miguel/rooms/matrimonial-01.jpg",
      "/images/san-miguel/rooms/matrimonial-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-03.jpg",
      "/images/san-miguel/bathrooms/bathroom-04.jpg",
      "/images/san-miguel/bathrooms/bathroom-05.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "12",
    name: "Habitación Quíntuple",
    description: "5 Camas Individuales",
    hotelId: "hotel-san-miguel",
    category: "Quíntuple",
    capacity: 10,
    price: 150000,
    images: [
      "/images/san-miguel/rooms/quintuple-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-02.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "13",
    name: "Habitación Matrimonial / Baño compartido",
    description: "1 Cama Individual",
    hotelId: "hotel-san-miguel",
    category: "Matrimonial",
    capacity: 2,
    price: 35000,
    images: [
      "/images/san-miguel/rooms/matrimonial-03.jpg",
      "/images/san-miguel/bathrooms/bathroom-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-03.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "14",
    name: "Habitación Matrimonial / Jacuzzi",
    description: "1 Cama Matrimonial",
    hotelId: "hotel-san-miguel",
    category: "Matrimonial",
    capacity: 2,
    price: 55000,
    images: [
      "/images/san-miguel/rooms/matrimonial-01.jpg",
      "/images/san-miguel/rooms/matrimonial-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-03.jpg",
      "/images/san-miguel/bathrooms/bathroom-04.jpg",
      "/images/san-miguel/bathrooms/bathroom-05.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "minibar", "tv"],
  },
  {
    id: "15",
    name: "Habitación Doble Matrimonial ",
    description: "2 Camas Matrimoniales",
    hotelId: "hotel-san-miguel",
    category: "Doble",
    capacity: 4,
    price: 60000,
    images: [
      "/images/san-miguel/rooms/matrimonial-01.jpg",
      "/images/san-miguel/rooms/matrimonial-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-02.jpg",
      "/images/san-miguel/bathrooms/bathroom-03.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
  {
    id: "16",
    name: "Habitación Cuádruple",
    description: "4 Camas Matrimoniales",
    hotelId: "hotel-san-miguel",
    category: "Cuadruple",
    capacity: 8,
    price: 100000,
    images: [
      "/images/san-miguel/rooms/quintuple-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-01.jpg",
      "/images/san-miguel/bathrooms/bathroom-02.jpg",
    ],
    amenities: ["desayuno", "wi-fi", "estacionamiento", "tv"],
  },
];

async function upsertRooms() {
  try {
    console.log("⏳ Cargando habitaciones...");
    let created = 0;
    let updated = 0;

    for (const room of habitaciones) {
      const existing = await prisma.room.findUnique({ where: { id: room.id } });
      await prisma.room.upsert({
        where: { id: room.id },
        create: room,
        update: room,
      });
      if (existing) updated++;
      else created++;
    }

    console.log(
      `✅ Listo: ${habitaciones.length} habitaciones (${created} nuevas, ${updated} actualizadas).`,
    );
  } catch (error) {
    console.error("❌ Error en la carga:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

upsertRooms();
