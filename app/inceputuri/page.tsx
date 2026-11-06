import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { beginnings, beginningsPhotos } from "@/lib/beginnings-data";
import styles from "./page.module.css";
import { SketchBackground } from "./sketch-background";
import { StoryIllustration } from "./story-illustration";

const spreads = [[0, 1], [2, 3], [4], [5], [6], [7, 8], [9, 10], [11, 12], [13], [14], [15], [16, 17], [18]];
const pauses: Record<number, { text: string; note: string; kind: "bench" | "music" | "route" | "flower" }> = {
  2: { text: "Am făcut loc la masă.", note: "Cu ce aveam. Pentru cine avea să vină.", kind: "bench" },
  4: { text: "Și locul a început să cânte.", note: "Dintr-un atelier, spre o scenă deschisă.", kind: "music" },
  7: { text: "Un drum se face și pentru ceilalți.", note: "Semne mici. Întâlniri care duc mai departe.", kind: "route" },
  18: { text: "Oamenii lasă urme.", note: "Unele rămân pe ziduri. Altele, în noi.", kind: "flower" },
};

export const metadata: Metadata = {
  title: "Începuturi",
  description: "Din iarna lui 2021, de la primele gesturi de voluntariat la artă, ospitalitate și comunitate. Povestea începuturilor Arta în dar, în 19 fotografii.",
  alternates: { canonical: "/inceputuri" },
};

export default function BeginningsPage() {
  return (
    <main className={styles.page}>
      <SketchBackground />
      <section className={`shell ${styles.hero}`} aria-labelledby="beginnings-title">
        <div className={styles.copy}>
          <p className={styles.label}>Arta în dar · Caiet de începuturi</p>
          <h1 id="beginnings-title">Începuturi<span>Din lucruri simple,<br />o poveste împreună.</span></h1>
          <p className={styles.intro}>La început a fost un loc de îngrijit. Apoi, lemn de recuperat, o masă de construit și oameni de primit. Privim înapoi la gesturile din care a crescut Arta în dar.</p>
          <a href="#prima-pagina" className={styles.link}>Răsfoiește povestea <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.sketch} aria-hidden="true">
          <span className={styles.note}>totul începe cu un gest</span>
          <svg viewBox="0 0 420 420" fill="none">
            <circle cx="210" cy="208" r="145" strokeDasharray="4 9" />
            <path d="M53 337L369 337M91 354L342 354M125 333L125 187L208 113L291 187L291 333M119 191L210 105L299 191M134 194L211 126L282 194M158 330L158 222L204 222L204 330M226 247L262 247L262 210L226 210ZM209 105L209 68M192 83L226 83" />
            <path d="M76 318Q92 244 110 299M300 316Q326 251 349 294M67 369Q181 358 358 365M108 202L109 330M304 201L305 332" />
          </svg>
          <span className={styles.folio}>iarna 2021 / primele pagini</span>
        </div>
      </section>
      <div id="prima-pagina" className={`shell ${styles.story}`}>
        {spreads.map((indices) => {
          const first = indices[0];
          const pause = pauses[first];
          const paired = indices.length > 1;
          const wide = first === 14 || first === 18;
          return (
            <div key={first} className={styles.spread}>
              {pause && <div className={styles.pause}>
                <StoryIllustration kind={pause.kind} />
                <div><p className={styles.pauseText}>{pause.text}</p><p className={styles.pauseNote}>{pause.note}</p></div>
              </div>}
              <div className={paired ? styles.paired : wide ? styles.wide : ""}>
                {indices.map((index) => {
                  const moment = beginnings[index];
                  const number = String(index + 1).padStart(2, "0");
                  return (
                    <article key={number} className={`${styles.moment} ${!paired && index % 2 ? styles.reverse : ""}`} aria-labelledby={`moment-${number}`}>
                      <figure className={styles.photo}>
                        <div className={styles.photoPaper}>
                          <Image src={beginningsPhotos[index]} alt={moment.alt} sizes={wide ? "(max-width: 799px) 92vw, 88vw" : "(max-width: 799px) 92vw, 48vw"} className={styles.storyImage} />
                        </div>
                        <figcaption><span>fila {number}</span>{moment.note}</figcaption>
                      </figure>
                      <div className={styles.momentCopy}>
                        <span className={styles.number} aria-hidden="true">{number}</span>
                        <p className={styles.label}>{moment.note}</p>
                        <h2 id={`moment-${number}`}>{moment.title}</h2>
                        <p className={styles.storyText}>{moment.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <section className={`shell ${styles.ending}`} aria-labelledby="next-page">
        <p className={styles.label}>Următoarea filă</p>
        <h2 id="next-page">Povestea se scrie<br /><em>mai departe.</em></h2>
        <p>O sâmbătă de lucru, o idee nouă, încă un om care ne trece pragul. Începuturile ne însoțesc în tot ce urmează.</p>
        <Link href="/doneaza-fii-voluntar" className={styles.link}>Fii parte din poveste <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
