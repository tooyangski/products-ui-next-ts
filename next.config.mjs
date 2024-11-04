/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // to disable double fetching in network tab
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
