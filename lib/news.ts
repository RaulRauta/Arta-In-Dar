import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient } from "@/lib/sanity-client";

export type NewsCardStyle = "score" | "poster" | "note" | "photo";

export type NewsPostCard = {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  category?: string;
  cardTitle?: string;
  cardSummary?: string;
  cardStyle: NewsCardStyle;
  cardImage?: string;
  cardImageAlt?: string;
  featured?: boolean;
  order?: number;
};

export type NewsPortableImage = {
  _type: "image";
  _key?: string;
  url?: string;
  alt?: string;
  caption?: string;
};

export type NewsPost = NewsPostCard & {
  lead?: string;
  heroImage?: string;
  heroImageAlt?: string;
  content?: Array<PortableTextBlock | NewsPortableImage>;
  gallery?: NewsPortableImage[];
  ctaLabel?: string;
  ctaHref?: string;
};

const newsListQuery = groq`
  *[_type == "newsPost" && visible != false && defined(slug.current)] | order(featured desc, order asc, publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    cardTitle,
    cardSummary,
    cardStyle,
    featured,
    order,
    "cardImage": cardImage.asset->url,
    "cardImageAlt": coalesce(cardImage.alt, cardTitle, title)
  }
`;

const newsPostQuery = groq`
  *[_type == "newsPost" && visible != false && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    cardTitle,
    cardSummary,
    cardStyle,
    featured,
    order,
    lead,
    ctaLabel,
    ctaHref,
    "cardImage": cardImage.asset->url,
    "cardImageAlt": coalesce(cardImage.alt, cardTitle, title),
    "heroImage": heroImage.asset->url,
    "heroImageAlt": coalesce(heroImage.alt, title),
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "alt": coalesce(alt, ^.title)
      }
    },
    gallery[]{
      ...,
      "url": asset->url,
      "alt": coalesce(alt, ^.title)
    }
  }
`;

export async function getNewsPosts(): Promise<NewsPostCard[]> {
  try {
    const posts = await sanityClient.fetch<NewsPostCard[]>(
      newsListQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return (posts || []).map((post) => ({
      ...post,
      cardStyle: post.cardStyle || "score",
    }));
  } catch (error) {
    console.warn("Sanity news fetch failed", error);
    return [];
  }
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    const post = await sanityClient.fetch<NewsPost | null>(
      newsPostQuery,
      { slug },
      { next: { revalidate: 60 } },
    );

    if (!post) {
      return null;
    }

    return {
      ...post,
      cardStyle: post.cardStyle || "score",
      content: post.content || [],
      gallery: post.gallery || [],
    };
  } catch (error) {
    console.warn("Sanity news post fetch failed", error);
    return null;
  }
}

export function formatNewsDate(date?: string) {
  if (!date) {
    return "Dată în lucru";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
