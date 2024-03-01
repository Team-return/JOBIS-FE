// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true, // 코드 경량화 작업에 Terser가 아닌 SWC를 사용합니다.
  images: {
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
