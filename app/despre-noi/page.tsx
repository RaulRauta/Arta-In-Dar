import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutTeam } from "@/components/about/about-team";
import { Reveal } from "@/components/home/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { getAboutTeamGroups } from "@/lib/about-data";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Cunoaște echipele și oamenii Asociației Arta în dar: straturile vii care dau formă proiectelor culturale, voluntariatului și comunității.",
};

export default async function AboutPage() {
  const teamGroups = await getAboutTeamGroups();

  return (
    <main className="sculpture-page">
      <section className="sculpture-hero">
        <div className="sculpture-grain" />
        <div className="sculpture-figure" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="shell sculpture-hero__inner">
          <p className="eyebrow text-gold">Formă · materie · oameni</p>
          <h1 className="sculpture-title">
            Despre
            <br />
            <em>noi</em>
          </h1>
          <p className="sculpture-lead">
            O poveste cioplită în timp, gest cu gest. Fiecare om lasă o urmă;
            împreună, urmele capătă formă.
          </p>
          <a href="#echipe" className="sculpture-scroll">
            <span>Descoperă echipele</span>
            <i />
          </a>
        </div>
      </section>

      <section className="sculpture-manifest">
        <div className="shell grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <div className="carved-mark" aria-hidden="true">
              A
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-terracotta">Materia noastră primă</p>
            <h2 className="heading-lg mt-5">
              Nu suntem o listă de funcții. Suntem oameni care{" "}
              <em>dau formă</em> unui loc.
            </h2>
            <p className="body-copy mt-8 max-w-2xl">
              De la îngrijirea traseului „7 Capele, muzeu în aer liber” și
              taberele de creație până la siguranță, comunicare și memoria
              locală, fiecare rol susține aceeași lucrare comună.
            </p>
          </Reveal>
        </div>
      </section>

      <div id="echipe">
        <AboutTeam groups={teamGroups} />
      </div>

      <section className="flowcraft-collaborator" aria-labelledby="flowcraft-title">
        <div className="shell">
          <Reveal className="flowcraft-collaborator__card">
            <div className="flowcraft-collaborator__mark">
              <Image
                src="/images/flowcraft-logo-icon.png"
                alt="FlowCraftStudio logo"
                width={92}
                height={92}
                className="flowcraft-collaborator__logo"
              />
            </div>
            <div>
              <p className="eyebrow">Colaborator</p>
              <h2 id="flowcraft-title">FlowCraftStudio</h2>
              <p>
                Un atelier digital care sprijină felul în care povestea Arta în
                dar prinde formă online — cu grijă pentru imagine, ritm și
                experiență.
              </p>
              <Link
                href="https://flowcraftstudio.app/ro"
                target="_blank"
                rel="noopener noreferrer"
                className="flowcraft-collaborator__link"
              >
                Vizitează FlowCraftStudio <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sculpture-cta">
        <div className="shell">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-gold">Mai este loc în lucrare</p>
              <h2>
                Forma următoare
                <br />
                poate începe cu <em>tine.</em>
              </h2>
            </div>
            <Link href="/doneaza-fii-voluntar" className="button-light w-fit">
              Alătură-te echipei <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
