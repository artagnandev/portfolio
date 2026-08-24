import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async redirects() {
    // Raiz vai para o locale padrão. 307 (não permanente) para permitir
    // trocar o padrão no futuro sem lidar com cache de 308 nos navegadores.
    return [{ source: "/", destination: "/pt", permanent: false }];
  },
};

export default nextConfig;
