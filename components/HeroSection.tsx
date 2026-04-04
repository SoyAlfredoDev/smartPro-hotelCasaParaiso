"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background ">
      <div className="mx-auto w-full">
        <div className="overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] h-[560px] lg:h-[620px]  ">
          <div className="relative">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

            {/* Content */}
            <div className="relative mx-auto mb-100 max-w-7xl z-10 flex min-h-[560px] items-center px-6 py-10 sm:px-8 lg:min-h-[620px] lg:px-12">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                  Estadía boutique en Santiago
                </span>

                <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Bienvenido a tu hogar en Santiago
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base">
                  Descubre una experiencia cálida, elegante y cómoda en una
                  ubicación estratégica para disfrutar la ciudad, descansar y
                  vivir una estadía con identidad local.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#reservar"
                    className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                  >
                    Reservar ahora
                  </Link>

                  <Link
                    href="#ubicaciones"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
                  >
                    Ver ubicaciones
                  </Link>
                </div>
              </div>
            </div>

            {/* Search box */}
            <div className="absolute mx-auto max-w-7xl bottom-[-20px] left-0 right-0 z-20 px-6 pb-4 sm:px-8 sm:pb-8 lg:px-12">
              <div className="mx-auto w-full rounded-2xl border border-default bg-surface p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <form className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {/* Destino */}
                  <div className="rounded-xl border border-default bg-surface px-4 py-3">
                    <label className="mb-1 block text-xs font-medium text-text-secondary">
                      Destino
                    </label>
                    <select className="w-full bg-transparent text-sm font-medium text-text-primary outline-none">
                      <option>Santiago Centro</option>
                      <option>San Miguel</option>
                      <option>República</option>
                    </select>
                  </div>

                  {/* Huéspedes */}
                  <div className="rounded-xl border border-default bg-surface px-4 py-3">
                    <label className="mb-1 block text-xs font-medium text-text-secondary">
                      Huéspedes
                    </label>
                    <select className="w-full bg-transparent text-sm font-medium text-text-primary outline-none">
                      <option>2 huéspedes</option>
                      <option>1 huésped</option>
                      <option>3 huéspedes</option>
                      <option>4 huéspedes</option>
                    </select>
                  </div>

                  {/* Fechas */}
                  <div className="rounded-xl border border-default bg-surface px-4 py-3">
                    <label className="mb-1 block text-xs font-medium text-text-secondary">
                      Fechas
                    </label>
                    <input
                      type="text"
                      placeholder="Selecciona tus fechas"
                      className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="inline-flex min-h-[64px] items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                  >
                    Consultar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
