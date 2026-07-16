import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity-client";

export type Distinction = {
  id: string;
  title: string;
  year: string;
  category?: string;
  tone: "gold" | "bronze" | "paper";
  image?: string;
  imageAlt?: string;
  description?: string;
  order?: number;
};

export type DistinctionsPageContent = {
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  coinLabel: string;
  coinYears: string;
  ledgerEyebrow: string;
  ledgerTitle: string;
  ledgerAccent: string;
  galleryEmptyTitle: string;
  galleryEmptyDescription: string;
  finaleEyebrow: string;
  finaleTitle: string;
  finaleAccent: string;
  finaleDescription: string;
};

const defaultDistinctionsPageContent: DistinctionsPageContent = {
  seoTitle: "Distincții",
  seoDescription:
    "Distincțiile și recunoașterile primite de Asociația Arta în dar pentru proiecte culturale, voluntariat și patrimoniu local.",
  heroEyebrow: "Semne de recunoaștere",
  heroTitle: "Distincții",
  heroAccent: "gravate în timp.",
  heroDescription:
    "Nu le tratăm ca pe trofee de vitrină. Le așezăm ca mărturii ale unei munci făcute cu oameni, pentru locuri care merită privite cu mai multă grijă.",
  coinLabel: "Arta în dar",
  coinYears: "2024—2026",
  ledgerEyebrow: "Registru de onoare",
  ledgerTitle: "Recunoaștere care nu închide povestea,",
  ledgerAccent: "o obligă să continue.",
  galleryEmptyTitle: "Distincțiile vor fi adăugate din Sanity.",
  galleryEmptyDescription:
    "Când vei adăuga prima distincție în panoul de administrare, ea va apărea automat aici.",
  finaleEyebrow: "Dincolo de medalie",
  finaleTitle: "Cea mai importantă distincție rămâne",
  finaleAccent: "încrederea comunității.",
  finaleDescription:
    "Fiecare recunoaștere spune că arta, voluntariatul și patrimoniul local pot deveni un limbaj comun. De aici mergem mai departe.",
};

const distinctionsQuery = groq`
  *[_type == "distinction" && visible != false] | order(order asc, year desc, title asc) {
    "id": _id,
    title,
    year,
    category,
    tone,
    description,
    order,
    "image": image.asset->url,
    "imageAlt": coalesce(image.alt, title)
  }
`;

const distinctionsPageQuery = groq`
  *[_type == "distinctionsPage"][0] {
    seoTitle,
    seoDescription,
    heroEyebrow,
    heroTitle,
    heroAccent,
    heroDescription,
    coinLabel,
    coinYears,
    ledgerEyebrow,
    ledgerTitle,
    ledgerAccent,
    galleryEmptyTitle,
    galleryEmptyDescription,
    finaleEyebrow,
    finaleTitle,
    finaleAccent,
    finaleDescription
  }
`;

export async function getDistinctions(): Promise<Distinction[]> {
  try {
    const distinctions = await sanityClient.fetch<Distinction[]>(
      distinctionsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return (distinctions || []).map((item) => ({
      ...item,
      tone: item.tone || "gold",
    }));
  } catch (error) {
    console.warn("Sanity distinctions fetch failed", error);
    return [];
  }
}

export async function getDistinctionsPageContent(): Promise<DistinctionsPageContent> {
  try {
    const content = await sanityClient.fetch<Partial<DistinctionsPageContent> | null>(
      distinctionsPageQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return {
      ...defaultDistinctionsPageContent,
      ...(content || {}),
    };
  } catch (error) {
    console.warn("Sanity distinctions page fetch failed", error);
    return defaultDistinctionsPageContent;
  }
}
