import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/home/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { teamGroups } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "Despre noi",
  description: "Cunoaște echipele și oamenii Asociației Arta în dar: conducere, mentenanță, coordonatori de tabere, specialiști și media.",
};

export default function AboutPage() {
  return <main className="sculpture-page">
    <section className="sculpture-hero">
      <div className="sculpture-grain" />
      <div className="sculpture-figure" aria-hidden="true"><span /><span /><span /></div>
      <div className="shell sculpture-hero__inner">
        <p className="eyebrow text-gold">Formă · materie · oameni</p>
        <h1 className="sculpture-title">Despre<br /><em>noi</em></h1>
        <p className="sculpture-lead">O poveste cioplită în timp, gest cu gest. Fiecare om lasă o urmă; împreună, urmele capătă formă.</p>
        <a href="#echipe" className="sculpture-scroll"><span>Descoperă echipele</span><i /></a>
      </div>
    </section>

    <section className="sculpture-manifest"><div className="shell grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><Reveal><div className="carved-mark" aria-hidden="true">A</div></Reveal><Reveal delay={.1}><p className="eyebrow text-terracotta">Materia noastră primă</p><h2 className="heading-lg mt-5">Nu suntem o listă de funcții. Suntem oameni care <em>dau formă</em> unui loc.</h2><p className="body-copy mt-8 max-w-2xl">De la întreținerea traseului și taberele de creație până la siguranță, comunicare și memoria locală, fiecare rol susține aceeași lucrare comună.</p></Reveal></div></section>

    <div id="echipe">
      {teamGroups.map((group, groupIndex) => <section key={group.id} className={`team-stratum team-stratum--${group.material}`}>
        <div className="shell">
          <Reveal className="team-stratum__heading"><span className="team-stratum__number">{group.number}</span><div><p className="eyebrow">Stratul {String(groupIndex + 1).padStart(2,"0")}</p><h2>{group.title}</h2></div><span className="team-stratum__line" /></Reveal>
          <div className={`team-grid ${group.members.length === 2 ? "team-grid--compact" : ""}`}>
            {group.members.map((member, index) => <Reveal key={member.name} delay={Math.min(index * .05,.2)}><article className="sculpted-portrait">
              <div className="sculpted-portrait__image"><Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw" className="object-cover" /></div>
              <div className="sculpted-portrait__inscription"><span>{String(index + 1).padStart(2,"0")}</span><h3>{member.name}</h3><p>{member.role}</p></div>
            </article></Reveal>)}
          </div>
        </div>
      </section>)}
    </div>

    <section className="sculpture-cta"><div className="shell"><Reveal className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-gold">Mai este loc în lucrare</p><h2>Forma următoare<br />poate începe cu <em>tine.</em></h2></div><Link href="/doneaza-fii-voluntar" className="button-light w-fit">Alătură-te echipei <ArrowUpRight className="size-4" /></Link></Reveal></div></section>
  </main>;
}
