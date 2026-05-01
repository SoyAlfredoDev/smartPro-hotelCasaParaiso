import { Metadata } from "next";
import rooms from "@/public/assets/rooms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const roomData = rooms.find((r) => r.id === resolvedParams.id);

  if (!roomData) {
    return {
      title: "Habitación no encontrada",
    };
  }

  return {
    title: `${roomData.name}`,
    description: roomData.description.substring(0, 160),
    openGraph: {
      title: `${roomData.name} | Casa Paraíso Hotel`,
      description: roomData.description.substring(0, 160),
      images: [
        {
          url: roomData.images[0] || "/images/logo-hotel-casa-paraiso.png",
          width: 800,
          height: 600,
          alt: roomData.name,
        },
      ],
    },
    alternates: {
      canonical: `/room/${resolvedParams.id}`,
    },
  };
}

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
