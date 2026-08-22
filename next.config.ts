import type { NextConfig } from "next";

function getSiteOrigin() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.asociatiaartaindar.ro";

  try {
    return new URL(rawUrl).origin;
  } catch {
    return "https://www.asociatiaartaindar.ro";
  }
}

const siteOrigin = getSiteOrigin();

const securityHeaders = [
  {
    key: "Access-Control-Allow-Origin",
    value: siteOrigin,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "style-src-attr 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io",
      "font-src 'self' data:",
      "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io",
      "media-src 'self' https://cdn.sanity.io",
      "worker-src 'self' blob:",
      "frame-src https://www.google.com https://maps.google.com",
      "child-src https://www.google.com https://maps.google.com",
      "manifest-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const sanityStudioSecurityHeaders = [
  ...securityHeaders.filter(
    (header) =>
      ![
        "Content-Security-Policy",
        "X-Frame-Options",
        "Cross-Origin-Opener-Policy",
        "Cross-Origin-Resource-Policy",
      ].includes(header.key),
  ),
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self' https: data: blob:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline' https:",
      "style-src-attr 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss:",
      "worker-src 'self' blob:",
      "frame-src 'self' https:",
      "child-src 'self' https:",
      "manifest-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/studio/:path*",
        headers: sanityStudioSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
