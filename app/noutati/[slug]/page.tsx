import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { formatNewsDate, getNewsPost, type NewsAuthor, type NewsPortableImage, type NewsPost, type NewsTemplateBlock } from "@/lib/news";

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
    newsTemplateBlock: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateIntroImage: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateGalleryStory: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateImageTextImage: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateJournal: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateQuoteContext: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateAnnouncement: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplatePhotoReport: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateQa: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateLandmarks: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
    newsTemplateClosingCta: ({ value }) => <NewsTemplateBlockView block={value as NewsTemplateBlock} />,
  },
};

function TextLines({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  return (
    <>
      {text.split(/\n+/).map((line) => (
        <p key={line}>{line}</p>
      ))}
    </>
  );
}

function TemplateLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (!href || !children) {
    return null;
  }

  if (href.startsWith("http")) {
    return (
      <a className="news-template__link" href={href} target="_blank" rel="noreferrer">
        {children} <ArrowUpRight className="size-4" />
      </a>
    );
  }

  return (
    <Link className="news-template__link" href={href}>
      {children} <ArrowUpRight className="size-4" />
    </Link>
  );
}

function TemplateImages({ images, variant = "grid" }: { images?: NewsPortableImage[]; variant?: "grid" | "duo" | "strip" | "single" }) {
  const usableImages = (images || []).filter((image) => image.url);

  if (!usableImages.length) {
    return null;
  }

  return (
    <div className={`news-template__images news-template__images--${variant}`}>
      {usableImages.map((image, index) => (
        <figure key={image._key || `${image.url}-${index}`}>
          <Image src={image.url || ""} alt={image.alt || ""} width={900} height={720} />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function TemplateItems({ items, ordered = false }: { items?: NewsTemplateBlock["items"]; ordered?: boolean }) {
  const usableItems = (items || []).filter((item) => item.title || item.text || item.label);

  if (!usableItems.length) {
    return null;
  }

  return (
    <div className={`news-template__items${ordered ? " news-template__items--ordered" : ""}`}>
      {usableItems.map((item, index) => (
        <article key={item._key || `${item.title}-${index}`}>
          <small>{item.label || String(index + 1).padStart(2, "0")}</small>
          {item.title ? <h4>{item.title}</h4> : null}
          {item.text ? <p>{item.text}</p> : null}
        </article>
      ))}
    </div>
  );
}

function NewsTemplateBlockView({ block }: { block: NewsTemplateBlock }) {
  const presetByType: Partial<Record<NewsTemplateBlock["_type"], NonNullable<NewsTemplateBlock["preset"]>>> = {
    newsTemplateIntroImage: "introImage",
    newsTemplateGalleryStory: "galleryStory",
    newsTemplateImageTextImage: "imageTextImage",
    newsTemplateJournal: "journal",
    newsTemplateQuoteContext: "quoteContext",
    newsTemplateAnnouncement: "announcement",
    newsTemplatePhotoReport: "photoReport",
    newsTemplateQa: "qa",
    newsTemplateLandmarks: "landmarks",
    newsTemplateClosingCta: "closingCta",
  };
  const preset =
    block.preset ||
    presetByType[block._type] ||
    "introImage";

  return (
    <section className={`news-template news-template--${preset}`}>
      <div className="news-template__copy">
        {block.eyebrow ? <p className="news-template__eyebrow">{block.eyebrow}</p> : null}
        {block.title ? <h3>{block.title}</h3> : null}

        {preset === "quoteContext" ? (
          <>
            {block.quote ? <blockquote>{block.quote}</blockquote> : null}
            {block.quoteAuthor ? <cite>{block.quoteAuthor}</cite> : null}
          </>
        ) : (
          <TextLines text={block.text} />
        )}

        {block.secondaryText ? <TextLines text={block.secondaryText} /> : null}
        <TemplateItems items={block.items} ordered={preset === "journal"} />
        <TemplateLink href={block.linkHref}>{block.linkLabel}</TemplateLink>
      </div>

      {preset === "introImage" ? <TemplateImages images={block.images?.slice(0, 1)} variant="single" /> : null}
      {preset === "galleryStory" ? <TemplateImages images={block.images} variant="grid" /> : null}
      {preset === "imageTextImage" ? <TemplateImages images={block.images?.slice(0, 2)} variant="duo" /> : null}
      {preset === "photoReport" ? <TemplateImages images={block.images} variant="strip" /> : null}
      {preset === "closingCta" ? <TemplateImages images={block.images?.slice(0, 1)} variant="single" /> : null}
    </section>
  );
}

function StructuredPostImages({ images, template }: { images?: NewsPortableImage[]; template?: string }) {
  const usableImages = (images || []).filter((image) => image.url);

  if (!usableImages.length) {
    return null;
  }

  const limitedImages =
    template === "threePhotosFiveRows" ? usableImages.slice(0, 3) :
    template === "beforeAfter" ? usableImages.slice(0, 2) :
    usableImages;

  return (
    <div className={`news-structured__images news-structured__images--${template || "free"}`}>
      {limitedImages.map((image, index) => (
        <figure key={image._key || `${image.url}-${index}`}>
          <Image src={image.url || ""} alt={image.alt || ""} width={1000} height={760} />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function StructuredRows({ rows, template }: { rows?: NewsTemplateBlock["items"]; template?: string }) {
  const usableRows = (rows || []).filter((row) => row.title || row.text || row.label);

  if (!usableRows.length) {
    return null;
  }

  const limitedRows = template === "threePhotosFiveRows" ? usableRows.slice(0, 5) : usableRows;

  return (
    <div className={`news-structured__rows news-structured__rows--${template || "free"}`}>
      {limitedRows.map((row, index) => (
        <article
          className={`news-structured__row-card news-structured__row-card--${row.background || "auto"}`}
          key={row._key || `${row.title}-${index}`}
        >
          <small>{row.label || String(index + 1).padStart(2, "0")}</small>
          {row.title ? <h3>{row.title}</h3> : null}
          {row.text ? <p>{row.text}</p> : null}
        </article>
      ))}
    </div>
  );
}

function TemplateCta({ href, label }: { href?: string; label?: string }) {
  if (!href || !label) {
    return null;
  }

  if (href.startsWith("http")) {
    return (
      <a className="news-structured__cta" href={href} target="_blank" rel="noreferrer">
        {label} <ArrowUpRight className="size-4" />
      </a>
    );
  }

  return (
    <Link className="news-structured__cta" href={href}>
      {label} <ArrowUpRight className="size-4" />
    </Link>
  );
}

function NewsStructuredPost({ post }: { post: NewsPost }) {
  const template = post.postTemplate || "free";

  if (template === "free") {
    return null;
  }

  return (
    <section className={`news-structured news-structured--${template}`}>
      <div className="news-structured__intro">
        {post.templateEyebrow ? <p className="news-template__eyebrow">{post.templateEyebrow}</p> : null}
        <h2>{post.templateTitle || post.title}</h2>
        {post.templateIntro ? <TextLines text={post.templateIntro} /> : null}
      </div>

      {post.templateQuote ? (
        <figure className="news-structured__quote">
          <blockquote>{post.templateQuote}</blockquote>
          {post.templateQuoteAuthor ? <figcaption>{post.templateQuoteAuthor}</figcaption> : null}
        </figure>
      ) : null}

      <StructuredPostImages images={post.templateImages} template={template} />
      <StructuredRows rows={post.templateRows} template={template} />
      <TemplateCta href={post.templateCtaHref} label={post.templateCtaLabel} />
    </section>
  );
}

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
          <div
            className={`shell news-article__sheet${
              post.postTemplate && post.postTemplate !== "free" ? " news-article__sheet--composed" : ""
            }`}
          >
            {post.postTemplate && post.postTemplate !== "free" ? (
              <NewsStructuredPost post={post} />
            ) : post.content?.length ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : (
              <p>
                Povestea acestei noutăți se pregătește. În curând, pagina va
                aduna aici text, imagini și detalii.
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
