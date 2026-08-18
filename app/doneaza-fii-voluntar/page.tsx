import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/home/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { involvementResources, taxResources } from "@/lib/involvement-data";

export const metadata: Metadata = {
  title: "Donează / Fii voluntar",
  description: "Intră în scena comunității Arta în dar prin voluntariat, sponsorizare sau redirecționarea a 3,5% din impozitul pe venit.",
  alternates: {
    canonical: "/doneaza-fii-voluntar",
  },
};

export default function InvolvementPage() {
  return (
    <main className="theatre-page">
      <section className="theatre-hero">
        <div className="theatre-curtain theatre-curtain--left" aria-hidden="true" />
        <div className="theatre-curtain theatre-curtain--right" aria-hidden="true" />
        <div className="theatre-valance" aria-hidden="true" />
        <div className="theatre-spotlight" aria-hidden="true" />
        <div className="shell theatre-hero__inner">
          <p className="eyebrow">Scena comunității · Actul I</p>
          <h1>Intră<br /><em>în scenă.</em></h1>
          <p className="theatre-hero__manifest">Lasă-ți amprenta în timp, ducând mai departe trecutul și completând prezentul.</p>
          <div className="theatre-hero__actions">
            <a href="#voluntar" className="theatre-ticket"><span>Vreau să fiu voluntar</span><b>01</b></a>
            <a href="#doneaza" className="theatre-ticket theatre-ticket--light"><span>Vreau să susțin</span><b>02</b></a>
          </div>
        </div>
        <p className="theatre-stage-note">Nicio poveste vie nu se construiește singură.</p>
      </section>

      <section className="theatre-volunteer" id="voluntar">
        <div className="shell theatre-act-grid">
          <Reveal className="theatre-poster">
            <p className="eyebrow">Actul II · Voluntariat</p>
            <span className="theatre-poster__number">01</span>
            <h2>Un rol<br />care lasă<br /><em>urme.</em></h2>
            <p>Nu căutăm spectatori. Căutăm oameni care vor să pună umărul, să învețe, să creeze și să dea mai departe.</p>
            <a className="theatre-underline-link" href="mailto:artaindar7@yahoo.com?subject=Vreau%20să%20devin%20voluntar">Scrie-ne pentru a intra în echipă <ArrowUpRight className="size-4" /></a>
          </Reveal>
          <Reveal className="theatre-costume" delay={.08}>
            <div className="theatre-costume__frame">
              <Image src="/images/archive/tricouri-voluntari.jpeg" alt="Tricourile voluntarilor Arta în dar" fill sizes="(max-width: 1024px) 92vw, 46vw" className="object-cover" />
              <span>Costumul echipei</span>
            </div>
            <blockquote>„Munca voluntară aduce arta la țară.”</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="theatre-program" aria-labelledby="program-title">
        <div className="shell">
          <Reveal className="theatre-section-heading">
            <div><p className="eyebrow">Program de sală</p><h2 id="program-title">Înainte să ridicăm<br /><em>cortina.</em></h2></div>
            <p>Ai aici documentele care fac implicarea transparentă și simplă. Sunt aceleași resurse oficiale de pe site-ul asociației, așezate acum într-un loc clar.</p>
          </Reveal>
          <div className="theatre-program__grid">
            {involvementResources.map((item, index) => (
              <Reveal key={item.title} delay={index * .06}>
                <a className="theatre-program-card" href={item.href} target="_blank" rel="noreferrer">
                  <span className="theatre-program-card__number">{item.number}</span>
                  <p>{item.eyebrow}</p><h3>{item.title}</h3><div className="theatre-program-card__rule" />
                  <span className="theatre-program-card__description">{item.description}</span>
                  <strong>{item.action}<ArrowUpRight className="size-4" /></strong>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="theatre-donate" id="doneaza">
        <div className="theatre-balcony" aria-hidden="true" />
        <div className="shell theatre-donate__inner">
          <Reveal>
            <p className="eyebrow">Actul III · Susține</p>
            <h2>Un gest mic.<br /><em>Ecou lung.</em></h2>
            <p className="theatre-donate__copy">Poți susține activitatea Arta în dar prin sponsorizare sau prin redirecționarea a 3,5% din impozitul pe venit. Nu te costă în plus, dar pentru proiectele comunității poate însemna încă un drum, încă o lucrare, încă o întâlnire.</p>
          </Reveal>
          <div className="theatre-donate__tickets">
            {taxResources.map((item, index) => (
              <Reveal key={item.title} delay={.08 + index * .06}>
                <a href={item.href} target="_blank" rel="noreferrer" className="donation-ticket">
                  <span className="donation-ticket__stub"><b>{item.number}</b><small>Arta în dar</small></span>
                  <span className="donation-ticket__body"><small>Invitație la implicare</small><strong>{item.title}</strong><p>{item.description}</p><i>{item.action} ↗</i></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="theatre-finale">
        <div className="shell theatre-finale__inner">
          <Reveal><p className="eyebrow">Final deschis</p><h2>Povestea continuă<br />cu <em>tine.</em></h2></Reveal>
          <Reveal delay={.08}><p>Spune-ne ce știi să faci, ce ai vrea să înveți sau ce proiect ai vrea să susții.</p><a href="mailto:artaindar7@yahoo.com" className="theatre-finale__button">Începem o conversație <ArrowUpRight className="size-5" /></a></Reveal>
        </div>
      </section>
    </main>
  );
}
