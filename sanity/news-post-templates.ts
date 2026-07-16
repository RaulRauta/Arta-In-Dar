export type NewsPostTemplateId =
  | "free"
  | "threePhotosFiveRows"
  | "photoReport"
  | "shortAnnouncement"
  | "interview"
  | "eventRecap"
  | "beforeAfter"
  | "travelJournal"
  | "profileStory"
  | "quoteFeature";

export type NewsPostTemplateGuide = {
  id: NewsPostTemplateId;
  title: string;
  shortTitle: string;
  description: string;
  bestFor: string;
  structure: string;
  imageHint: string;
  textHint: string;
  wireframe: "free" | "three" | "report" | "announcement" | "qa" | "timeline" | "compare" | "profile" | "quote";
};

export const newsPostTemplates: NewsPostTemplateGuide[] = [
  {
    id: "free",
    title: "Liber · text și imagini manual",
    shortTitle: "Liber",
    description: "Pentru articole care nu trebuie să urmeze o structură fixă.",
    bestFor: "Comunicate lungi, texte speciale, povești care au nevoie de libertate totală.",
    structure: "Editor clasic: text, subtitluri, liste, citate și imagini introduse manual.",
    imageHint: "Adaugă imaginile direct în câmpul Conținut articol.",
    textHint: "Scrie natural, cu subtitluri clare pentru citire ușoară.",
    wireframe: "free",
  },
  {
    id: "threePhotosFiveRows",
    title: "3 poze · 5 rânduri de poveste",
    shortTitle: "3 poze / 5 rânduri",
    description: "Un format scurt, cald și foarte ușor de parcurs.",
    bestFor: "O zi de voluntariat, o vizită, un moment mic dar important.",
    structure: "O introducere, exact 3 imagini recomandate și până la 5 rânduri/momente.",
    imageHint: "Pune 3 fotografii bune: una principală și două de atmosferă.",
    textHint: "Completează 5 rânduri scurte: ce s-a întâmplat, cine a fost, ce a rămas.",
    wireframe: "three",
  },
  {
    id: "photoReport",
    title: "Reportaj foto · galerie mare + notițe",
    shortTitle: "Reportaj foto",
    description: "Postare construită în jurul imaginilor, cu text scurt de ghidaj.",
    bestFor: "Evenimente, ateliere, acțiuni în teren, momente vizuale puternice.",
    structure: "Titlu, introducere, galerie vizuală mare și notițe/momente sub ea.",
    imageHint: "Adaugă 6–12 imagini; prima trebuie să fie cea mai puternică.",
    textHint: "Rândurile trebuie să explice contextul, nu să repete ce se vede în poze.",
    wireframe: "report",
  },
  {
    id: "shortAnnouncement",
    title: "Anunț scurt · mesaj + buton",
    shortTitle: "Anunț",
    description: "Format direct, clar, cu un call-to-action vizibil.",
    bestFor: "Înscrieri, apeluri la voluntariat, invitații, informări rapide.",
    structure: "Mesaj scurt, opțional o imagine, apoi buton către contact/formular/link.",
    imageHint: "Folosește o singură imagine dacă ajută mesajul; nu aglomera.",
    textHint: "Spune ce, când, unde și ce trebuie să facă omul mai departe.",
    wireframe: "announcement",
  },
  {
    id: "interview",
    title: "Interviu · întrebare și răspuns",
    shortTitle: "Interviu",
    description: "Postare ritmată, ușor de citit, cu întrebări și răspunsuri.",
    bestFor: "Autori, voluntari, artiști, parteneri, oameni din comunitate.",
    structure: "Introducere, imagine opțională și rânduri folosite ca Q&A.",
    imageHint: "O poză de portret sau o imagine de context este suficientă.",
    textHint: "În fiecare rând: eticheta poate fi întrebarea, textul poate fi răspunsul.",
    wireframe: "qa",
  },
  {
    id: "eventRecap",
    title: "Eveniment · recapitulare pe momente",
    shortTitle: "Recap eveniment",
    description: "Spune povestea unui eveniment prin momente distincte.",
    bestFor: "Tabere, vernisaje, întâlniri, activități cu mai multe etape.",
    structure: "Introducere, fotografii, apoi momente numerotate sau etichetate.",
    imageHint: "Alege imagini pentru început, mijloc și final.",
    textHint: "Fiecare rând trebuie să fie un moment: pregătire, desfășurare, impact.",
    wireframe: "timeline",
  },
  {
    id: "beforeAfter",
    title: "Înainte / după · două imagini + explicații",
    shortTitle: "Înainte / după",
    description: "Format foarte clar pentru transformări vizibile.",
    bestFor: "Amenajări, restaurări, curățenie, lucrări pe traseu, spații schimbate.",
    structure: "Două imagini principale, apoi explicații scurte despre transformare.",
    imageHint: "Prima imagine: înainte. A doua imagine: după. Ideal din unghiuri similare.",
    textHint: "Explică ce s-a schimbat, cine a contribuit și de ce contează.",
    wireframe: "compare",
  },
  {
    id: "travelJournal",
    title: "Jurnal de drum · pași cronologici",
    shortTitle: "Jurnal",
    description: "O postare care curge ca o hartă sau un jurnal de călătorie.",
    bestFor: "Pelerinaj, trasee, vizite la capele, turism cultural.",
    structure: "Introducere, imagini de drum și pași/rânduri cronologice.",
    imageHint: "Folosește imagini care arată parcursul, nu doar destinația.",
    textHint: "În rânduri, pune etapa, locul și observația principală.",
    wireframe: "timeline",
  },
  {
    id: "profileStory",
    title: "Poveste de partener / voluntar",
    shortTitle: "Profil",
    description: "Un format uman, construit în jurul unei persoane sau colaborări.",
    bestFor: "Voluntari, artiști, parteneri, oameni care au contribuit la proiecte.",
    structure: "Portret, introducere, citat opțional, câteva idei-cheie și buton opțional.",
    imageHint: "Alege un portret cald sau o imagine cu persoana în acțiune.",
    textHint: "Scrie despre rol, motivație, contribuție și impact.",
    wireframe: "profile",
  },
  {
    id: "quoteFeature",
    title: "Citat central · context + imagine",
    shortTitle: "Citat central",
    description: "Format artistic, concentrat pe o idee puternică.",
    bestFor: "Mesaje inspiraționale, fragmente de discurs, gânduri ale echipei.",
    structure: "Citat mare, autor, context scurt și imagine de atmosferă.",
    imageHint: "O imagine calmă, poetică, fără prea mult zgomot vizual.",
    textHint: "Citatul trebuie să fie scurt și memorabil; contextul îl explică.",
    wireframe: "quote",
  },
];

export const newsPostTemplateOptions = newsPostTemplates.map((template) => ({
  title: template.title,
  value: template.id,
}));
