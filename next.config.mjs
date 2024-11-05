
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    remotePatterns: [ 
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "http://192.168.10.102",
        pathname: "**",
      }
    ]
  }
};

export default nextConfig;
