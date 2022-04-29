/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() { 
    return [ 
     //接口请求 前缀带上/api/
      { source: '/api/:path*', destination: `http://124.223.223.225:80/api/:path*` }, 
    ]
  },
}

module.exports = nextConfig
