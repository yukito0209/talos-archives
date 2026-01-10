import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 如果您的仓库名是 'talos-archives' 且没有绑定自定义域名，
  // 请取消下面这行的注释，并将 '/talos-archives' 替换为您实际的仓库名：
  // basePath: '/talos-archives',
};

export default nextConfig;
