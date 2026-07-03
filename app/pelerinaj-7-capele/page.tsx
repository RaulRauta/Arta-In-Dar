import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/home/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { chapels, pilgrimageFacts, villages } from "@/lib/pilgrimage-data";

export const metadata: Metadata = {
  title: "Pelerinaj 7 Capele",
  description: "Descoperă traseul turistic pedestru Pelerinaj 7 Capele: 26 km prin Valea Siretului, șase capele istorice, artă contemporană și o a șaptea capelă imaterială.",
};

export default function PilgrimagePage() {
  return (
    <main className="pilgrimage-page">
      <section className="pilgrimage-hero">
        <Image src="/images/pelerinaj/antet-7-capele.jpg" alt="Peisaj de pe traseul Pelerinaj 7 Capele" fill priority sizes="100vw" className="object-cover" />
        <div className="pilgrimage-hero__wash" />
        <div className="pilgrimage-compass" aria-hidden="true"><span>N</span><i /><b>7</b></div>
        <div className="shell pilgrimage-hero__content">
          <p className="eyebrow">Jurnal de drum · Valea Siretului</p>
          <h1>Pelerinaj<br /><em>7 Capele</em></h1>
          <p>Șase capele așezate pe dealuri. A șaptea nu se vede — se construiește între voi și noi, cu fiecare pas.</p>
          <a href="#traseu" className="pilgrimage-seal">Deschide jurnalul <span>↓</span></a>
        </div>
      </section>

      <section className="pilgrimage-intro" id="traseu">
        <div className="shell grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <div className="pilgrimage-map" aria-label="Hartă artistică a celor șapte opriri">
              <svg viewBox="0 0 520 610" role="img" aria-label="Traseu desenat între cele șapte capele">
                <path className="pilgrimage-map__land" d="M35 85C114 15 211 56 270 30c72-31 170 28 208 108 47 98-20 158 3 241 21 78-46 167-137 186-100 20-144-36-229-17-73 16-112-57-81-124 48-68-20-105-16-180 3-62-30-111 17-159Z" />
                <path className="pilgrimage-map__route" d="M92 500C128 449 84 405 145 369c47-29 23-91 81-113 70-27 35-82 101-104 38-13 58-46 97-70" />
                {[{x:92,y:500},{x:128,y:407},{x:169,y:347},{x:225,y:258},{x:292,y:207},{x:345,y:137},{x:424,y:82}].map((point,index)=><g key={index} transform={`translate(${point.x} ${point.y})`}><circle r="17" /><text y="5" textAnchor="middle">{index+1}</text></g>)}
              </svg>
              <span className="map-note map-note--one">26 km · traseu colinar</span>
              <span className="map-note map-note--two">spre Santiago Camino de România</span>
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <p className="eyebrow text-terracotta">Fila 01 · Povestea</p>
            <h2 className="pilgrimage-heading">Un drum între patrimoniu, natură și oameni.</h2>
            <p className="pilgrimage-copy">În amfiteatrul natural al Văii Siretului, pe teritoriul a patru comune din județul Bacău, șase capele alcătuiesc un ansamblu unic în țară. Traseul le unește într-o experiență de turism cultural, spiritualitate și descoperire lentă a locului.</p>
            <p className="pilgrimage-quote">„A șaptea capelă este una imaterială — capela voi și noi — și nu înseamnă altceva decât spiritul nostru.”</p>
            <div className="pilgrimage-villages">{villages.map((v,i)=><span key={v}><b>0{i+1}</b>{v}</span>)}</div>
          </Reveal>
        </div>
      </section>

      <section className="pilgrimage-facts">
        <div className="shell grid sm:grid-cols-2 lg:grid-cols-4">
          {pilgrimageFacts.map((fact,index)=><Reveal key={fact.value} delay={index*.06}><div className="pilgrimage-fact"><strong>{fact.value}</strong><span>{fact.label}</span></div></Reveal>)}
        </div>
      </section>

      <section className="chapel-journal">
        <div className="shell">
          <Reveal className="chapel-journal__header"><div><p className="eyebrow text-terracotta">Fila 02 · Cele șapte opriri</p><h2>Din capelă<br /><em>în capelă.</em></h2></div><p>Urmează linia punctată. Fiecare oprire păstrează o bucată din istoria locului; ultima păstrează ceea ce aducem noi pe drum.</p></Reveal>
          <div className="chapel-route">
            {chapels.map((chapel,index)=><Reveal key={chapel.name} delay={Math.min(index*.04,.16)} className={`chapel-entry ${index%2 ? "chapel-entry--reverse" : ""}`}>
              <article>
                <div className="chapel-entry__image"><Image src={chapel.image} alt={chapel.name} fill sizes="(max-width: 768px) 92vw, 38vw" className="object-cover" /><span>{chapel.number}</span></div>
                <div className="chapel-entry__copy"><small>Oprirea {chapel.number}</small><h3>{chapel.name}</h3><p>{chapel.note}</p></div>
              </article>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="pilgrimage-markers">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-24">
          <Reveal><div className="pilgrimage-photo"><Image src="/images/pelerinaj/grup-7-capele.jpg" alt="Pelerini pe traseul 7 Capele" fill sizes="(max-width: 1024px) 92vw, 52vw" className="object-cover" /><span>Arhivă de drum</span></div></Reveal>
          <Reveal delay={.1}><p className="eyebrow text-gold">Fila 03 · Semne lăsate în urmă</p><h2 className="pilgrimage-heading text-cream">Marcajul poartă mâna voluntarului.</h2><p className="pilgrimage-copy text-cream/70">Grinzile din lemn ars, indicatoarele pirogravate și simbolul tălpii sunt realizate și pictate de voluntari. Pe traseu, 29 de sculpturi nonfigurative din lemn transformă drumul într-o galerie în aer liber.</p><p className="pilgrimage-hand">În fiecare stâlp se regăsește artistul ascuns în fiecare voluntar.</p></Reveal>
        </div>
      </section>

      <section className="pilgrimage-rest">
        <div className="shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <Reveal><div className="rest-stamp"><span>Popas</span><strong>Sărata<br />Băi</strong><i>la mijlocul drumului</i></div></Reveal>
          <Reveal delay={.1}><p className="eyebrow text-terracotta">Fila 04 · Oaza pelerinului</p><h2 className="pilgrimage-heading">Un loc de odihnă între două capitole.</h2><p className="pilgrimage-copy">La mijlocul traseului se află stațiunea Sărata Băi, parte integrantă a pelerinajului — loc de popas, cazare, masă și tratament pentru călătorul obosit.</p><div className="pilgrimage-access"><span>Aeroportul Internațional „George Enescu”</span><strong>la mai puțin de 10 km de traseu</strong></div></Reveal>
        </div>
      </section>

      <section className="pilgrimage-cta"><div className="shell"><Reveal className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow">Ultima filă rămâne nescrisă</p><h2>Drumul începe<br /><em>cu primul pas.</em></h2></div><div className="flex flex-wrap gap-3"><Link href="/contact" className="button-dark">Planifică o vizită <ArrowUpRight className="size-4" /></Link><Link href="/doneaza-fii-voluntar" className="pilgrimage-link">Ajută-ne să păstrăm traseul</Link></div></Reveal></div></section>
    </main>
  );
}
