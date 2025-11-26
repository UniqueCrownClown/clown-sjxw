import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://image.wufazhuce.com/**')],
  },
};

export default nextConfig;
