/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // 讓 Next.js 轉換為靜態網站
    basePath: "/你的GitHubRepo名稱", // 例如 "/video-platform"
    assetPrefix: "/你的GitHubRepo名稱/",
  };
  
  module.exports = nextConfig;
  