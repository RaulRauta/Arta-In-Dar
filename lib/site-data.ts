export const navigation = [
  { label: "Acasă", href: "/", art: "collage", kicker: "Expoziție vie", story: "Fragmente de artă, oameni și locuri puse împreună." },
  { label: "Despre noi", href: "/despre-noi", art: "sculpture", kicker: "Formă și materie", story: "O poveste cioplită în timp, gest cu gest." },
  { label: "Pelerinaj 7 Capele", href: "/pelerinaj-7-capele", art: "manuscript", kicker: "Jurnal de călătorie", story: "Șapte opriri, un drum desenat de mână." },
  { label: "Donează / Fii voluntar", href: "/doneaza-fii-voluntar", art: "theatre", kicker: "Scena comunității", story: "Intră în lumină. Povestea are nevoie și de tine." },
  { label: "Documente", href: "/documente", art: "archive", kicker: "Arhiva deschisă", story: "Urmele clare ale lucrurilor făcute cu rost." },
  { label: "Distincții", href: "/distinctii", art: "medallion", kicker: "Semne de recunoaștere", story: "Momente care ne onorează și ne obligă să continuăm." },
  { label: "Contact", href: "/contact", art: "calligraphy", kicker: "O scrisoare deschisă", story: "Orice proiect frumos începe cu un «bună»." },
] as const;

export const featuredProjects = [
  {
    number: "01",
    category: "Patrimoniu · Turism cultural",
    title: "Pelerinaj 7 Capele",
    description: "Un drum care leagă locuri, istorii și oameni — parcurs încet, cu ochii și inima deschise.",
    href: "/pelerinaj-7-capele",
    color: "terracotta",
  },
  {
    number: "02",
    category: "Artă · Comunitate",
    title: "Ateliere cu rost",
    description: "Întâlniri în care meșteșugul devine limbaj comun, iar fiecare gest lasă ceva în urmă.",
    href: "/despre-noi",
    color: "olive",
  },
  {
    number: "03",
    category: "Voluntariat · Educație",
    title: "Oameni care dăruiesc",
    description: "Inițiative vii, construite împreună cu voluntari, artiști și comunități locale.",
    href: "/doneaza-fii-voluntar",
    color: "gold",
  },
] as const;

export const impact = [
  { value: "7", label: "capele într-un traseu viu" },
  { value: "12+", label: "proiecte culturale" },
  { value: "450", label: "oameni aduși împreună" },
  { value: "∞", label: "idei care merg mai departe" },
] as const;

export const galleryItems = [
  { label: "Împreună", tone: "olive", position: "top" },
  { label: "Locuri", tone: "terracotta", position: "center" },
  { label: "Gesturi", tone: "gold", position: "bottom" },
  { label: "Memorie", tone: "ink", position: "center" },
] as const;

export const partners = ["Comunități locale", "Artiști & artizani", "Școli și instituții", "Prieteni ai patrimoniului"];
