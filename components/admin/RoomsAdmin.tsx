"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NewRoomButton from "./NewRoomButton";

interface Room {
  id: string;
  name: string;
  price: number;
  images: string[];
}

export default function RoomsComponent() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(data);
      setLoading(false);
    };
    fetchRooms();
  }, []);

  return (
    <div className="relative bg-surface m-4 rounded-lg ">
      <div className="flex justify-between items-center mb-4 bg-gray-200 p-4 rounded-t-lg ">
        <h2 className="text-2xl font-bold font-['AQ_Chillax',sans-serif]">
          Habitaciones
        </h2>
        <NewRoomButton />
      </div>
      <div className="overflow-x-auto">
        {" "}
        {/* Contenedor para que la tabla sea responsive */}
        <table className="w-full border-collapse">
          <thead>
            <tr className=" border-b border-surface/10 text-left  justify-center align-center">
              <th className="justify-center p-2 w-1/5 ">Image</th>
              <th className="justify-center p-2 w-2/5 ">Name</th>
              <th className="justify-center p-2 w-1/5 ">Price</th>
              <th className="justify-center p-2 w-1/5 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <p>Cargando habitaciones...</p>
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-surface/5 hover:bg-surface/5 transition-colors z-10"
                >
                  <td className="p-2">
                    <Image
                      src={room.images[0]}
                      alt={`Imagen de ${room.name}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-2">
                    <p className="text-dark font-medium">{room.name}</p>
                  </td>
                  <td className="p-2 font-bold text-primary">
                    {room.price.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button className="bg-primary px-3 py-1 rounded text-sm text-white hover:opacity-90 cursor-pointer w-20">
                      Editar
                    </button>
                    <button className="bg-red-500 px-3 py-1 rounded text-sm text-white hover:opacity-90 cursor-pointer w-20">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
