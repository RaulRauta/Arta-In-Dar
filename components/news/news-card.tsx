import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { formatNewsDate, type NewsPostCard } from "@/lib/news";

type NewsCardProps = {
  post: NewsPostCard;
  index: number;
};

export function NewsCard({ post, index }: NewsCardProps) {
  return (
    <Link className={`news-card news-card--${post.cardStyle}`} href={`/noutati/${post.slug}`}>
      <span className="news-card__number">{String(index + 1).padStart(2, "0")}</span>
      <span className="news-card__staff" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      {post.cardImage ? (
        <span className="news-card__image">
          <Image src={post.cardImage} alt={post.cardImageAlt || post.title} fill sizes="(max-width: 767px) 90vw, 34vw" />
        </span>
      ) : (
        <span className="news-card__symbol" aria-hidden="true">
          ♪
        </span>
      )}
      <span className="news-card__meta">
        <small>{post.category || "Noutate"}</small>
        <small>{formatNewsDate(post.publishedAt)}</small>
      </span>
      <span className="news-card__voice">
        <small>{post.author?.isOfficial ? "Voce oficială" : "Voce principală"}</small>
        <b>{post.author?.name || "Arta în dar"}</b>
        {post.coAuthors?.length ? <em>+ acompaniament</em> : null}
      </span>
      <strong>{post.cardTitle || post.title}</strong>
      {post.cardSummary ? <span className="news-card__summary">{post.cardSummary}</span> : null}
      <span className="news-card__open">
        Citește noutatea <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
