import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Permite que las rutas sean compatibles en Vercel
  output: "standalone", // Para asegurar que Next.js maneje correctamente la compilación
  experimental: {
    scrollRestoration: true, // Mejora la experiencia de usuario en cambios de página
  },
};

export default nextConfig;
