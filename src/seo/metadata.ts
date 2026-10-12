import type { Metadata } from "next";
import { site } from "../content/site";
import type { PageSeo } from "../content/pages";

/**
 * A page's metadata for Next.js: its own title and description, canonical
 * address, and the share card (Open Graph and X). Next.js replaces nested
 * objects rather than merging them, so every page sets its whole share card.
 */
export function pageMetadata(p: PageSeo): Metadata {
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: p.type ?? "website",
      url: p.path,
      siteName: site.name,
      locale: "en_IN",
      title: p.title,
      description: p.description,
      images: [{ url: p.image, width: 1200, height: 630, alt: p.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: [p.image],
    },
  };
}
