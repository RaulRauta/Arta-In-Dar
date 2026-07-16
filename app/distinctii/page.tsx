import type { Metadata } from "next";
import { DistinctionsGallery } from "@/components/distinctions/distinctions-gallery";
import { Reveal } from "@/components/home/reveal";
import {
  getDistinctions,
  getDistinctionsPageContent,
} from "@/lib/distinctions";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getDistinctionsPageContent();

  return {
    title: pageContent.seoTitle,
    description: pageContent.seoDescription,
  };
}

export default async function DistinctionsPage() {
  const [distinctions, pageContent] = await Promise.all([
    getDistinctions(),
    getDistinctionsPageContent(),
  ]);
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
            <p className="eyebrow">{pageContent.heroEyebrow}</p>
            <h1>
              {pageContent.heroTitle}
              <em> {pageContent.heroAccent}</em>
            </h1>
            <p>{pageContent.heroDescription}</p>
          </Reveal>
          <Reveal className="hero-medallion" delay={0.08}>
            <span className="hero-medallion__ribbon" />
            <div className="hero-medallion__coin">
              <small>{pageContent.coinLabel}</small>
              <strong>{pageContent.coinYears}</strong>
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
            <p className="eyebrow">{pageContent.ledgerEyebrow}</p>
            <h2 id="distinctions-ledger-title">
              {pageContent.ledgerTitle}
              <em> {pageContent.ledgerAccent}</em>
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
        emptyTitle={pageContent.galleryEmptyTitle}
        emptyDescription={pageContent.galleryEmptyDescription}
      />

      <section className="distinctions-finale">
        <div className="shell distinctions-finale__inner">
          <Reveal>
            <p className="eyebrow">{pageContent.finaleEyebrow}</p>
            <h2>
              {pageContent.finaleTitle}
              <em> {pageContent.finaleAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>{pageContent.finaleDescription}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
