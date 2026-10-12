import { routes } from "../content/site";
import { readingTime, type Article } from "../content/articles";
import { Arrow } from "./ui";

/**
 * A blog article as a card: picture with its topic as a badge, reading time,
 * title, summary. The title is the link, stretched over the whole card. The
 * picture opens like a roller shutter; on desktop the card leans toward the
 * pointer (cinema.ts). `featured`: the Blog page's first guide, larger, the
 * picture beside the text from 900px.
 */
export function ArticleCard({ a, level = 3, featured = false }: { a: Article; level?: 2 | 3; featured?: boolean }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <article className={`card group${featured ? " card-featured" : ""}`} {...(featured ? {} : { "data-tilt": "" })}>
      <div className="card-media media aspect-[4/3] rounded-sm" data-shutter>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt={a.imageAlt} width={1200} height={900} loading={featured ? "eager" : "lazy"} decoding="async" />
        <span className="card-badge label">{a.category}</span>
      </div>
      <div className="card-body">
        <p className="card-meta label">
          {featured ? <span className="text-amber">Featured guide</span> : null}
          <span className="text-mute">{readingTime(a)} min read</span>
        </p>
        <H className="card-title display-tight">
          <a href={routes.article(a.slug)} className="card-link hover:text-amber">
            {a.title}
          </a>
        </H>
        <p className="mt-3 text-mute">{a.summary}</p>
        <p className="label mt-6 inline-flex items-center gap-3 text-bone/80 group-hover:text-amber" aria-hidden="true">
          Read the guide <Arrow />
        </p>
      </div>
    </article>
  );
}
