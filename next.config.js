/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "meo.comick.pictures",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig
