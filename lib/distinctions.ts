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
