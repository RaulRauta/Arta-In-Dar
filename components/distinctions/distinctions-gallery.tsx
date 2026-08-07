"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Distinction } from "@/lib/distinctions";

type DistinctionsGalleryProps = {
  distinctions: Distinction[];
  emptyTitle: string;
  emptyDescription: string;
};

function DistinctionPlaceholder() {
  return (
    <div className="distinction-card__placeholder" aria-hidden="true">
      <span />
      <i />
    </div>
  );
}

export function DistinctionsGallery({
  distinctions,
  emptyTitle,
  emptyDescription,
}: DistinctionsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : distinctions[activeIndex];
  const distinctionsCount = distinctions.length;

  useEffect(() => {
    if (activeIndex === null || distinctionsCount === 0) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % distinctionsCount,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + distinctionsCount) % distinctionsCount,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, distinctionsCount]);

  const changeDistinction = (direction: -1 | 1) => {
    if (distinctionsCount === 0) return;

    setActiveIndex((current) =>
      current === null
        ? 0
        : (current + direction + distinctionsCount) % distinctionsCount,
    );
  };

  if (distinctionsCount === 0) {
    return (
      <section className="distinctions-gallery" aria-label="Galeria distincțiilor">
        <div className="shell">
          <div className="distinctions-empty">
            <p className="eyebrow text-gold">În pregătire</p>
            <h2>{emptyTitle}</h2>
            <p>{emptyDescription}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="distinctions-gallery" aria-label="Galeria distincțiilor">
      <div className="shell distinctions-gallery__grid">
        {distinctions.map((item, index) => (
          <motion.button
            type="button"
            key={item.id}
            className={`distinction-card distinction-card--button distinction-card--${item.tone}`}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: (index % 4) * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, rotate: index % 2 ? 0.2 : -0.2 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setActiveIndex(index)}
            aria-label={`Deschide prezentarea distincției ${item.title}`}
          >
            <div className="distinction-card__plate">
              <span>{item.year}</span>
              <h2>{item.title}</h2>
              {item.category && <p>{item.category}</p>}
            </div>
            <div className="distinction-card__image">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 42vw"
                  className="object-contain"
                />
              ) : (
                <DistinctionPlaceholder />
              )}
            </div>
            <div className="distinction-card__copy">
              <span className="distinction-card__open">
                <i aria-hidden="true" />
                Vezi povestea
                <b>↗</b>
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            className="distinction-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="distinction-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="distinction-modal__backdrop"
              onClick={() => setActiveIndex(null)}
              aria-label="Închide prezentarea distincției"
            />
            <motion.div
              className="distinction-modal__sheet"
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="distinction-modal__bar">
                <span>
                  Distincția {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {distinctionsCount}
                </span>
                <strong>Registru de onoare</strong>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Închide"
                >
                  ×
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="distinction-modal__content"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="distinction-modal__image">
                    {active.image ? (
                      <Image
                        src={active.image}
                        alt={active.imageAlt || active.title}
                        fill
                        sizes="(max-width: 900px) 92vw, 46vw"
                        className="object-contain"
                      />
                    ) : (
                      <DistinctionPlaceholder />
                    )}
                  </div>
                  <div className="distinction-modal__copy">
                    <p>
                      {active.year}
                      {active.category ? ` · ${active.category}` : ""}
                    </p>
                    <h3 id="distinction-modal-title">{active.title}</h3>
                    <div className="distinction-modal__rule">
                      <span />
                    </div>
                    {active.description ? (
                      <div className="distinction-modal__description">
                        {active.description.split(/\n+/).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="distinction-modal__description">
                        Povestea acestei distincții va prinde contur în curând.
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <nav
                className="distinction-modal__nav"
                aria-label="Navigare între distincții"
              >
                <button type="button" onClick={() => changeDistinction(-1)}>
                  <span>←</span>
                  <small>Distincția precedentă</small>
                </button>
                <i />
                <button type="button" onClick={() => changeDistinction(1)}>
                  <small>Distincția următoare</small>
                  <span>→</span>
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
