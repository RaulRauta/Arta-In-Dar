import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Asociația Arta în dar — Munca voluntară, arta la țară",
    template: "%s | Arta în dar",
  },
  description:
    "Asociația Arta în dar aduce împreună arta, voluntariatul, patrimoniul local și comunitățile prin proiecte culturale vii.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Arta în dar",
    "Arta în dar",
    "voluntariat",
    "patrimoniu local",
    "turism cultural",
    "proiecte culturale",
  ],
  verification: {
    google: "xMR4F3HvjUrOxp71u4syypuxFOiOA0Wp63Exw2jJFO8",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Arta în dar",
    title: "Asociația Arta în dar — Munca voluntară, arta la țară",
    description: "Artă, patrimoniu și oameni care construiesc împreună.",
    images: [
      {
        url: "/images/share/arta-in-dar-link-preview.png",
        width: 1200,
        height: 630,
        alt: "Comunitatea Arta în dar creează împreună",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AsociaÈ›ia Arta Ã®n dar â€” Munca voluntarÄƒ, arta la È›arÄƒ",
    description: "ArtÄƒ, patrimoniu È™i oameni care construiesc Ã®mpreunÄƒ.",
    images: ["/images/share/arta-in-dar-link-preview.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D241F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <SpeedInsights />
      </body>
    </html>
  );
}
