import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 只有在生产环境构建时才启用 basePath 和 assetPrefix
  basePath: isProd ? "/yangzi" : "",
  assetPrefix: isProd ? "/yangzi/" : "",
};

export default nextConfig;
