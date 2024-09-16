/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: '192.168.10.18',
        
          },
          {
            protocol: 'http',
            hostname: 'i.ibb.co',
        
          },
        ],
      },
};

export default nextConfig;
