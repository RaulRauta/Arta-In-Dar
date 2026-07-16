import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity-client";

export type AboutTeamMember = {
  id: string;
  name: string;
  role: string;
  image?: string;
  imageAlt?: string;
  shortDescription?: string;
  bio?: string;
  quote?: string;
  order?: number;
};

export type AboutTeamGroup = {
  id: string;
  title: string;
  material: "calcar" | "piatra" | "teracota" | "lemn" | "bronz";
  number?: string;
  description?: string;
  order?: number;
  members: AboutTeamMember[];
};

const aboutTeamQuery = groq`
  *[_type == "teamGroup" && visible != false] | order(order asc, title asc) {
    "id": _id,
    title,
    material,
    number,
    description,
    order,
    "members": *[
      _type == "teamMember" &&
      visible != false &&
      references(^._id)
    ] | order(order asc, name asc) {
      "id": _id,
      name,
      role,
      shortDescription,
      bio,
      quote,
      order,
      "image": image.asset->url,
      "imageAlt": coalesce(image.alt, name)
    }
  }
`;

export async function getAboutTeamGroups(): Promise<AboutTeamGroup[]> {
  try {
    const groups = await sanityClient.fetch<AboutTeamGroup[]>(
      aboutTeamQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return groups
      .map((group) => ({
        ...group,
        material: group.material || "calcar",
        members: group.members || [],
      }))
      .filter((group) => group.members.length > 0);
  } catch (error) {
    console.warn("Sanity team fetch failed", error);
    return [];
  }
}

