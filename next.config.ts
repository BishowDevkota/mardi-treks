/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export for shared hosting
  reactStrictMode: true, // Enables strict mode for better error handling
  images: {
    // Configure domains for WordPress media (e.g., images)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marditreks.com", // Your WordPress domain
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Optimize images for static export
    unoptimized: true, // Required for static export to avoid Image Optimization API
  },
  trailingSlash: true, // Keep for WordPress-style URLs
  typescript: {
    ignoreBuildErrors: false, // Enforce type checking
  },
  eslint: {
    ignoreDuringBuilds: false, // Enforce linting
  },
  // Remove caching headers for static sites (not needed on shared hosting)
  async headers() {
    return [];
  },
  // Disable experimental features for stability
  experimental: {
    // turbo: true, // Commented out as Turbopack is experimental
  },
};

export default nextConfig;