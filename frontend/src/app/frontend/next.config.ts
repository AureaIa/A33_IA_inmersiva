import 'dotenv/config';
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,  // Carga la variable correctamente
  },
};

export default nextConfig;
