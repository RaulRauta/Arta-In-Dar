"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export function SanityStudio() {
  return (
    <div className="sanity-admin">
      <NextStudio config={config} />
    </div>
  );
}
