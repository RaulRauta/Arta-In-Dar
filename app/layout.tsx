import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin", "latin-ext"], display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://artaindar.ro"),
  title: { default: "Arta în Dar — Arta ne unește", template: "%s | Arta în Dar" },
  description: "Asociația Arta în Dar aduce împreună arta, voluntariatul, patrimoniul local și comunitățile prin proiecte culturale vii.",
  keywords: ["Arta în Dar", "asociație culturală", "voluntariat", "patrimoniu local", "turism cultural", "proiecte culturale"],
  openGraph: { type: "website", locale: "ro_RO", siteName: "Arta în Dar", title: "Arta în Dar — Arta ne unește", description: "Artă, patrimoniu și oameni care construiesc împreună.", images: [{ url: "/images/hero-arta-in-dar.png", width: 1536, height: 1024, alt: "Comunitatea Arta în Dar creează împreună" }] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2D241F" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ro" className={`${display.variable} ${sans.variable}`}><body><a href="#continut" className="skip-link">Sari la conținut</a><SiteHeader /><div id="continut">{children}</div><SiteFooter /></body></html>;
}
