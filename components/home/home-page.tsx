import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { partners } from "@/lib/site-data";
import { Reveal } from "./reveal";

const financialReport = [
  "În urma solicitării de donație publică, în conturile asociației au fost virați 2.715 lei și 180 Euro, adică 3.615 lei. 36 de donatori și 7 persoane au înmânat direct bănuții.",
  "Au fost și două sponsorizări, în valoare de 2.700 lei.",
  "Total sponsorizări și donații: 6.315 lei.",
  "Total cheltuieli: 8.833 lei, dintre care 5.000 plătiți din contul asociației și 3.883 din contul de credit al unui voluntar.",
  "Dovada cheltuielilor a fost trimisă sponsorilor, iar donatorilor le este disponibilă la cerere.",
  "Din ciment au mai rămas 5 saci, din praful de marmură unul, iar din nisip tot unul.",
];

function ArchiveImage({ type, label }: { type: "portrait" | "news" | "volunteer" | "report"; label: string }) {
  return <div role="img" aria-label={label} className={`archive-image archive-image--${type}`}><span className="archive-image__corner">Arhivă vie · Arta în Dar</span></div>;
}

export function HomePage() {
  return <main>
    <section className="hero relative flex min-h-[760px] items-end overflow-hidden bg-ink text-cream lg:min-h-screen">
      <Image src="/images/hero-arta-in-dar.png" alt="Trei generații creează împreună, la o masă cu flori, ceramică și fotografii vechi" fill priority sizes="100vw" className="object-cover object-[68%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,36,31,.86)_0%,rgba(45,36,31,.47)_43%,rgba(45,36,31,.05)_78%),linear-gradient(0deg,rgba(45,36,31,.65),transparent_55%)]" />
      <div className="paper-noise absolute inset-0 opacity-30 mix-blend-soft-light" />
      <div className="shell relative z-10 pb-16 pt-36 lg:pb-20"><div className="max-w-4xl">
        <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.32em] text-gold"><span className="h-px w-10 bg-gold" />Asociație culturală · România</p>
        <h1 className="font-display text-[clamp(4.3rem,11vw,10.8rem)] leading-[.76] tracking-[-.065em]">Arta ne<br /><span className="ml-[.12em] italic text-gold">unește.</span></h1>
        <div className="mt-10 flex max-w-2xl flex-col gap-7 border-l border-cream/35 pl-5 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">Munca voluntară aduce arta la țară și ne face mai puternici, mai buni, mai aproape.</p><Link href="#poveste" className="group inline-flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[.18em]">Descoperă povestea <span className="grid size-11 place-items-center rounded-full bg-terracotta transition-transform group-hover:rotate-45"><ArrowUpRight className="size-5" /></span></Link></div>
      </div></div>
    </section>

    <section id="poveste" className="relative overflow-hidden py-24 lg:py-36"><span className="absolute -right-10 top-5 select-none font-display text-[16rem] leading-none text-terracotta/[.045]">dar</span><div className="shell grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><Reveal><p className="eyebrow text-terracotta">Asociația Arta în Dar</p><div className="mt-10 flex items-center gap-4"><span className="font-display text-7xl italic text-gold">A</span><span className="h-px flex-1 bg-ink/20" /></div></Reveal><Reveal delay={.1}><h2 className="heading-lg">Ne lăsăm purtați de vânt pentru că suntem <em>creativi.</em></h2><div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2"><p className="body-copy">Promovăm agroturismul, turismul la țară, turismul cultural, afacerile locale și taberele de creație care înnobilează dealurile celor patru comune.</p><div><p className="body-copy">Faraoani, Luizi Călugăra, Sărata și Nicolae Bălcescu — locuri din care arătăm lumii tot ce avem mai bun și mai valoros.</p><Link href="/despre-noi" className="text-link mt-6">Cunoaște asociația <ArrowUpRight className="size-4" /></Link></div></div></Reveal></div></section>

    <section className="bg-olive py-24 text-cream lg:py-32"><div className="shell grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><Reveal><p className="eyebrow text-gold">Oamenii care au spus „da”</p><h2 className="mt-5 font-display text-6xl leading-[.88] md:text-8xl">Primul nostru<br /><em className="text-gold">voluntar.</em></h2><p className="mt-8 font-display text-3xl">Di. Gheorghe Jitaru</p><p className="mt-3 max-w-sm text-cream/65">Un început se măsoară uneori într-un singur om care alege să fie acolo.</p></Reveal><Reveal delay={.1}><ArchiveImage type="portrait" label="Di. Gheorghe Jitaru, primul voluntar al asociației" /></Reveal></div></section>

    <section className="canvas-section py-24 lg:py-32"><div className="shell"><Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow text-terracotta">Noutăți 2025</p><h2 className="heading-xl mt-5">Un loc nou<br /><em>în câmp.</em></h2></div><span className="font-display text-7xl italic text-gold">’25</span></Reveal><div className="mt-14 grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><Reveal><h3 className="font-display text-4xl leading-tight">În această iarnă, prioritatea asociației este amenajarea Centrului „În Câmp”.</h3><p className="body-copy mt-7">Centru de administrare a traseului 7 Capele, de evenimente și de primire pro bono a oricui, la orice oră.</p><Link href="/contact" className="button-dark mt-8">Contactează-ne pentru detalii <ArrowUpRight className="size-4" /></Link></Reveal><Reveal delay={.1}><ArchiveImage type="news" label="Voluntari amenajând Centrul În Câmp și traseul 7 Capele" /></Reveal></div></div></section>

    <section className="bg-terracotta py-24 text-cream lg:py-32"><div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><Reveal><ArchiveImage type="volunteer" label="Tricourile voluntarilor Arta în Dar" /></Reveal><Reveal delay={.1}><p className="eyebrow text-gold">Munca voluntară · Arta la țară</p><h2 className="mt-5 font-display text-6xl leading-[.9] md:text-8xl">În fiecare<br /><em>sâmbătă.</em></h2><p className="mt-8 max-w-md text-xl leading-relaxed text-cream/75">Program de muncă voluntară în fiecare sâmbătă, de la ora 9 la ora 12.</p><Link href="/doneaza-fii-voluntar" className="button-light mt-9">Vino alături de noi <ArrowUpRight className="size-4" /></Link></Reveal></div></section>

    <section className="py-24 lg:py-36"><div className="shell grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20"><Reveal><p className="eyebrow text-terracotta">Transparență</p><h2 className="heading-xl mt-5">Dare de<br /><em>seamă.</em></h2><p className="mt-7 max-w-xl font-display text-2xl leading-tight">Privind modul de cheltuire a bănuților și de folosire a materialelor sponsorizate la basorelieful „Trecut — Prezent”.</p><div className="mt-10 space-y-4 border-t border-ink/15 pt-8">{financialReport.map((line, index) => <p key={line} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed text-ink/70"><span className="font-display text-lg italic text-terracotta">{String(index + 1).padStart(2,"0")}</span>{line}</p>)}</div><p className="mt-8 border-l-2 border-gold pl-5 font-display text-2xl italic">Nu avem nimic de ascuns. Învățăm cum să fim mai transparenți decât transparența.</p></Reveal><Reveal delay={.1} className="lg:pt-16"><ArchiveImage type="report" label="Basorelieful Trecut–Prezent și Cartea Drumețului" /><p className="mt-7 text-sm leading-relaxed text-ink/65">Încă o dată, echipa Arta în Dar vă mulțumește cu recunoștință, în timp ce pregătește următoarele trei evenimente și proiectul pentru anul 2026: „Să ne regăsim întru frumos”.</p><Link href="/documente" className="text-link mt-7">Vezi istoricul evenimentelor <ArrowUpRight className="size-4" /></Link></Reveal></div></section>

    <section className="bg-olive py-20 text-cream"><div className="shell"><Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-gold">Povestea continuă</p><h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">Să ne regăsim<br /><em>întru frumos.</em></h2></div><Link href="/doneaza-fii-voluntar" className="button-light w-fit">Fii parte din poveste <ArrowUpRight className="size-4" /></Link></Reveal></div></section>

    <section className="py-20"><div className="shell"><Reveal><p className="text-center text-[10px] font-bold uppercase tracking-[.26em] text-ink/45">Creștem prin încredere și colaborare</p><div className="mt-9 grid grid-cols-2 border-l border-t border-ink/15 lg:grid-cols-4">{partners.map(partner => <div key={partner} className="grid min-h-28 place-items-center border-b border-r border-ink/15 px-4 text-center font-display text-lg text-ink/60">{partner}</div>)}</div></Reveal></div></section>
  </main>;
}
