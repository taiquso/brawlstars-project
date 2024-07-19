/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.brawlify.com",
      "cdn-old.brawlify.com",
      "cdn-fankit.brawlify.com",
      "static.wikia.nocookie.net",
    ],
  },
  output: "standalone",
};

export default nextConfig;
