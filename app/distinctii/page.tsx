import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/home/reveal";
import { distinctions, distinctionStats } from "@/lib/distinctions-data";

export const metadata: Metadata = {
  title: "Distincții",
  description: "Distincțiile și recunoașterile primite de Asociația Arta în dar pentru proiecte culturale, voluntariat și patrimoniu local.",
};

export default function DistinctionsPage() {
  return (
    <main className="distinctions-page">
      <section className="distinctions-hero">
        <div className="medallion-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="shell distinctions-hero__inner">
          <Reveal className="distinctions-hero__copy">
            <p className="eyebrow">Semne de recunoaștere</p>
            <h1>
              Distincții
              <em> gravate în timp.</em>
            </h1>
            <p>
              Nu le tratăm ca pe trofee de vitrină. Le așezăm ca mărturii ale unei munci
              făcute cu oameni, pentru locuri care merită privite cu mai multă grijă.
            </p>
          </Reveal>
          <Reveal className="hero-medallion" delay={0.08}>
            <span className="hero-medallion__ribbon" />
            <div className="hero-medallion__coin">
              <small>Arta în dar</small>
              <strong>2024—2025</strong>
              <i />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="distinctions-ledger" aria-labelledby="distinctions-ledger-title">
        <div className="shell distinctions-ledger__inner">
          <Reveal>
            <p className="eyebrow">Registru de onoare</p>
            <h2 id="distinctions-ledger-title">
              Recunoaștere care nu închide povestea,
              <em> o obligă să continue.</em>
            </h2>
          </Reveal>
          <div className="distinctions-stats">
            {distinctionStats.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.06}>
                <div className="distinction-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="distinctions-gallery" aria-label="Galeria distincțiilor">
        <div className="shell distinctions-gallery__grid">
          {distinctions.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className={`distinction-card distinction-card--${item.tone}`}>
                <div className="distinction-card__plate">
                  <span>{item.year}</span>
                  <h2>{item.title}</h2>
                  <p>{item.category}</p>
                </div>
                <div className="distinction-card__image">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 92vw, 42vw" className="object-contain" />
                </div>
                <div className="distinction-card__copy">
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="distinctions-finale">
        <div className="shell distinctions-finale__inner">
          <Reveal>
            <p className="eyebrow">Dincolo de medalie</p>
            <h2>
              Cea mai importantă distincție rămâne
              <em> încrederea comunității.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Fiecare recunoaștere spune că arta, voluntariatul și patrimoniul local pot deveni
              un limbaj comun. De aici mergem mai departe.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
