import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Permite que las rutas sean compatibles con Vercel
  output: "standalone", // Asegura que Next.js maneje correctamente el despliegue
  experimental: {
    scrollRestoration: true, // Mejora la experiencia de usuario
  },
};

export default nextConfig;
