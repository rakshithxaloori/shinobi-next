/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shinobi.cc", "lh3.googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_CI_CD_STAGE: process.env.NEXT_PUBLIC_CI_CD_STAGE,
    NEXT_PUBLIC_BASE_API_ENDPOINT: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT,
    NEXT_PUBLIC_API_KEY: process.env.process,

    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    NEXT_PUBLIC_DISCORD_INVITE_LINK:
      process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK,
    NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
};

module.exports = nextConfig;
