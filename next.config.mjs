/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    GITHUB_APP_CLIENT_ID: "Ov23liN0E2lZcVh4Mj4q",
    GITHUB_APP_CLIENT_SECRET: "ce27d99ec9427a21b7b7dd7e4b6b6000adf072bb",
    NEXTAUTH_SECRET: "PFhGNgWQ6amoF9UVdCCiJ7iz12oxyWcKk1bA1Z6Uk4A=",
  },
};

export default nextConfig;
