import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // 启用静态导出
  images: {
    unoptimized: true, // GitHub Pages 不支持默认的图片优化
  },
  basePath: "/yangzi", // 对应你的仓库名
  assetPrefix: "/yangzi/", // 静态资源路径前缀
};

export default nextConfig;
