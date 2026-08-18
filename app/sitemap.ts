import type { MetadataRoute } from "next";
import { getNewsPosts } from "@/lib/news";
import { getSiteUrl } from "@/lib/site-url";

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/despre-noi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pelerinaj-7-capele", priority: 0.9, changeFrequency: "monthly" },
  { path: "/doneaza-fii-voluntar", priority: 0.85, changeFrequency: "monthly" },
  { path: "/noutati", priority: 0.8, changeFrequency: "weekly" },
  { path: "/documente", priority: 0.7, changeFrequency: "monthly" },
  { path: "/distinctii", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.75, changeFrequency: "yearly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const newsRoutes = (await getNewsPosts()).map((post) => ({
    url: `${siteUrl}/noutati/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.75 : 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
