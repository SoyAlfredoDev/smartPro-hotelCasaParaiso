"use client";

import Image from "next/image";
import Link from "next/link";

const stays = [
  {
    title: "Suite Urbana Premium",
    location: "Santiago Centro",
    description:
      "Espacios modernos, diseño cálido y una ubicación estratégica para descansar o moverte fácilmente por la ciudad.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    price: "Desde $89.900",
    tag: "Más reservada",
  },
  {
    title: "Loft Ejecutivo",
    location: "Providencia",
    description:
      "Ideal para viajes de trabajo o escapadas urbanas, con ambientes funcionales y una estética elegante.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    price: "Desde $94.900",
    tag: "Ubicación top",
  },
  {
    title: "Departamento Boutique",
    location: "Las Condes",
    description:
      "Una experiencia acogedora con detalles premium, perfecta para quienes buscan comodidad y estilo.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    price: "Desde $99.900",
    tag: "Recomendado",
  },
];

export default function FeaturedStaysSection() {
  return (
    <section
      id="habitaciones"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Espacios destacados
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Alojamientos diseñados para una estadía cómoda y memorable
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
              Una selección pensada para mostrar al cliente una propuesta visual
              sólida: espacios atractivos, bien presentados y con foco en
              conversión.
            </p>
          </div>

          <Link
            href="#reservar"
            className="inline-flex items-center justify-center rounded-lg border border-primary bg-primary px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary/95 hover:shadow-md active:scale-95"
          >
            Ver disponibilidad
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stays.map((stay) => (
            <article
              key={stay.title}
              className="group overflow-hidden rounded-[24px] border border-default bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="relative h-[260px] overflow-hidden">
                <Image
                  src={stay.image}
                  alt={stay.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

                <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                  {stay.tag}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-secondary">
                      {stay.location}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-text-primary">
                      {stay.title}
                    </h3>
                  </div>

                  <span className="whitespace-nowrap rounded-full bg-background px-3 py-1 text-sm font-semibold text-primary">
                    {stay.price}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  {stay.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="#reservar"
                    className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md active:scale-[0.97]"
                  >
                    Reservar
                  </Link>

                  <Link
                    href="#contacto"
                    className="group flex items-center text-sm font-medium text-primary transition-all duration-200 hover:text-primary/80"
                  >
                    Ver detalles
                    <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
