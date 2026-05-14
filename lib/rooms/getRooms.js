export async function getRooms(hotelId) {
  try {
    const res = await fetch("/api/rooms");
    const rooms = await res.json();

    if (!hotelId) {
      return rooms;
    }
    if (hotelId !== "all") {
      return rooms.filter((room) => room.hotelId === hotelId);
    }
    return rooms;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return [];
  }
}
