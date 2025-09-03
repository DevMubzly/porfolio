import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Ensure old link path also works
      { source: "/CV.pdf", destination: "/myCV.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
