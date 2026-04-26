import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();
    console.log("rooms", rooms);
    return Response.json(rooms, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error al obtener las habitaciones" },
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
    console.error(error);
    return Response.json(
      { error: "Error al crear la habitación" },
      { status: 500 },
    );
  }
}
