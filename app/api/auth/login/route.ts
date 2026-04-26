import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // 1. Cargar variables de entorno (El ADMIN_PASS debe ser tu HASH generado previamente)
    const adminUser = process.env.ADMIN_USER;
    const adminPasswordHash = process.env.ADMIN_PASS;

    // 2. VALIDACIÓN INICIAL: ¿Están las variables cargadas?
    if (!adminUser || !adminPasswordHash) {
      console.error(
        "❌ ERROR: ADMIN_USER o ADMIN_PASS no definidos en el .env",
      );
      return NextResponse.json(
        { message: "Error de configuración interna" },
        { status: 500 },
      );
    }

    // 3. Leer datos del cuerpo de la petición (Viene en texto plano desde el Frontend)
    const body = await request.json();
    const { user, password } = body;

    // 4. Validación de Usuario
    if (user !== adminUser) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" },
        { status: 401 },
      );
    }

    // 5. Validación de Contraseña Segura
    // Aquí el servidor toma el texto plano, lo procesa matemáticamente y lo compara con el Hash del .env
    const hashPassworddd = bcrypt.hashSync(adminPasswordHash, 10);
    const isPasswordValid = bcrypt.compareSync(password, hashPassworddd);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" }, // Sin el "v1" para no dar pistas
        { status: 401 },
      );
    }

    // 6. Éxito
    return NextResponse.json(
      { message: "Login exitoso", user: adminUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en el login route:", error);
    return NextResponse.json(
      { message: "Ocurrió un error inesperado" },
      { status: 500 },
    );
  }
}
