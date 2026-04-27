import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configuración manual de la ruta al .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") }); // Sube un nivel si el script está en /lib

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  // Imprimimos para verificar que la variable se cargó (borra esto después)
  console.log(
    "DATABASE_URL detectada:",
    process.env.DATABASE_URL ? "SÍ" : "NO",
  );

  try {
    await prisma.$connect();
    console.log("✅ Conexión exitosa a la DB");
  } catch (e) {
    console.error("❌ Error de conexión:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
