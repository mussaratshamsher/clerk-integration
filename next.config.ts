import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {  
    domains: ['fakestoreapi.com', 'cdn.sanity.io'], // Allow images from this domain  
  }, 
};

export default nextConfig;
