export default function Badge({
  text,
  dark = false,
}: {
  text: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-inter text-[11px] font-bold uppercase tracking-widest backdrop-blur-md transition-colors ${
        dark
          ? "border-[#8fa89e]/40 bg-[#8fa89e]/15 text-[#2f5d50]" // Variante para fondos claros (Gris/Blanco)
          : "border-white/30 bg-white/10 text-white" // Variante para fondos oscuros (Verde Primary)
      }`}
    >
      {text}
    </span>
  );
}
