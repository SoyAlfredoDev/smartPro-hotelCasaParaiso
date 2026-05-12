import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = req.headers.get("apikey");

    // 1. Validación de seguridad básica
    if (apiKey !== process.env.KLAP_PRIVATE_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    console.log("Notificación de pago RECHAZADO:", body);

    /**
     * Klap suele enviar en el rechazo:
     * - reference_id: Tu ID de orden.
     * - message: El motivo del rechazo (ej: "Tarjeta sin fondos").
     * - code: Código interno del error.
     */
    const { reference_id, message, code } = body;

    // 2. Lógica de Negocio: Actualizar estado a FALLIDO
    /*
    await prisma.order.update({
      where: { id: reference_id },
      data: { 
        status: "REJECTED",
        lastError: message || "Pago rechazado por la pasarela",
        updatedAt: new Date()
      }
    });
    */

    // 3. (Opcional) Lógica de Inventario
    // Si al crear la orden restaste stock, aquí es el momento de devolverlo.

    return NextResponse.json({ message: "Rechazo procesado" }, { status: 200 });
  } catch (error) {
    console.error("Error en webhook de rechazo:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
