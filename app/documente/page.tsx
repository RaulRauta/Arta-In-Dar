import type { Metadata } from "next";
import { Reveal } from "@/components/home/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { archiveHighlights, documentSections } from "@/lib/documents-data";

export const metadata: Metadata = {
  title: "Documente",
  description: "Arhiva oficială Arta în dar: statut, istoric, rapoarte de activitate, bilanțuri, contracte și formularul 230.",
};

export default function DocumentsPage() {
  return (
    <main className="documents-page">
      <section className="documents-hero">
        <div className="archive-desk" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="shell documents-hero__inner">
          <Reveal className="documents-hero__copy">
            <p className="eyebrow">Arhiva deschisă</p>
            <h1>
              Documente
              <em> cu urmă.</em>
            </h1>
            <p>
              O arhivă editorială pentru actele importante ale asociației: documente fondatoare,
              rapoarte, bilanțuri și formulare utile, așezate clar, ca într-un cabinet cultural.
            </p>
          </Reveal>
          <Reveal className="archive-register" delay={0.08}>
            <span className="archive-register__stamp">Arta în dar</span>
            <small>Registru public</small>
            <strong>transparență / implicare / continuitate</strong>
            <div className="archive-register__lines">
              <i />
              <i />
              <i />
              <i />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="archive-foundation" aria-labelledby="archive-foundation-title">
        <div className="shell archive-foundation__grid">
          <Reveal>
            <p className="eyebrow">Dosar fondator</p>
            <h2 id="archive-foundation-title">Începuturi, statut și direcție.</h2>
          </Reveal>
          <div className="archive-foundation__cards">
            {archiveHighlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <a className="archive-document archive-document--large" href={item.href} target="_blank" rel="noreferrer">
                  <span>{item.type}</span>
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                  <small>{item.description}</small>
                  <strong>
                    Deschide documentul <ArrowUpRight className="size-4" />
                  </strong>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="archive-cabinet" aria-labelledby="archive-cabinet-title">
        <div className="shell">
          <Reveal className="archive-cabinet__heading">
            <p className="eyebrow">Cabinet de lucru</p>
            <h2 id="archive-cabinet-title">
              Tot ce trebuie găsit
              <em> fără zgomot.</em>
            </h2>
          </Reveal>

          <div className="archive-drawer-list">
            {documentSections.map((section, sectionIndex) => (
              <Reveal key={section.title} delay={sectionIndex * 0.05}>
                <article className="archive-drawer">
                  <div className="archive-drawer__label">
                    <span>{section.number}</span>
                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.note}</p>
                    </div>
                  </div>
                  <div className="archive-drawer__documents">
                    {section.documents.map((item) => (
                      <a key={item.title} className="archive-file" href={item.href} target="_blank" rel="noreferrer">
                        <span>{item.type}</span>
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                          <strong>
                            {item.action} <ArrowUpRight className="size-4" />
                          </strong>
                        </div>
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="archive-cta">
        <div className="shell archive-cta__inner">
          <Reveal>
            <p className="eyebrow">Ai nevoie de ceva anume?</p>
            <h2>Scrie-ne și deschidem dosarul potrivit.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Dacă ai nevoie de un document într-un anumit format sau vrei informații suplimentare,
              trimite-ne un mesaj și revenim cu clarificări.
            </p>
            <a href="mailto:asociatiaartaindar@yahoo.com?subject=Documente%20Arta%20%C3%AEn%20dar">
              Cere un document <ArrowUpRight className="size-5" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
