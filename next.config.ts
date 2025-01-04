import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "letsenhance.io",
      "gratisography.com",
      "plus.unsplash.com",
      "cdn3.pixelcut.app", // Добавляем новый домен
    ],
  },
};

export default nextConfig;
