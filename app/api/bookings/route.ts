import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const roomId = searchParams.get("roomId");

    const where: Record<string, unknown> = {};
    if (status && status !== "todas") {
      where.status = status;
    }
    if (roomId) {
      where.roomId = roomId;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        room: {
          select: {
            id: true,
            name: true,
            category: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json(
      { error: "Error al obtener las reservas" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, guestEmail, guestPhone, checkIn, checkOut, guests, totalPrice, roomId, notes } = body;

    if (!guestName || !guestEmail || !checkIn || !checkOut || !roomId) {
      return Response.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        guestName,
        guestEmail,
        guestPhone: guestPhone || "",
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: guests || 1,
        totalPrice: totalPrice || 0,
        roomId,
        notes: notes || null,
        status: "pendiente",
      },
      include: {
        room: {
          select: {
            id: true,
            name: true,
            category: true,
            images: true,
          },
        },
      },
    });

    return Response.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return Response.json(
      { error: "Error al crear la reserva" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return Response.json(
        { error: "Se requiere el ID de la reserva" },
        { status: 400 },
      );
    }

    // Handle date conversion if present
    if (data.checkIn) data.checkIn = new Date(data.checkIn);
    if (data.checkOut) data.checkOut = new Date(data.checkOut);

    const booking = await prisma.booking.update({
      where: { id },
      data,
      include: {
        room: {
          select: {
            id: true,
            name: true,
            category: true,
            images: true,
          },
        },
      },
    });

    return Response.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return Response.json(
      { error: "Error al actualizar la reserva" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "Se requiere el ID de la reserva" },
        { status: 400 },
      );
    }

    await prisma.booking.delete({ where: { id } });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return Response.json(
      { error: "Error al eliminar la reserva" },
      { status: 500 },
    );
  }
}
