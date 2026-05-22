"use client";

import { MapPin, Bed, Utensils, User, type LucideIcon } from "lucide-react";

const features = [
  {
    id: 1,
    icon: MapPin,
    title: "Ubicación estratégica",
    description: "Fácil acceso a los principales puntos de la ciudad.",
  },
  {
    id: 2,
    icon: Bed,
    title: "Habitaciones cómodas",
    description: "Espacios modernos y acogedores para tu descanso.",
  },
  {
    id: 3,
    icon: Utensils,
    title: "Restaurant en el hotel",
    description: "Disfruta de nuestra cocina turca e internacional.",
  },
  {
    id: 4,
    icon: User,
    title: "Atención personalizada",
    description: "Nos enfocamos en que tu experiencia sea única.",
  },
];

export default function FeaturesCardSection() {
  return (
    <section className="px-4 pb-24 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-[16px] font-medium uppercase tracking-[0.2em] text-gray-500">
            HOTEL CASA PARAÍSO
          </p>
          <div className="mx-auto mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent" />
          <h1 className="mt-6 font-chillax text-4xl font-bold tracking-tight text-[#2b2b2b] sm:text-5xl lg:text-6xl">
            Todo lo que buscas en {" "}
            <span className="bg-gradient-to-r from-[#2f5d50] to-[#8fa89e] bg-clip-text text-transparent">una estadía</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-inter text-[16px] leading-[1.8] text-[#6f6f6f]">
            Ubicación estratégica, habitaciones cómodas, restaurant y atención
            personalizada en un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="  rounded-xl border border-gray-100/80 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      
      
      <div className="flex">
        <div className="w-1/3">
        <Icon className="h-10 w-10 text-[#2f5d50] " strokeWidth={2.5} />

        </div>
        <div className="w-2/3">
      
        <h3 className="text-[16px] font-bold leading-snug tracking-tight text-gray-800">
          {title}
        </h3>

        </div>
      </div>
        
      
      <div className="w-full mt-6">
       <p className="text-sm leading-relaxed text-gray-500">{description}</p>

      </div>
      
      
    
    </div>
  );
}
