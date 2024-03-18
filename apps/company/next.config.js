// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  swcMinify: true, // 코드 경량화 작업에 Terser가 아닌 SWC를 사용합니다.
};

module.exports = nextConfig;
