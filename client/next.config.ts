import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // ✅ энд таны зураг байгаа hostname
  },
};

export default nextConfig;
