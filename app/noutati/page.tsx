import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/home/reveal";
import { NewsCard } from "@/components/news/news-card";
import { getNewsPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "Noutăți",
  description: "Noutăți, evenimente și povești recente din activitatea Asociației Arta în dar.",
  alternates: {
    canonical: "/noutati",
  },
};

async function NewsSections() {
  const posts = await getNewsPosts();
  const featured = posts.find((post) => post.featured) || posts[0];

  return (
    <>
      {featured ? (
        <section className="news-featured" aria-labelledby="news-featured-title">
          <div className="shell news-featured__grid">
            <Reveal>
              <p className="eyebrow">Prima notă</p>
              <h2 id="news-featured-title">{featured.cardTitle || featured.title}</h2>
            </Reveal>
            <Reveal className="news-featured__card" delay={0.08}>
              <NewsCard post={featured} index={0} />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="news-list" aria-labelledby="news-list-title">
        <div className="shell">
          <Reveal className="news-list__heading">
            <p className="eyebrow">Portative recente</p>
            <h2 id="news-list-title">Tot ce se întâmplă, așezat în ritm.</h2>
          </Reveal>

          {posts.length ? (
            <div className="news-grid">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={Math.min(index * 0.04, 0.2)}>
                  <NewsCard post={post} index={index} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="news-empty">
              <span aria-hidden="true">𝄞</span>
              <h2>Noutățile se vor scrie aici.</h2>
              <p>
                În curând, aici vor apărea evenimente, oameni, ateliere și pași
                mici care compun ritmul asociației.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

function NewsSectionsFallback() {
  return (
    <section className="news-list" aria-busy="true">
      <div className="shell">
        <div className="section-loading section-loading--news">
          <span />
          <p className="eyebrow">Noutățile se acordează</p>
          <h2>Partitura se deschide imediat.</h2>
        </div>
      </div>
    </section>
  );
}

export default function NewsPage() {
  return (
    <main className="news-page">
      <section className="news-hero">
        <div className="news-hero__score" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="shell news-hero__inner">
          <Reveal className="news-hero__copy">
            <p className="eyebrow">Partitură vie</p>
            <h1>
              Noutăți
              <em> care se aud.</em>
            </h1>
            <p>
              Evenimente, oameni, ateliere și pași mici care compun ritmul asociației. O pagină ca o
              partitură deschisă: fiecare veste intră pe scenă cu propria notă.
            </p>
          </Reveal>

          <Reveal className="news-hero__composition" delay={0.08}>
            <span className="news-note news-note--one">♪</span>
            <span className="news-note news-note--two">♩</span>
            <span className="news-note news-note--three">♫</span>
            <div className="news-vinyl">
              <i />
              <strong>Arta în dar</strong>
              <small>jurnal sonor al comunității</small>
            </div>
          </Reveal>
        </div>
      </section>

      <Suspense fallback={<NewsSectionsFallback />}>
        <NewsSections />
      </Suspense>
    </main>
  );
}
