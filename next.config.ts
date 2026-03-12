import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // generates a static `out/` folder
  trailingSlash: true,   // GitHub Pages needs index.html per folder
  reactCompiler: true,
  images: {
    unoptimized: true,   // Next.js image optimisation requires a server
  },
};

export default nextConfig;
