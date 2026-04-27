import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    // 1. Load environment variables
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    // 2. Validate that env vars are loaded
    if (!adminUser || !adminPass) {
      console.error(
        "❌ ERROR: ADMIN_USER o ADMIN_PASS no definidos en el .env",
      );
      return NextResponse.json(
        { message: "Error de configuración interna" },
        { status: 500 },
      );
    }

    // 3. Read request body
    const body = await request.json();
    const { user, password } = body;

    // 4. Validate user
    if (user !== adminUser) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" },
        { status: 401 },
      );
    }

    // 5. Validate password (direct comparison since ADMIN_PASS is stored as plaintext in .env)
    if (password !== adminPass) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" },
        { status: 401 },
      );
    }

    // 6. Create persistent session with httpOnly cookie
    await createSession(adminUser);

    // 7. Success response
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
