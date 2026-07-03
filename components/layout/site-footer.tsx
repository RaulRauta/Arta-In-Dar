import Link from "next/link";
import { navigation } from "@/lib/site-data";
import { ArrowUpRight } from "@/components/ui/icons";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="absolute -right-24 -top-24 size-80 rounded-full border border-cream/10" />
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 border-b border-cream/15 pb-16 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div><Logo light /><p className="mt-8 max-w-md text-lg leading-relaxed text-cream/65">Punem arta în mișcare și o lăsăm să ne apropie — de oameni, de locuri și de ceea ce merită păstrat.</p></div>
          <div><p className="eyebrow text-gold">Descoperă</p><div className="mt-5 grid gap-2">{navigation.slice(1).map((item) => <Link className="w-fit py-1 text-sm text-cream/70 transition-colors hover:text-cream" key={item.href} href={item.href}>{item.label}</Link>)}</div></div>
          <div><p className="eyebrow text-gold">Scrie-ne</p><a href="mailto:contact@artaindar.ro" className="mt-5 inline-flex items-center gap-2 border-b border-cream/30 pb-1">contact@artaindar.ro <ArrowUpRight className="size-4" /></a><div className="mt-8 flex gap-4 text-sm text-cream/65"><a href="#">Facebook</a><a href="#">Instagram</a></div></div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Asociația Arta în Dar</p><div className="flex gap-5"><Link href="/politica-confidentialitate">Confidențialitate</Link><Link href="/termeni">Termeni</Link></div></div>
      </div>
    </footer>
  );
}
