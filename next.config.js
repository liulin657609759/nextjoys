/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() { 
    return [ 
     //接口请求 前缀带上/api/
      { source: '/:path*', destination: `http://124.223.223.225:80/:path*` }, 
    ]
  },
  images: {
    domains: ["124.223.223.225"],
  },
}

module.exports = nextConfig
