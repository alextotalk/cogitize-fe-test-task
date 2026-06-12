/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config = () => {
  /** @type {import('next').NextConfig} */
  const config = {
    redirects: async () => {
      return [
        {
          source: "/",
          destination: "/guide",
          permanent: true,
        },
      ];
    },
    // api.miex.one does not send Access-Control-Allow-Origin, so the assets
    // API is proxied through the app origin (devgateway allows CORS directly).
    rewrites: async () => {
      return [
        {
          source: "/api/miex/:path*",
          destination: "https://api.miex.one/api/v1/public/:path*",
        },
      ];
    },
    env: {},
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },
  };

  return withNextIntl(config);
};

export default config;
