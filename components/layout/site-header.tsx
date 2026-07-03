"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-data";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-cream">
      <div className="shell flex h-24 items-center justify-between">
        <Logo light />
        <nav aria-label="Navigație principală" className="hidden items-center gap-6 xl:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-xs font-semibold uppercase tracking-[0.12em]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/implica-te#doneaza" className="button-outline hidden lg:inline-flex xl:hidden 2xl:inline-flex">Donează</Link>
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" className="grid size-11 place-items-center rounded-full border border-cream/35 xl:hidden">
          <span className="sr-only">Deschide meniul</span><MenuIcon className="size-6" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 bg-ink p-6 text-cream">
            <div className="mx-auto flex max-w-7xl items-center justify-between"><Logo light /><button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-cream/30"><span className="sr-only">Închide meniul</span><CloseIcon className="size-6" /></button></div>
            <nav className="mx-auto mt-14 flex max-w-7xl flex-col" aria-label="Navigație mobilă">
              {navigation.map((item, index) => <motion.div key={item.href} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.04 }}><Link onClick={() => setOpen(false)} href={item.href} className="block border-b border-cream/15 py-3 font-display text-[clamp(2rem,8vw,4.5rem)] leading-none">{item.label}</Link></motion.div>)}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
