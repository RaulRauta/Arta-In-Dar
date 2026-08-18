export const archiveHighlights = [
  {
    label: "Scurt istoric",
    title: "Istoric și planuri de viitor",
    description: "O fișă de arhivă despre începuturi, direcție și planurile care duc asociația mai departe.",
    href: "/documents/istoric-asociatia-arta-in-dar-2025.pdf",
    type: "PDF",
  },
  {
    label: "Document fondator",
    title: "Statutul asociației Arta în dar",
    description: "Cadrul oficial al asociației: scop, valori, organizare și responsabilități.",
    href: "/documents/statutul-asociatiei-arta-in-dar.pdf",
    type: "PDF",
  },
] as const;

export const documentSections = [
  {
    number: "01",
    title: "Redirecționează 3,5%",
    note: "Un gest fiscal simplu, pus într-o formă clară.",
    documents: [
      {
        title: "Completează formularul 230",
        description: "Platforma online pentru redirecționarea a 3,5% din impozitul pe venit către Arta în dar.",
        href: "https://formular230.ro/arta-in-dar",
        action: "Completează online",
        type: "Online",
      },
      {
        title: "Formular 230 pregătit",
        description: "Varianta PDF pregătită cu datele asociației, gata pentru descărcare.",
        href: "/documents/formular-230-arta-in-dar-2025.pdf",
        action: "Deschide PDF",
        type: "PDF",
      },
    ],
  },
  {
    number: "02",
    title: "Rapoarte de activitate",
    note: "Ce s-a lucrat, ce a prins formă și ce rămâne mărturie.",
    documents: [
      {
        title: "Raport de activitate 2025",
        description: "Raportul oficial de activitate pentru anul 2025.",
        href: "/documents/raport-activitate-arta-in-dar-2025.pdf",
        action: "Deschide raportul",
        type: "PDF",
      },
    ],
  },
  {
    number: "03",
    title: "Bilanțuri contabile",
    note: "Partea transparentă, verificabilă, a muncii făcute în comunitate.",
    documents: [
      {
        title: "Bilanț contabil 2025",
        description: "Situația financiară anuală pentru anul 2025.",
        href: "/documents/bilant-contabil-arta-in-dar-2025.pdf",
        action: "Deschide bilanțul",
        type: "PDF",
      },
      {
        title: "Bilanț contabil 2024",
        description: "Situația financiară anuală pentru anul 2024.",
        href: "/documents/bilant-contabil-arta-in-dar-2024.pdf",
        action: "Deschide bilanțul",
        type: "PDF",
      },
    ],
  },
  {
    number: "04",
    title: "Contracte",
    note: "Formulare curate pentru colaborări, donații și sponsorizări.",
    documents: [
      {
        title: "Contract de voluntariat",
        description: "Documentul pentru intrarea clară și asumată în echipa de voluntari.",
        href: "/documents/contract-voluntariat-arta-in-dar.odt",
        action: "Descarcă documentul",
        type: "ODT",
      },
      {
        title: "Contract de donație",
        description: "Modelul de contract pentru donațiile acordate asociației.",
        href: "/documents/contract-donatie-arta-in-dar.odt",
        action: "Descarcă documentul",
        type: "ODT",
      },
      {
        title: "Contract de sponsorizare",
        description: "Modelul de contract pentru companii și parteneri care susțin proiectele asociației.",
        href: "/documents/contract-sponsorizare-arta-in-dar.odt",
        action: "Descarcă documentul",
        type: "ODT",
      },
    ],
  },
] as const;
