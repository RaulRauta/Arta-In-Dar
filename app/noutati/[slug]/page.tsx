import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/ui/icons";
import { formatNewsDate, getNewsPost, type NewsAuthor, type NewsPortableImage } from "@/lib/news";

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

function AuthorAvatar({ author }: { author: NewsAuthor }) {
  if (author.image) {
    return <Image src={author.image} alt={author.imageAlt || author.name} width={96} height={96} />;
  }

  return <span aria-hidden="true">{author.name.charAt(0)}</span>;
}

function NewsAuthorCard({
  author,
  label,
  lead,
}: {
  author: NewsAuthor;
  label: string;
  lead?: boolean;
}) {
  return (
    <article className={`news-author-card${lead ? " news-author-card--lead" : ""}`}>
      <div className="news-author-card__avatar">
        <AuthorAvatar author={author} />
      </div>
      <div>
        <p>{label}</p>
        <h3>{author.name}</h3>
        {author.role ? <small>{author.role}</small> : null}
        {author.shortBio ? <span>{author.shortBio}</span> : null}
      </div>
    </article>
  );
}

function NewsEnsemble({ author, coAuthors }: { author?: NewsAuthor; coAuthors?: NewsAuthor[] }) {
  if (!author && !coAuthors?.length) {
    return null;
  }

  const supportingAuthors = coAuthors || [];

  return (
    <section className="news-ensemble" aria-labelledby="news-ensemble-title">
      <div className="shell news-ensemble__inner">
        <div className="news-ensemble__intro">
          <p className="eyebrow">Vocile articolului</p>
          <h2 id="news-ensemble-title">Ansamblul articolului</h2>
        </div>
        <div className="news-ensemble__grid">
          {author ? (
            <NewsAuthorCard
              author={author}
              label={author.isOfficial ? "Voce oficială" : "Voce principală"}
              lead
            />
          ) : null}
          {supportingAuthors.map((coAuthor) => (
            <NewsAuthorCard key={coAuthor.id} author={coAuthor} label="Acompaniament" />
          ))}
        </div>
      </div>
    </section>
  );
}

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

        <NewsEnsemble author={post.author} coAuthors={post.coAuthors} />

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
