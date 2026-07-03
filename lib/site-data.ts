export const navigation = [
  { label: "Acasă", href: "/", art: "collage" },
  { label: "Despre noi", href: "/despre-noi", art: "sculpture" },
  { label: "Pelerinaj 7 Capele", href: "/pelerinaj-7-capele", art: "manuscript" },
  { label: "Donează / Fii voluntar", href: "/doneaza-fii-voluntar", art: "theatre" },
  { label: "Documente", href: "/documente", art: "archive" },
  { label: "Distincții", href: "/distinctii", art: "medallion" },
  { label: "Contact", href: "/contact", art: "calligraphy" },
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
