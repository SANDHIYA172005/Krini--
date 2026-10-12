import { notFound } from "next/navigation";
import { LinePage } from "../../../src/views/LinePage";
import { lineBySlug, lines } from "../../../src/content/catalogue";
import { lineSeo } from "../../../src/content/pages";
import { pageMetadata } from "../../../src/seo/metadata";

type Props = { params: Promise<{ line: string }> };

/** One page per product line: /products/lubricants, /products/construction-chemicals, /products/aerosols. */
export const dynamicParams = false;
export function generateStaticParams() {
  return lines.map((l) => ({ line: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const line = lineBySlug((await params).line);
  return line ? pageMetadata(lineSeo(line)) : {};
}

export default async function Page({ params }: Props) {
  const line = lineBySlug((await params).line);
  if (!line) notFound();
  return <LinePage line={line} />;
}
