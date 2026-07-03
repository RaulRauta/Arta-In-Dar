import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Arta în Dar — pagina principală" className={`group inline-flex items-center gap-3 ${light ? "text-cream" : "text-ink"}`}>
      <span className="relative grid size-10 place-items-center rounded-full border border-current/30 transition-transform duration-500 group-hover:rotate-12">
        <span className="font-display text-xl italic">A</span>
        <span className="absolute -right-0.5 top-1 size-2 rounded-full bg-gold" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl">Arta în Dar</span>
        <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.26em] opacity-65">Asociație culturală</span>
      </span>
    </Link>
  );
}
