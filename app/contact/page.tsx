import type { Metadata } from "next";
import { Reveal } from "@/components/home/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { ArrowUpRight } from "@/components/ui/icons";
import { contactDetails } from "@/lib/contact-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactează Asociația Arta în dar pentru voluntariat, donații, vizite pe traseul 7 Capele, parteneriate culturale sau întrebări.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="ink-wash" aria-hidden="true" />
        <div className="letter-desk-scene" aria-hidden="true">
          <span className="desk-letter desk-letter--one" />
          <span className="desk-letter desk-letter--two" />
          <span className="desk-envelope desk-envelope--open" />
          <span className="desk-envelope desk-envelope--half" />
          <span className="inkwell">
            <i />
          </span>
          <span className="spilled-ink" />
          <span className="quill" />
        </div>
        <div className="shell contact-hero__inner">
          <Reveal className="contact-letter">
            <p className="eyebrow">O scrisoare deschisă</p>
            <h1>
              Scrie-ne
              <em> cu rost.</em>
            </h1>
            <p>
              Orice proiect frumos începe cu un „bună”. Spune-ne ce vrei să construim împreună:
              voluntariat, donații, vizite, parteneriate sau pur și simplu o întrebare bine așezată.
            </p>
          </Reveal>
          <Reveal className="contact-envelope" delay={0.08}>
            <span>către</span>
            <strong>Asociația Arta în dar</strong>
            <small>{contactDetails.address}</small>
            <i />
          </Reveal>
        </div>
      </section>

      <section className="contact-worktable" aria-labelledby="contact-form-title">
        <div className="worktable-props" aria-hidden="true">
          <span className="worktable-props__sheet" />
          <span className="worktable-props__envelope" />
          <span className="worktable-props__ink" />
          <span className="worktable-props__quill" />
        </div>
        <div className="shell contact-worktable__grid">
          <Reveal className="contact-form-panel">
            <p className="eyebrow">Peniță și hârtie</p>
            <h2 id="contact-form-title">Lasă-ne un mesaj.</h2>
            <ContactForm />
          </Reveal>

          <Reveal className="contact-side-notes" delay={0.08}>
            <article>
              <span>Email</span>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              <small>Scrie-ne direct sau folosește formularul — revenim cu un răspuns cât mai curând.</small>
            </article>
            <article>
              <span>Sediu</span>
              <a href={contactDetails.mapsUrl} target="_blank" rel="noreferrer">
                {contactDetails.address}
              </a>
            </article>
            <article>
              <span>Centrul „În câmp”</span>
              <p>{contactDetails.centerAddress}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="map-atelier" aria-labelledby="map-title">
        <div className="shell map-atelier__grid">
          <Reveal>
            <p className="eyebrow">Planșă de orientare</p>
            <h2 id="map-title">
              Harta, prinsă
              <em> pe masa de atelier.</em>
            </h2>
            <p>
              Am încadrat harta ca pe o planșă de lucru: utilă, dar parte din povestea vizuală,
              nu un bloc rece lipit la finalul paginii.
            </p>
            <a className="map-atelier__link" href={contactDetails.mapsUrl} target="_blank" rel="noreferrer">
              Deschide în Google Maps <ArrowUpRight className="size-4" />
            </a>
          </Reveal>

          <Reveal className="map-frame" delay={0.08}>
            <div className="map-frame__pin map-frame__pin--one" aria-hidden="true" />
            <div className="map-frame__pin map-frame__pin--two" aria-hidden="true" />
            <iframe
              title="Harta Asociația Arta în dar"
              src={contactDetails.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span>Nicolae Bălcescu · Bacău</span>
          </Reveal>
        </div>
      </section>

      <section className="contact-social">
        <div className="shell contact-social__inner">
          <Reveal>
            <p className="eyebrow">Urme de cerneală</p>
            <h2>Ne găsești și în locurile unde povestea continuă.</h2>
          </Reveal>
          <Reveal className="contact-social__links" delay={0.08}>
            {contactDetails.social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="social-envelope">
                <span className="social-envelope__letter">
                  <small>Deschide</small>
                  <strong>{item.label}</strong>
                </span>
                <span className="social-envelope__front">
                  <i />
                  <b>{item.label}</b>
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
