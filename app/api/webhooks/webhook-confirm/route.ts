import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // Si usas Prisma para tu base de datos

export async function POST(req: Request) {
  try {
    // 1. Obtener el cuerpo de la notificación
    const body = await req.json();

    // 2. Seguridad: Verificar la API Key
    // Klap suele enviar la firma o API Key en los headers para validar que la petición es real
    const apiKey = req.headers.get("apikey");
    if (apiKey !== process.env.KLAP_PRIVATE_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    console.log("Notificación de pago recibida");

    /**
     * El cuerpo (body) que envía Klap suele contener:
     * - order_id: El ID de la orden en Klap
     * - reference_id: El ID de tu sistema (el que generaste al crear la orden)
     * - status: El estado del pago (ej: 'completed')
     */
    const { reference_id, order_id } = body;

    // 3. Lógica de Negocio: Actualizar tu base de datos
    // Ejemplo con Prisma:
    /*
    await prisma.order.update({
      where: { id: reference_id },
      data: { 
        status: "PAID",
        klapOrderId: order_id,
        updatedAt: new Date()
      }
    });
    */

    // 4. Responder a Klap con un 200 OK
    // Es CRÍTICO responder rápido y con éxito para que Klap no reintente el envío
    return NextResponse.json(
      { message: "Webhook recibido correctamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error procesando webhook de Klap:", error);
    // Aunque falle tu lógica, a veces es mejor devolver 200 para evitar bucles de reintento
    // si el error es de tu base de datos y no de la comunicación.
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
