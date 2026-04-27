import { prisma } from "@/lib/prisma";
import type { Room } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const hotelId = searchParams.get("hotelId");

    const where: Record<string, unknown> = {};
    if (category && category !== "todas") {
      where.category = category;
    }
    if (hotelId && hotelId !== "todos") {
      where.hotelId = hotelId;
    }

    const rooms = await prisma.room.findMany({
      where,
      orderBy: { name: "asc" },
    });

    // Get booking counts separately to avoid issues with stale client cache
    const roomsWithCounts = await Promise.all(
      rooms.map(async (room: Room) => {
        try {
          const bookingCount = await prisma.booking.count({ where: { roomId: room.id } });
          return { ...room, _count: { bookings: bookingCount } };
        } catch {
          return { ...room, _count: { bookings: 0 } };
        }
      })
    );

    return Response.json(roomsWithCounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return Response.json(
      { error: "Error al obtener las habitaciones" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { roomData } = await request.json();
    const room = await prisma.room.update({
      where: { id: roomData.id },
      data: {
        name: roomData.name,
        description: roomData.description,
        hotelId: roomData.hotelId,
        category: roomData.category,
        capacity: roomData.capacity,
        price: roomData.price,
        images: roomData.images,
        amenities: roomData.amenities,
      },
    });
    return Response.json(room, { status: 200 });
  } catch (error) {
    console.error("Error updating room:", error);
    return Response.json(
      { error: "Error al actualizar la habitación" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { roomData } = await request.json();
    const room = await prisma.room.create({
      data: {
        id: roomData.id,
        name: roomData.name,
        description: roomData.description,
        hotelId: roomData.hotelId,
        category: roomData.category,
        capacity: roomData.capacity,
        price: roomData.price,
        images: roomData.images,
        amenities: roomData.amenities,
      },
    });
    return Response.json(room, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return Response.json(
      { error: "Error al crear la habitación" },
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
        { error: "Se requiere el ID de la habitación" },
        { status: 400 },
      );
    }

    // Check if room has bookings
    const bookingsCount = await prisma.booking.count({ where: { roomId: id } });
    if (bookingsCount > 0) {
      return Response.json(
        { error: `No se puede eliminar: la habitación tiene ${bookingsCount} reserva(s) asociada(s)` },
        { status: 409 },
      );
    }

    await prisma.room.delete({ where: { id } });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting room:", error);
    return Response.json(
      { error: "Error al eliminar la habitación" },
      { status: 500 },
    );
  }
}
