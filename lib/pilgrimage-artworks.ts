import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity-client";

export type PilgrimageArtwork = {
  id: string;
  title: string;
  type: "sculptura" | "basorelief" | "picturaMurala";
  artist: string;
  image?: string;
  imageAlt?: string;
  description?: string;
  order?: number;
};

const pilgrimageArtworksQuery = groq`
  *[_type == "pilgrimageArtwork" && visible != false] | order(order asc, title asc) {
    "id": _id,
    title,
    type,
    artist,
    description,
    order,
    "image": image.asset->url,
    "imageAlt": coalesce(image.alt, title)
  }
`;

export async function getPilgrimageArtworks(): Promise<PilgrimageArtwork[]> {
  try {
    const artworks = await sanityClient.fetch<PilgrimageArtwork[]>(
      pilgrimageArtworksQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return (artworks || []).map((artwork) => ({
      ...artwork,
      type: artwork.type || "sculptura",
    }));
  } catch (error) {
    console.warn("Sanity pilgrimage artworks fetch failed", error);
    return [];
  }
}
