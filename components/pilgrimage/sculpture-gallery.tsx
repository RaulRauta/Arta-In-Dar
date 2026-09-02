"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  PilgrimageArtwork,
  PilgrimageArtworkGalleryPreset,
  PilgrimageArtworkImage,
} from "@/lib/pilgrimage-artworks";

type SculptureGalleryProps = {
  artworks: PilgrimageArtwork[];
};

type ArtworkGallerySectionProps = {
  artworks: PilgrimageArtwork[];
  title: string;
  eyebrow: string;
  description: string;
  emptyTitle: string;
};

function artworkTypeLabel(type: PilgrimageArtwork["type"]) {
  if (type === "basorelief") return "Basorelief";
  if (type === "picturaMurala") return "Pictură murală";

  return "Sculptură";
}

function ArtworkPlaceholder() {
  return (
    <div className="sculpture-card__placeholder" aria-hidden="true">
      <span />
      <i />
      <b />
    </div>
  );
}

function getArtworkImages(artwork: PilgrimageArtwork) {
  const mainImage = artwork.image
    ? [
        {
          _key: `${artwork.id}-main`,
          url: artwork.image,
          alt: artwork.imageAlt || `${artwork.title}, de ${artwork.artist}`,
        },
      ]
    : [];

  return [...mainImage, ...(artwork.gallery || [])]
    .filter(
      (image): image is PilgrimageArtworkImage & { url: string } =>
        Boolean(image.url),
    )
    .slice(0, 7);
}

function getGalleryPreset(
  count: number,
  selected?: PilgrimageArtworkGalleryPreset,
) {
  if (selected && selected !== "auto") return selected;
  if (count <= 2) return "duo";
  if (count === 3) return "triptych";
  if (count === 4) return "quad";
  if (count === 5) return "mosaicFive";
  if (count === 6) return "mosaicSix";

  return "mosaicSeven";
}

function ArtworkModalImages({ artwork }: { artwork: PilgrimageArtwork }) {
  const images = getArtworkImages(artwork);

  if (images.length === 0) {
    return (
      <div className="sculpture-modal__image">
        <ArtworkPlaceholder />
      </div>
    );
  }

  if (images.length === 1) {
    const image = images[0];

    return (
      <div className="sculpture-modal__image">
        <Image
          src={image.url}
          alt={image.alt || `${artwork.title}, de ${artwork.artist}`}
          fill
          sizes="(max-width: 900px) 92vw, 48vw"
          className="object-cover"
        />
      </div>
    );
  }

  const preset = getGalleryPreset(images.length, artwork.galleryPreset);

  return (
    <div className="sculpture-modal__image sculpture-modal__image--mosaic">
      <div
        className={`sculpture-modal__mosaic sculpture-modal__mosaic--${preset}`}
        aria-label={`Galerie cu ${images.length} imagini pentru ${artwork.title}`}
      >
        {images.map((image, index) => (
          <figure
            className={`sculpture-modal__tile sculpture-modal__tile--${
              index + 1
            }`}
            key={image._key || `${image.url}-${index}`}
          >
            <Image
              src={image.url}
              alt={image.alt || `${artwork.title}, de ${artwork.artist}`}
              fill
              sizes="(max-width: 799px) 86vw, (max-width: 1100px) 48vw, 38vw"
              className="object-cover"
            />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

function ArtworkGallerySection({
  artworks,
  title,
  eyebrow,
  description,
  emptyTitle,
}: ArtworkGallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const active = activeIndex === null ? null : artworks[activeIndex];
  const artworksCount = artworks.length;
  const visibleArtworks = showAll ? artworks : artworks.slice(0, 8);
  const hasHiddenArtworks = artworksCount > visibleArtworks.length;

  useEffect(() => {
    if (activeIndex === null || artworksCount === 0) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % artworksCount,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? 0 : (current - 1 + artworksCount) % artworksCount,
        );
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeIndex, artworksCount]);

  const changeArtwork = (direction: -1 | 1) => {
    if (artworksCount === 0) return;

    setActiveIndex((current) =>
      current === null ? 0 : (current + direction + artworksCount) % artworksCount,
    );
  };

  return (
    <div className="sculpture-gallery__section">
        <div className="sculpture-gallery__heading">
          <div>
            <p className="eyebrow text-gold">{eyebrow}</p>
            <h2>
              {title}
              <br />
              <em>pe traseu.</em>
            </h2>
          </div>
          <p>{description}</p>
        </div>

        {artworksCount > 0 ? (
          <div className="sculpture-gallery__grid">
            {visibleArtworks.map((artwork, index) => (
              <motion.button
                type="button"
                initial={false}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.62,
                  delay: (index % 6) * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, rotate: index % 2 ? 0.25 : -0.25 }}
                whileTap={{ scale: 0.985 }}
                key={artwork.id}
                className="sculpture-card sculpture-card--button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Deschide povestea lucrării ${artwork.title}`}
              >
                <div className="sculpture-card__image">
                  {artwork.image ? (
                    <Image
                      src={artwork.image}
                      alt={
                        artwork.imageAlt ||
                        `${artwork.title}, de ${artwork.artist}`
                      }
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                      className="object-cover"
                    />
                  ) : (
                    <ArtworkPlaceholder />
                  )}
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i>{artworkTypeLabel(artwork.type)}</i>
                </div>
                <div className="sculpture-card__caption">
                  <p>{artwork.artist}</p>
                  <h3>{artwork.title}</h3>
                  <span className="sculpture-card__open">
                    Deschide povestea <b>↗</b>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="sculpture-gallery__empty">
            <p className="eyebrow text-terracotta">În pregătire</p>
            <h3>{emptyTitle}</h3>
            <p>
              Această galerie se pregătește pentru a aduna lucrările, artiștii
              și poveștile care dau traseului chipul său viu.
            </p>
          </div>
        )}

        {hasHiddenArtworks && (
          <div className="sculpture-gallery__more">
            <button type="button" onClick={() => setShowAll(true)}>
              Arată mai mult
              <span>
                {artworksCount - visibleArtworks.length} lucrări ascunse
              </span>
            </button>
          </div>
        )}

      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            className="sculpture-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sculpture-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="sculpture-modal__backdrop"
              onClick={() => setActiveIndex(null)}
              aria-label="Închide povestea lucrării"
            />
            <motion.div
              className="sculpture-modal__sheet"
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sculpture-modal__bar">
                <span>
                  Povestea {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {artworksCount}
                </span>
                <strong>Galeria traseului</strong>
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
                  className="sculpture-modal__content"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArtworkModalImages artwork={active} />
                  <div className="sculpture-modal__copy">
                    <p>
                      {artworkTypeLabel(active.type)} · {active.artist}
                    </p>
                    <h3 id="sculpture-modal-title">{active.title}</h3>
                    <div className="sculpture-modal__rule">
                      <span />
                    </div>
                    {active.description ? (
                      <div className="sculpture-modal__description">
                        {active.description.split(/\n+/).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="sculpture-modal__description">
                        Povestea acestei lucrări va prinde contur în curând.
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              <nav
                className="sculpture-modal__nav"
                aria-label="Navigare între lucrări"
              >
                <button type="button" onClick={() => changeArtwork(-1)}>
                  <span>←</span>
                  <small>Lucrarea precedentă</small>
                </button>
                <i />
                <button type="button" onClick={() => changeArtwork(1)}>
                  <small>Lucrarea următoare</small>
                  <span>→</span>
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SculptureGallery({ artworks }: SculptureGalleryProps) {
  const sculptures = artworks.filter((artwork) => artwork.type === "sculptura");
  const basoreliefs = artworks.filter((artwork) => artwork.type === "basorelief");
  const muralPaintings = artworks.filter(
    (artwork) => artwork.type === "picturaMurala",
  );

  return (
    <section className="sculpture-gallery" id="galerie-sculpturi">
      <div className="shell sculpture-gallery__stack">
        <ArtworkGallerySection
          artworks={sculptures}
          eyebrow="Mini-galerie · sculpturi"
          title="Sculpturi și artiști"
          description="Lucrările sculpturale așezate pe traseu transformă drumul într-o galerie în aer liber. Alege o sculptură pentru a descoperi autorul, povestea și detaliile lucrării."
          emptyTitle="Galeria de sculpturi este în pregătire."
        />

        <ArtworkGallerySection
          artworks={basoreliefs}
          eyebrow="Mini-galerie · basoreliefuri"
          title="Basoreliefuri și autori"
          description="Basoreliefurile păstrează memoria locului în suprafețe lucrate, povești și semne vizuale. Alege un basorelief pentru a descoperi autorul, povestea și detaliile lucrării."
          emptyTitle="Galeria de basoreliefuri este în pregătire."
        />

        <ArtworkGallerySection
          artworks={muralPaintings}
          eyebrow="Mini-galerie · picturi murale"
          title="Picturi murale și artiști"
          description="Picturile murale adaugă culoare traseului și transformă spațiile în pagini vii ale muzeului în aer liber. Alege o pictură murală pentru a-i descoperi povestea."
          emptyTitle="Galeria de picturi murale este în pregătire."
        />
      </div>
    </section>
  );
}
