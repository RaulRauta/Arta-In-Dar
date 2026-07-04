"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sculptures } from "@/lib/sculpture-data";

export function SculptureGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : sculptures[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? 0 : (current + 1) % sculptures.length);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? 0 : (current - 1 + sculptures.length) % sculptures.length);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeIndex]);

  const changeSculpture = (direction: -1 | 1) => {
    setActiveIndex((current) => current === null ? 0 : (current + direction + sculptures.length) % sculptures.length);
  };

  return <section className="sculpture-gallery" id="galerie-sculpturi">
    <div className="shell">
      <div className="sculpture-gallery__heading">
        <div><p className="eyebrow text-gold">Mini-galerie · 29 de lucrări</p><h2>Sculpturi și artiști<br /><em>pe traseu.</em></h2></div>
        <p>O galerie în aer liber, ridicată din lemn, metal, imaginație și muncă împreună. Selectează o lucrare pentru a-i deschide fișa, fără să pierzi locul în galerie.</p>
      </div>
      <div className="sculpture-gallery__grid">
        {sculptures.map((sculpture,index)=><motion.button type="button" whileHover={{ y: -6 }} key={`${sculpture.title}-${sculpture.artist}`} className="sculpture-card sculpture-card--button" onClick={() => setActiveIndex(index)} aria-label={`Deschide fișa lucrării ${sculpture.title}`}>
          <div className="sculpture-card__image"><Image src={sculpture.image} alt={`${sculpture.title}, de ${sculpture.artist}`} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw" className="object-cover" /><span>{String(index+1).padStart(2,"0")}</span><i>Vezi fișa</i></div>
          <div className="sculpture-card__caption"><p>{sculpture.artist}</p><h3>{sculpture.title}</h3><span className="sculpture-card__open">Deschide povestea <b>↗</b></span></div>
        </motion.button>)}
      </div>
    </div>

    <AnimatePresence>
      {active && activeIndex !== null && <motion.div className="sculpture-modal" role="dialog" aria-modal="true" aria-labelledby="sculpture-modal-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button type="button" className="sculpture-modal__backdrop" onClick={() => setActiveIndex(null)} aria-label="Închide fișa sculpturii" />
        <motion.div className="sculpture-modal__sheet" initial={{ opacity: 0, y: 35, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .35, ease: [0.22,1,0.36,1] }}>
          <div className="sculpture-modal__bar">
            <span>Fișa {String(activeIndex+1).padStart(2,"0")} / {sculptures.length}</span>
            <strong>Galeria traseului</strong>
            <button type="button" onClick={() => setActiveIndex(null)} aria-label="Închide">×</button>
          </div>
          <div className="sculpture-modal__content">
            <div className="sculpture-modal__image"><Image src={active.image} alt={`${active.title}, de ${active.artist}`} fill sizes="(max-width: 900px) 92vw, 48vw" className="object-cover" /></div>
            <div className="sculpture-modal__copy"><p>{active.artist}</p><h3 id="sculpture-modal-title">{active.title}</h3><div className="sculpture-modal__rule"><span /></div><p className="sculpture-modal__description">{active.description}</p></div>
          </div>
          <nav className="sculpture-modal__nav" aria-label="Navigare între sculpturi">
            <button type="button" onClick={() => changeSculpture(-1)}><span>←</span><small>Lucrarea precedentă</small></button>
            <i />
            <button type="button" onClick={() => changeSculpture(1)}><small>Lucrarea următoare</small><span>→</span></button>
          </nav>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </section>;
}
