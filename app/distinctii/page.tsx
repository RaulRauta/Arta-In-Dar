import type { Metadata } from "next";
import { DistinctionsGallery } from "@/components/distinctions/distinctions-gallery";
import { Reveal } from "@/components/home/reveal";
import { getDistinctions } from "@/lib/distinctions";

export const metadata: Metadata = {
  title: "Distincții",
  description:
    "Distincțiile și recunoașterile primite de Asociația Arta în dar pentru proiecte culturale, voluntariat și patrimoniu local.",
};

export default async function DistinctionsPage() {
  const distinctions = await getDistinctions();
  const years = new Set(distinctions.map((item) => item.year).filter(Boolean));

  const distinctionStats = [
    {
      value: String(distinctions.length),
      label:
        distinctions.length === 1
          ? "distincție documentată"
          : "distincții documentate",
    },
    {
      value: String(years.size),
      label:
        years.size === 1 ? "an de recunoaștere" : "ani de recunoaștere",
    },
    { value: "∞", label: "motive să continuăm" },
  ];

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
              Nu le tratăm ca pe trofee de vitrină. Le așezăm ca mărturii ale
              unei munci făcute cu oameni, pentru locuri care merită privite cu
              mai multă grijă.
            </p>
          </Reveal>
          <Reveal className="hero-medallion" delay={0.08}>
            <span className="hero-medallion__ribbon" />
            <div className="hero-medallion__coin">
              <small>Arta în dar</small>
              <strong>2024—2026</strong>
              <i />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="distinctions-ledger"
        aria-labelledby="distinctions-ledger-title"
      >
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

      <DistinctionsGallery
        distinctions={distinctions}
        emptyTitle="Distincțiile vor fi adăugate din Sanity."
        emptyDescription="Când vei adăuga prima distincție în panoul de administrare, ea va apărea automat aici."
      />

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
              Fiecare recunoaștere spune că arta, voluntariatul și patrimoniul
              local pot deveni un limbaj comun. De aici mergem mai departe.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
