export type TeamMember = { name: string; role: string; image: string };
export type TeamGroup = { id: string; title: string; material: string; number: string; members: TeamMember[] };

export const teamGroups: TeamGroup[] = [
  { id: "conducere", title: "Conducerea", material: "calcar", number: "I", members: [
    { name: "George Cancel", role: "Președinte", image: "/images/team/george-cancel.png" },
    { name: "Paula Tudor", role: "Vicepreședinte · coordonator echipa media", image: "/images/team/paula-tudor.png" },
    { name: "Cristina Cancel", role: "Secretar asociație", image: "/images/team/cristina-cancel.png" },
    { name: "Loredana Roca", role: "Președinte onorific", image: "/images/team/loredana-roca.png" },
  ]},
  { id: "mentenanta", title: "Mentenanță traseu 7 Capele", material: "piatra", number: "II", members: [
    { name: "Ben Jitaru", role: "Mentenanță traseu 7 Capele", image: "/images/team/ben-jitaru.png" },
    { name: "Cristi Friciu", role: "Mentenanță traseu 7 Capele", image: "/images/team/cristi-friciu.png" },
    { name: "Irina Pătrașcu", role: "Amenajări spații verzi", image: "/images/team/irina-patrascu.png" },
    { name: "Gheorghe Jitaru", role: "Veteranul asociației", image: "/images/team/gheorghe-jitaru.png" },
  ]},
  { id: "tabere", title: "Coordonatori tabere", material: "teracota", number: "III", members: [
    { name: "Vlad Emana", role: "Coordonator tabere de sculptură", image: "/images/team/vlad-emana.png" },
    { name: "Gianina Diaconu", role: "Coordonare tabere de pictură murală", image: "/images/team/gianina-diaconu.png" },
  ]},
  { id: "specialisti", title: "Specialiști", material: "lemn", number: "IV", members: [
    { name: "Ioan Jigău", role: "PSI · protecția muncii", image: "/images/team/ioan-jigau.png" },
    { name: "Lilișor Macsin", role: "Asistență medicală", image: "/images/team/lilisor-macsin.png" },
    { name: "Duma Iustin", role: "Pirogravare laser", image: "/images/team/duma-iustin.png" },
    { name: "prof. Toma Vasile", role: "Expert geografie locală", image: "/images/team/toma-vasile.png" },
  ]},
  { id: "media", title: "Media", material: "bronz", number: "V", members: [
    { name: "Alex Adrian", role: "Digital media", image: "/images/team/alex-adrian.png" },
    { name: "Alexandra Niță", role: "Marketing", image: "/images/team/alexandra-nita.png" },
    { name: "Ciprian Budău", role: "Foto și montaje video", image: "/images/team/ciprian-budau.png" },
    { name: "Corina Ciunae", role: "Comunicate de presă · Instagram", image: "/images/team/corina-ciunae.png" },
    { name: "Cristian Țarnă", role: "Designer · web design", image: "/images/team/cristian-tarna.png" },
  ]},
];
