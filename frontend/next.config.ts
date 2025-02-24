import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Permite rutas compatibles
  output: "standalone", // Asegura que Next.js pueda desplegarse como un solo archivo
  eslint: {
    ignoreDuringBuilds: true, // 🔥 Desactiva ESLint en producción
  },
  experimental: {
    scrollRestoration: true, // Mejora la experiencia de navegación
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
