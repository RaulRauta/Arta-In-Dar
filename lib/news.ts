import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient } from "@/lib/sanity-client";

export type NewsCardStyle = "score" | "poster" | "note" | "photo";

export type NewsAuthor = {
  id: string;
  name: string;
  slug?: string;
  role?: string;
  image?: string;
  imageAlt?: string;
  shortBio?: string;
  isOfficial?: boolean;
};

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
  author?: NewsAuthor;
  coAuthors?: NewsAuthor[];
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
  *[_type == "newsPost" && visible != false && defined(slug.current) && defined(publishedAt)] | order(featured desc, order asc, publishedAt desc) {
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
    "cardImageAlt": coalesce(cardImage.alt, cardTitle, title),
    "author": author->{
      "id": _id,
      name,
      "slug": slug.current,
      role,
      shortBio,
      isOfficial,
      "image": image.asset->url,
      "imageAlt": coalesce(image.alt, name)
    },
    "coAuthors": coAuthors[]->{
      "id": _id,
      name,
      "slug": slug.current,
      role,
      shortBio,
      isOfficial,
      "image": image.asset->url,
      "imageAlt": coalesce(image.alt, name)
    }
  }
`;

const newsPostQuery = groq`
  *[_type == "newsPost" && visible != false && defined(publishedAt) && slug.current == $slug][0] {
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
    "author": author->{
      "id": _id,
      name,
      "slug": slug.current,
      role,
      shortBio,
      isOfficial,
      "image": image.asset->url,
      "imageAlt": coalesce(image.alt, name)
    },
    "coAuthors": coAuthors[]->{
      "id": _id,
      name,
      "slug": slug.current,
      role,
      shortBio,
      isOfficial,
      "image": image.asset->url,
      "imageAlt": coalesce(image.alt, name)
    },
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
      author: post.author || officialNewsAuthor,
      coAuthors: post.coAuthors || [],
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
      author: post.author || officialNewsAuthor,
      coAuthors: post.coAuthors || [],
      content: post.content || [],
      gallery: post.gallery || [],
    };
  } catch (error) {
    console.warn("Sanity news post fetch failed", error);
    return null;
  }
}

export const officialNewsAuthor: NewsAuthor = {
  id: "official-arta-in-dar",
  name: "Arta în dar",
  role: "Voce oficială",
  shortBio:
    "Autorul oficial al asociației pentru comunicate, anunțuri și povești publicate în numele echipei.",
  isOfficial: true,
};

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
