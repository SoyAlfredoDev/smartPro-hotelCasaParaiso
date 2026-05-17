import { Users, Plus, Minus, Dog, BedDouble, Baby, X } from "lucide-react";

interface ItemProps {
  title: string;
  id: string;
  icon: React.ReactNode;
  count: number;
  min: number;
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
  const items: ItemProps[] = [
    {
      title: "Adultos",
      id: "adults",
      icon: <Users size={16} className="text-primary" />,
      count: adults,
      min: 1,
    },
    {
      title: "Niños (Hasta 8 años)",
      id: "children",
      icon: <Baby size={16} className="text-primary" />,
      count: children,
      min: 0,
    },
    {
      title: "Mascotas",
      id: "pets",
      icon: <Dog size={16} className="text-primary" />,
      count: pets,
      min: 0,
    },
    {
      title: "Habitaciones",
      id: "rooms",
      icon: <BedDouble size={16} className="text-primary" />,
      count: rooms,
      min: 1,
    },
  ];

  return (
    <div className="relative flex flex-col gap-4">
      {/* Listado de Contadores */}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-primary ">Huéspedes</p>
          <button
            onClick={onClose}
            className="text-text-primary cursor-pointer hover:text-red-500"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
        {items.map((item) => (
          <CounterItem
            key={item.id}
            title={item.title}
            id={item.id}
            icon={item.icon}
            count={item.count}
            min={item.min}
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
  onChange,
}: {
  title: string;
  id: string;
  icon: React.ReactNode;
  count: number;
  min: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) => {
  const handleUpdate = (newValue: number) => {
    if (newValue < min) return;

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
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-sm font-medium text-text-primary">{title}</p>
      </div>
      <div className="flex h-9 justify-end overflow-hidden rounded-lg border border-default bg-background/50">
        <button
          type="button"
          className="flex w-9 cursor-pointer items-center justify-center border-r border-default text-text-primary transition-colors hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
          onClick={() => handleUpdate(count - 1)}
          disabled={count <= min}
        >
          <Minus size={14} />
        </button>
        <div className="flex w-8 items-center justify-center text-sm font-semibold text-text-primary">
          {count}
        </div>
        <button
          type="button"
          className="flex w-9 cursor-pointer items-center justify-center border-l border-default text-text-primary transition-colors hover:bg-surface"
          onClick={() => handleUpdate(count + 1)}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};
