import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/home/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { SculptureGallery } from "@/components/pilgrimage/sculpture-gallery";
import { chapels, pilgrimageFacts, villages } from "@/lib/pilgrimage-data";

export const metadata: Metadata = {
  title: "7 Capele, muzeu în aer liber",
  description: "Descoperă 7 Capele, muzeu în aer liber: 26 km prin Valea Siretului, șase capele istorice, artă contemporană și o a șaptea capelă imaterială.",
};

export default function PilgrimagePage() {
  return (
    <main className="pilgrimage-page">
      <section className="pilgrimage-hero">
        <Image src="/images/pelerinaj/antet-7-capele.jpg" alt="Peisaj de pe traseul 7 Capele, muzeu în aer liber" fill priority sizes="100vw" className="object-cover" />
        <div className="pilgrimage-hero__wash" />
        <div className="pilgrimage-compass" aria-hidden="true"><span>N</span><i /><b>7</b></div>
        <div className="shell pilgrimage-hero__content">
          <p className="eyebrow">Jurnal de drum · Valea Siretului</p>
          <h1>7 Capele<br /><em>muzeu în aer liber</em></h1>
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

      <section className="chapel-locations" id="unde-sunt-capelele">
        <div className="shell">
          <Reveal className="chapel-locations__heading">
            <div><p className="eyebrow text-terracotta">Fila 02 · Orientare</p><h2>Unde sunt<br /><em>capelele?</em></h2></div>
            <p>În amfiteatrul natural al Văii Siretului, în apropierea Bacăului, traseul trece prin comunele Luizi Călugăra, Sărata, Nicolae Bălcescu și Faraoani.</p>
          </Reveal>

          <div className="location-gallery" aria-label="Galerie Unde sunt capelele">
            <Reveal><figure className="location-gallery__large"><div><Image src="/images/pelerinaj/grup-7-capele.jpg" alt="Grup pe traseul 7 Capele, muzeu în aer liber" fill sizes="(max-width: 768px) 92vw, 58vw" className="object-cover" /></div><figcaption><span>01</span> Valea Siretului · Județul Bacău</figcaption></figure></Reveal>
            <Reveal delay={.08}><figure className="location-gallery__small"><div><Image src="/images/pelerinaj/unde-sunt-capelele.jpg" alt="Hartă și repere pentru traseul 7 Capele, muzeu în aer liber" fill sizes="(max-width: 768px) 92vw, 34vw" className="object-cover" /></div><figcaption><span>02</span> Traseul complet marcat</figcaption></figure></Reveal>
          </div>

          <div className="location-notes">
            <Reveal><article><span>I</span><h3>Un ansamblu unic</h3><p>Începând cu anul 1814, aici au fost construite șase capele care alcătuiesc un ansamblu unic în țară. Traseul turistic pedestru complet marcat care le unește — „7 Capele, muzeu în aer liber” — urmărește dezvoltarea economică și spirituală a zonei, atrăgând drumeți iubitori de natură, pelerini și oameni de artă prin turism cultural.</p><p>A șaptea capelă este una imaterială: capela „voi și noi”, un patrimoniu care nu înseamnă altceva decât spiritul nostru. Ideea celei de-a șaptea capele i-a aparținut sculptorului Cezar Blînda.</p></article></Reveal>
            <Reveal delay={.05}><article><span>II</span><h3>Cum a fost făcut traseul</h3><p>Asociația, dorind legarea celor șase capele într-un traseu turistic, a rugat Via Bacovia să realizeze traseul, măsurătorile și, apoi, împreună, documentația necesară marcării lui până la omologare.</p><p>Traseul colinar de 26 km este marcat în stil clasic, dar cu inserții originale: grinzi din lemn ars, indicatoare din scândură cu text pirogravat clasic sau cu laser, iar săgeata obișnuită este înlocuită cu o talpă. Cercul albastru și roșu amintește culorile predominante odinioară în zonă.</p></article></Reveal>
            <Reveal delay={.1}><article><span>III</span><h3>Urma voluntarilor</h3><p>Talpa și cercul sunt pictate de voluntari, chiar dacă există șabloane. În fiecare stâlp, indicator de direcție sau orientare și în fiecare reper montat se regăsește artistul ascuns în fiecare voluntar.</p><p>Pentru turiștii în haine de oraș au fost marcate șapte trasee rurale, în lungime totală de 20,7 km. Acestea duc spre traseul colinar și fac joncțiunea cu drumul de pelerinaj Santiago Camino de România.</p></article></Reveal>
            <Reveal delay={.15}><article><span>IV</span><h3>Artă pe drum</h3><p>Traseul colinar și cele rurale sunt marcate în prezent și prin 29 de sculpturi nonfigurative din lemn, de aproximativ 2,30 metri înălțime de la sol și circa 50 cm în diametru, realizate de studenți, profesori și sculptori din țară și din străinătate.</p><p>„7 Capele, muzeu în aer liber” se dorește o amprentă a prezentului prin voluntariat și artă contemporană, ca punte către monumentele religioase, etnosculptura, obiceiurile și tradițiile românești și ceangăiești. Aeroportul Internațional „George Enescu” se află la mai puțin de 10 km de traseu.</p></article></Reveal>
          </div>
        </div>
      </section>

      <section className="chapel-journal">
        <div className="shell">
          <Reveal className="chapel-journal__header"><div><p className="eyebrow text-terracotta">Fila 03 · Cele șapte opriri</p><h2>Din capelă<br /><em>în capelă.</em></h2></div><p>Urmează linia punctată. Fiecare oprire păstrează o bucată din istoria locului; ultima păstrează ceea ce aducem noi pe drum.</p></Reveal>
          <div className="chapel-route">
            <svg className="chapel-route__thread" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M25 7 C25 10 75 10 75 21 C75 25 25 25 25 36 C25 40 75 40 75 50 C75 55 25 55 25 64 C25 69 75 69 75 79 C75 84 25 84 25 93" />
            </svg>
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

      <SculptureGallery />

      <section className="pilgrimage-cta"><div className="shell"><Reveal className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow">Ultima filă rămâne nescrisă</p><h2>Drumul începe<br /><em>cu primul pas.</em></h2></div><div className="flex flex-wrap gap-3"><Link href="/contact" className="button-dark">Planifică o vizită <ArrowUpRight className="size-4" /></Link><Link href="/doneaza-fii-voluntar" className="pilgrimage-link">Ajută-ne să păstrăm traseul</Link></div></Reveal></div></section>
    </main>
  );
}
