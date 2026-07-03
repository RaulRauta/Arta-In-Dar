"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-data";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeArt, setActiveArt] = useState<(typeof navigation)[number] | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-cream">
      <div className="shell flex h-18 items-center justify-between">
        <Logo light />
        <nav onMouseLeave={() => setActiveArt(null)} aria-label="Navigație principală" className="hidden items-center gap-3 lg:flex xl:gap-5 2xl:gap-7">
          {navigation.map((item) => (
            <Link onMouseEnter={() => setActiveArt(item)} onFocus={() => setActiveArt(item)} key={item.href} href={item.href} className="nav-link whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.08em] xl:text-[9px] xl:tracking-[0.1em] 2xl:text-[10px]">
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" className="menu-trigger group lg:hidden">
          <span className="hidden text-[9px] font-bold uppercase tracking-[.25em] sm:block">Meniu</span>
          <span className="menu-trigger__mark"><MenuIcon className="size-7 transition-transform duration-500 group-hover:rotate-6" /></span>
          <span className="sr-only">Deschide meniul</span>
        </button>
      </div>
      <AnimatePresence>
        {activeArt && (
          <motion.div key={activeArt.href} initial={{ opacity: 0, y: -8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }} className={`art-preview art-preview--${activeArt.art}`}>
            <div className="art-preview__scene" aria-hidden="true"><span className="art-piece art-piece--one" /><span className="art-piece art-piece--two" /><span className="art-piece art-piece--three" /><span className="art-piece art-piece--four" /></div>
            <div className="art-preview__copy"><span>{activeArt.kicker}</span><strong>{activeArt.label}</strong><p>{activeArt.story}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 overflow-x-hidden overflow-y-auto bg-cream p-5 text-ink sm:p-8"
          >
            <div className="menu-orbit menu-orbit--one" />
            <div className="menu-orbit menu-orbit--two" />
            <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="menu-close group">
                <span className="hidden text-[9px] font-bold uppercase tracking-[.25em] sm:block">Închide</span>
                <span className="grid size-11 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-90"><CloseIcon className="size-5" /></span>
                <span className="sr-only">Închide meniul</span>
              </button>
            </div>
            <nav className="relative z-10 mx-auto mt-10 flex max-w-7xl flex-col sm:mt-14" aria-label="Navigație mobilă">
              {navigation.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.055, duration: 0.5 }}>
                  <Link onClick={() => setOpen(false)} href={item.href} className={`menu-item menu-item--${item.art} group`}>
                    <span className="menu-item__number">0{index + 1}</span>
                    <span className="menu-item__label">{item.label}</span>
                    <span className="menu-item__dot" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative z-10 mx-auto mt-8 flex max-w-7xl items-center justify-between border-t border-ink/15 pt-5 text-[8px] font-bold uppercase tracking-[.18em] text-ink/50 sm:text-[9px]">
              <span>Artă · Comunitate · Patrimoniu</span>
              <span className="font-display text-xl font-normal normal-case italic text-terracotta sm:text-2xl">Arta ne unește.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
