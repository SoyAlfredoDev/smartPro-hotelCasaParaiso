"use client";

import Link from "next/link";
import { BedDouble, Search } from "lucide-react";

export default function CheckoutEmptyState() {
  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-default bg-surface p-10 text-center shadow-soft">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <BedDouble className="h-7 w-7 text-primary" />
      </div>
      <h2 className="font-chillax text-xl font-bold text-text-primary">
        No hay reserva en curso
      </h2>
      <p className="mt-3 text-sm text-text-secondary">
        Selecciona fechas, huéspedes y una habitación para continuar con tu
        solicitud de reserva.
      </p>
      <Link
        href="/search"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        <Search size={18} />
        Buscar habitaciones
      </Link>
    </section>
  );
}
