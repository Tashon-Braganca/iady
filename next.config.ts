import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // For rapid prototyping, allows build even if strict types fail
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
