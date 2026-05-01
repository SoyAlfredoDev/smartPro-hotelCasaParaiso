import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/admin', '/api', '/login'],
    },
    sitemap: 'https://casaparaisohotel.cl/sitemap.xml',
  };
}
