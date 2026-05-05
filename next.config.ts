import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Removed output: "standalone" - let @netlify/plugin-nextjs handle SSR via its own serverless handler
};

export default nextConfig;