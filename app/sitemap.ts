import type { MetadataRoute } from "next";
import { site } from "../src/content/site";
import { allPages } from "../src/content/pages";

export const dynamic = "force-static";

/** Every page on the site (src/content/pages.ts). Update CONTENT_DATE when the copy changes. */
const CONTENT_DATE = new Date("2026-10-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages().map((p) => ({
    url: new URL(p.path, site.url).toString(),
    lastModified: CONTENT_DATE,
    changeFrequency: p.key.startsWith("article:") ? "yearly" : "monthly",
    priority: p.priority,
  }));
}
