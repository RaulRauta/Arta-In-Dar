import type { Metadata } from "next";
import { Reveal } from "@/components/home/reveal";
import { NewsCard } from "@/components/news/news-card";
import { getNewsPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "Noutăți",
  description: "Noutăți, evenimente și povești recente din activitatea Asociației Arta în dar.",
};

export default async function NewsPage() {
  const posts = await getNewsPosts();
  const featured = posts.find((post) => post.featured) || posts[0];

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
                Momentan nu există postări publicate în Sanity. Când adaugi prima noutate, cardul
                apare automat aici și va avea propria pagină.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
