import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/CV.pdf", destination: "/myCV.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
