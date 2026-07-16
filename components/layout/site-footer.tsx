import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";
import { ArrowUpRight } from "@/components/ui/icons";
import { navigation } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="absolute -right-24 -top-24 size-80 rounded-full border border-cream/10" />

      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 border-b border-cream/15 pb-16 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <Logo light />

            <div className="mt-7 flex items-center gap-5">
              <Image
                src="/images/logo-arta-in-dar-7-capele.png"
                alt="Siglele Arta în dar și 7 Capele, muzeu în aer liber"
                width={118}
                height={118}
                className="h-auto w-24 opacity-90"
              />
              <p className="max-w-sm text-lg leading-relaxed text-cream/65">
                Punem arta în mișcare și o lăsăm să ne apropie — de oameni, de
                locuri și de ceea ce merită păstrat.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold">Descoperă</p>
            <div className="mt-5 grid gap-2">
              {navigation.slice(1).map((item) => (
                <Link
                  className="w-fit py-1 text-sm text-cream/70 transition-colors hover:text-cream"
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold">Găsește-ne</p>
            <a
              href="mailto:artaindar7@yahoo.com"
              className="mt-5 inline-flex items-center gap-2 border-b border-cream/30 pb-1"
            >
              artaindar7@yahoo.com <ArrowUpRight className="size-4" />
            </a>
            <a
              href="https://www.google.com/maps/place/Asociatia+Arta+in+dar/@46.4436299,26.9142995,815m/data=!3m2!1e3!4b1!4m6!3m5!1s0x40b57300384db8c1:0x37b860914a37a19f!8m2!3d46.4436299!4d26.9142995!16s%2Fg%2F11x08kp4bm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block max-w-xs text-sm leading-relaxed text-cream/60 transition-colors hover:text-cream"
            >
              Loc. Nicolae Bălcescu, Str. Al. I. Cuza nr. 222, jud. Bacău,
              România
            </a>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-cream/65">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/people/Asociatia-Arta-in-dar/100064292341135/"
              >
                Facebook
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCmSRcPm4WzA8BH3YggbJuyQ"
              >
                YouTube
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/pelerinaj7capele/"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Asociația Arta în dar · Powered By{" "}
            <a
              href="https://flowcraftstudio.app/ro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#34d399] transition hover:text-[#22d3ee]"
            >
              <Image
                src="/images/flowcraft-logo-icon.png"
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
              FlowCraftStudio
            </a>
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/documente#politica-de-confidentialitate">
              Politica de confidențialitate
            </Link>
            <Link href="/documente">Documente</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
