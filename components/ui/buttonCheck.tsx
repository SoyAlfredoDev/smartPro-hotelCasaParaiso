import { Calendar } from "lucide-react";

function formatDisplayDate(isoDate: string | null) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

export default function ButtonCheck({
  label,
  name,
  placeholder = "Selecciona tus fechas",
  value,
  onChange,
  className = "",
  min,
  max,
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
}) {
  return (
    <div
      className={`group flex h-full min-h-[72px] flex-col justify-center border-b border-gray-200 px-5 py-4 lg:border-b-0 ${className}`}
    >
      <label
        htmlFor={name}
        className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400"
      >
        {label}
      </label>
      <div className="relative flex items-center justify-between gap-2">
        <span
          className="text-sm font-semibold text-gray-900"
          suppressHydrationWarning
        >
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <Calendar
          className="h-4 w-4 shrink-0 text-gray-400"
          strokeWidth={1.5}
          aria-hidden
        />
        <input
          id={name}
          type="date"
          name={name}
          className="absolute inset-0 cursor-pointer opacity-0"
          required
          value={value || ""}
          min={min}
          max={max}
          onChange={onChange}
          aria-label={label}
        />
      </div>
    </div>
  );
}
