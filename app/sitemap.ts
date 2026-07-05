import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-05");
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/ai-lead-automation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.75, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified,
  }));
}
