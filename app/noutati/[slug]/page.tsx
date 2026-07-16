import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/ui/icons";
import { formatNewsDate, getNewsPost, type NewsPortableImage } from "@/lib/news";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";

      return (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as NewsPortableImage;

      if (!image.url) {
        return null;
      }

      return (
        <figure className="news-article__figure">
          <Image src={image.url} alt={image.alt || ""} width={1200} height={800} />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      );
    },
  },
};

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    return { title: "Noutate negăsită" };
  }

  return {
    title: post.title,
    description: post.lead || post.cardSummary || "Noutate publicată de Asociația Arta în dar.",
    openGraph: {
      title: post.title,
      description: post.lead || post.cardSummary || undefined,
      images: post.heroImage || post.cardImage ? [{ url: post.heroImage || post.cardImage || "" }] : undefined,
    },
  };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="news-post-page">
      <article>
        <header className="news-post-hero">
          <div className="news-post-hero__lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="shell news-post-hero__inner">
            <div className="news-post-hero__copy">
              <Link href="/noutati" className="news-back-link">
                ← Înapoi la noutăți
              </Link>
              <p className="eyebrow">
                {post.category || "Noutate"} · {formatNewsDate(post.publishedAt)}
              </p>
              <h1>{post.title}</h1>
              {post.lead ? <p>{post.lead}</p> : null}
            </div>
            <div className={`news-post-hero__image news-post-hero__image--${post.cardStyle}`}>
              {post.heroImage || post.cardImage ? (
                <Image
                  src={post.heroImage || post.cardImage || ""}
                  alt={post.heroImageAlt || post.cardImageAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 767px) 92vw, 42vw"
                />
              ) : (
                <span aria-hidden="true">♫</span>
              )}
            </div>
          </div>
        </header>

        <section className="news-article">
          <div className="shell news-article__sheet">
            {post.content?.length ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : (
              <p>
                Conținutul acestei noutăți urmează să fie completat în Sanity. Cardul există deja,
                iar pagina este pregătită pentru text, imagini și detalii.
              </p>
            )}

            {post.gallery?.length ? (
              <div className="news-article__gallery" aria-label="Galerie noutate">
                {post.gallery.map((image, index) =>
                  image.url ? (
                    <figure key={image._key || `${image.url}-${index}`}>
                      <Image src={image.url} alt={image.alt || ""} width={900} height={720} />
                      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                    </figure>
                  ) : null,
                )}
              </div>
            ) : null}

            {post.ctaLabel && post.ctaHref ? (
              <Link className="news-article__cta" href={post.ctaHref}>
                {post.ctaLabel} <ArrowUpRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </main>
  );
}
