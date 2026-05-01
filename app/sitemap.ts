import { MetadataRoute } from 'next';
import rooms from "@/public/assets/rooms";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://casaparaisohotel.cl';

  const roomUrls = rooms.map((room) => ({
    url: `${baseUrl}/room/${room.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    ...roomUrls,
  ];
}
