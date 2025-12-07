import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'raw.githubusercontent.com' }],
  },
}

export default nextConfig
