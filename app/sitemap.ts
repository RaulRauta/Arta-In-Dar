import type { MetadataRoute } from "next";

const siteUrl = "https://asociatiaartaindar.ro";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
