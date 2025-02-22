import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Permite rutas compatibles con Vercel
  output: "standalone", // Asegura que Next.js maneje correctamente el despliegue
  eslint: {
    ignoreDuringBuilds: true, // 🔥 Desactiva ESLint en Vercel para evitar bloqueos
  },
  experimental: {
    scrollRestoration: true, // Mejora la experiencia de usuario
  },
};

export default nextConfig;
