import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity-client";

export type PilgrimageArtworkGalleryPreset =
  | "auto"
  | "duo"
  | "triptych"
  | "quad"
  | "mosaicFive"
  | "mosaicSix"
  | "mosaicSeven";

export type PilgrimageArtworkImage = {
  _key?: string;
  url?: string;
  alt?: string;
  caption?: string;
};

export type PilgrimageArtwork = {
  id: string;
  title: string;
  type: "sculptura" | "basorelief" | "picturaMurala";
  artist: string;
  image?: string;
  imageAlt?: string;
  galleryPreset?: PilgrimageArtworkGalleryPreset;
  gallery?: PilgrimageArtworkImage[];
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
    "imageAlt": coalesce(image.alt, title),
    galleryPreset,
    gallery[]{
      _key,
      "url": asset->url,
      "alt": coalesce(alt, caption, ^.title),
      caption
    }
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
      galleryPreset: artwork.galleryPreset || "auto",
      gallery: artwork.gallery || [],
    }));
  } catch (error) {
    console.warn("Sanity pilgrimage artworks fetch failed", error);
    return [];
  }
}
