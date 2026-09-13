import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.schoolrave.net",
        pathname: "/cdn-cgi/image/**",
      },
    ],
  },
};

export default nextConfig;
