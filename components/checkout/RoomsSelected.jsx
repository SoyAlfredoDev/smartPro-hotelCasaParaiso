"use client";

import { Calendar, Moon, Users } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";

export default function RoomsSelected() {
  const room = useBookingStore((state) => state.roomsSelected);
  const nights = useBookingStore((state) => state.nights);
  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);
  const peopleQuantity = useBookingStore((state) => state.peopleQuantity);

  console.log("room", room);
  console.log("nights", nights);
  console.log("checkIn", checkIn);
  console.log("checkOut", checkOut);
  console.log("peopleQuantity", peopleQuantity);

  if (!room) {
    return (
      <section className="overflow-hidden rounded-2xl border border-default bg-surface shadow-soft p-6">
        <p className="text-center text-text-secondary">No hay habitación seleccionada.</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-default bg-surface shadow-soft">
      <div className="border-b border-default bg-surface-warm px-6 py-4">
        <h2 className="font-chillax text-xl font-bold text-text-primary">
          Habitaciones Seleccionadas
        </h2>
      </div>
      <div className="p-6">
        <div className="flex flex-1 flex-col justify-center">
          <div className="w-full flex">
            <div className="w-full relative h-48 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64">
              <img
                src={room?.images[0]}
                alt={room?.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full flex flex-col items-end p-8">
              <h3 className="text-2xl font-bold text-text-primary">
                {room?.name}
              </h3>
              <div className="text-right">
                <span className="block text-xl font-bold text-primary">
                  {room?.price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </span>
                <span className="text-xs uppercase tracking-wide text-text-secondary">
                  por noche
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase">Fechas</span>
                <span>
                  {checkIn ? new Date(checkIn).toLocaleDateString("es-CL") : "-"} -{" "}
                  {checkOut ? new Date(checkOut).toLocaleDateString("es-CL") : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
              <Moon className="h-4 w-4 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase">
                  Duración
                </span>
                <span>{nights || 0} Noches</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
              <Moon className="h-4 w-4 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase">
                  Capacidad
                </span>
                <span>{room?.capacity} Personas</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-sm text-text-secondary">
              <Users className="h-4 w-4 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase">
                  Huéspedes
                </span>
                <span>{peopleQuantity} Personas (Adultos)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
