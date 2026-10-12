import { notFound } from "next/navigation";
import { ArticlePage } from "../../../src/views/ArticlePage";
import { articleBySlug, articles } from "../../../src/content/articles";
import { articleSeo } from "../../../src/content/pages";
import { pageMetadata } from "../../../src/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

/** One page per article (src/content/articles.ts). */
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = articleBySlug((await params).slug);
  return a ? pageMetadata(articleSeo(a)) : {};
}

export default async function Page({ params }: Props) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  return <ArticlePage a={a} />;
}
