
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
        hostname: "http://103.145.138.199/",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "http://142.93.43.249",
        pathname: "**",
      }
    ]
  }
};

export default nextConfig;
