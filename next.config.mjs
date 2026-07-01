/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js app router cannot have a folder literally named "index"
  // (https://github.com/vercel/next.js/issues/69061). The route lives at
  // app/index-hub and is rewritten back to the public /index URL here.
  async rewrites() {
    return [
      { source: '/index', destination: '/index-hub' },
      { source: '/index/:path*', destination: '/index-hub/:path*' },
    ];
  },
  async redirects() {
    return [
      { source: '/team', destination: '/contact#team', permanent: false },
      { source: '/principles', destination: '/responsible-ai', permanent: false },
    ];
  },
};

export default nextConfig;
