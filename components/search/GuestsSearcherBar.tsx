import { Users, Plus, Minus, Dog, BedDouble, Baby, X } from "lucide-react";
import {
  MAX_GUESTS,
  MAX_ROOMS,
  MIN_ADULTS,
  MIN_ROOMS,
  getTotalGuests,
} from "@/lib/validation/searchReservation";

interface ItemProps {
  title: string;
  id: string;
  icon: React.ReactNode;
  count: number;
  min: number;
  max: number;
}

export default function GuestsSearcherBar({
  adults,
  children,
  pets,
  rooms,
  onChange,
  onClose,
}: {
  adults: number;
  children: number;
  pets: number;
  rooms: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onClose: () => void;
}) {
  const totalGuests = getTotalGuests(adults, children);

  const items: ItemProps[] = [
    {
      title: "Adultos",
      id: "adults",
      icon: <Users size={16} className="text-primary" />,
      count: adults,
      min: MIN_ADULTS,
      max: MAX_GUESTS,
    },
    {
      title: "Niños (Hasta 8 años)",
      id: "children",
      icon: <Baby size={16} className="text-primary" />,
      count: children,
      min: 0,
      max: MAX_GUESTS,
    },
    {
      title: "Mascotas",
      id: "pets",
      icon: <Dog size={16} className="text-primary" />,
      count: pets,
      min: 0,
      max: MAX_GUESTS,
    },
    {
      title: "Habitaciones",
      id: "rooms",
      icon: <BedDouble size={16} className="text-primary" />,
      count: rooms,
      min: MIN_ROOMS,
      max: MAX_ROOMS,
    },
  ];

  return (
    <div className="relative flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-primary">Huéspedes</p>
          <button
            onClick={onClose}
            className="cursor-pointer text-text-primary hover:text-red-500"
            type="button"
            aria-label="Cerrar selector de huéspedes"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          {totalGuests} de {MAX_GUESTS} huéspedes (adultos + niños)
        </p>
        {items.map((item) => (
          <CounterItem
            key={item.id}
            title={item.title}
            id={item.id}
            icon={item.icon}
            count={item.count}
            min={item.min}
            max={item.max}
            adults={adults}
            childrenCount={children}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

const CounterItem = ({
  title,
  id,
  icon,
  count,
  min,
  max,
  adults,
  childrenCount,
  onChange,
}: {
  title: string;
  id: string;
  icon: React.ReactNode;
  count: number;
  min: number;
  max: number;
  adults: number;
  childrenCount: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) => {
  const canIncrement = () => {
    if (count >= max) return false;
    if (id === "rooms") return count < MAX_ROOMS;
    if (id === "pets") return true;
    const nextTotal =
      id === "adults"
        ? adults + 1 + childrenCount
        : adults + childrenCount + 1;
    return nextTotal <= MAX_GUESTS;
  };

  const handleUpdate = (newValue: number) => {
    if (newValue < min || newValue > max) return;
    if (id === "adults" || id === "children") {
      const nextAdults = id === "adults" ? newValue : adults;
      const nextChildren = id === "children" ? newValue : childrenCount;
      if (getTotalGuests(nextAdults, nextChildren) > MAX_GUESTS) return;
      if (nextAdults < MIN_ADULTS) return;
    }
    if (id === "rooms" && (newValue < MIN_ROOMS || newValue > MAX_ROOMS)) {
      return;
    }

    const event = {
      target: {
        name: id,
        value: String(newValue),
        type: "number",
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-sm font-medium text-text-primary">{title}</p>
      </div>
      <div className="flex h-9 justify-end overflow-hidden rounded-lg border border-default bg-background/50">
        <button
          type="button"
          className="flex w-9 cursor-pointer items-center justify-center border-r border-default text-text-primary transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          onClick={() => handleUpdate(count - 1)}
          disabled={count <= min}
          aria-label={`Reducir ${title}`}
        >
          <Minus size={14} />
        </button>
        <div
          className="flex w-8 items-center justify-center text-sm font-semibold text-text-primary"
          aria-live="polite"
        >
          {count}
        </div>
        <button
          type="button"
          className="flex w-9 cursor-pointer items-center justify-center border-l border-default text-text-primary transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          onClick={() => handleUpdate(count + 1)}
          disabled={!canIncrement()}
          aria-label={`Aumentar ${title}`}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};
