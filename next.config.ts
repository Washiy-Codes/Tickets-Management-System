import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    clientRouterFilter: true,
    optimizePackageImports: [
      'lucide-react', 
      'react-icons',
    ],
  }
};

export default nextConfig;
