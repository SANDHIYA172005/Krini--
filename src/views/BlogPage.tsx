import { routes, site } from "../content/site";
import { articles, categories, readingTime } from "../content/articles";
import { abs, blog, breadcrumbs, webPage } from "../content/schema";
import { seo, trail } from "../content/pages";
import { Shell } from "../components/Shell";
import { Breadcrumbs } from "../components/PageHeader";
import { Arrow, MediaSlot } from "../components/ui";

/**
 * Blog: the heading, a line about it and the topic chips across the top, then
 * every guide as a card of the same size in an even grid: a photo frame, the
 * topic and reading time, the title, two lines of summary, "Read the guide". The chips filter the grid
 * (src/motion/interactions.ts, initFilters); without scripts every card shows.
 */
export function BlogPage() {
  const p = site.pages.blog;
  const t = trail.blog;
  const used = categories.filter((c) => articles.some((a) => a.category === c));
  return (
    <Shell
      current="blog"
      schema={[webPage(seo.blog, "CollectionPage", { mainEntity: { "@id": `${abs(seo.blog.path)}#blog` } }), breadcrumbs(t), blog(articles)]}
    >
      <section className="board" aria-labelledby="page-title">
        <div className="frame">
          <header className="board-head">
            <div className="board-head-text">
              <Breadcrumbs trail={t} />
              <h1 id="page-title" className="board-title display">
                {p.heading}
              </h1>
              <p className="board-lead">{site.blog.lead}</p>
            </div>
            <div className="board-filters filters" role="group" aria-label={p.filter} data-filters>
              <button type="button" className="filter" aria-pressed="true" data-filter="all">
                All <span className="filter-n">{articles.length}</span>
              </button>
              {used.map((c) => (
                <button key={c} type="button" className="filter" aria-pressed="false" data-filter={c}>
                  {c} <span className="filter-n">{articles.filter((a) => a.category === c).length}</span>
                </button>
              ))}
            </div>
          </header>

          <ul className="bgrid" data-filter-list>
            {articles.map((a) => (
              <li key={a.slug} data-category={a.category}>
                <article className="bcard">
                  <div className="bcard-media">
                    <MediaSlot label="Guide photo" />
                  </div>
                  <div className="bcard-body">
                    <p className="bcard-top">
                      <span className="bcard-chip">{a.category}</span>
                      <span className="bcard-time">{readingTime(a)} min read</span>
                    </p>
                    <h2 className="bcard-title">
                      <a href={routes.article(a.slug)} className="bcard-link">
                        {a.title}
                      </a>
                    </h2>
                    <p className="bcard-sum">{a.summary}</p>
                    <p className="bcard-meta">
                      <span className="bcard-go" aria-hidden="true">
                        Read the guide <Arrow />
                      </span>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="sr-only" role="status" aria-live="polite" data-filter-status />
        </div>
      </section>
    </Shell>
  );
}
