export default function ButtonCheck({
  label,
  name,
  placeholder = "Selecciona tus fechas",
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group rounded-xl border border-default bg-background/50 px-4 py-3 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </label>
      <input
        type="date"
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary/70"
        required
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
}
