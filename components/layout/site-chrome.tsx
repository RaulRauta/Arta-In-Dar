"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NavigationTransition } from "@/components/layout/navigation-transition";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <div className="studio-shell">{children}</div>;
  }

  return (
    <>
      <a href="#continut" className="skip-link">
        Sari la conținut
      </a>
      <SiteHeader />
      <NavigationTransition />
      <ViewTransition name="page-content" default="page-shift">
        <div id="continut">{children}</div>
      </ViewTransition>
      <SiteFooter />
    </>
  );
}
