import { site } from "../content/site";
import { articles, categories } from "../content/articles";
import { abs, blog, breadcrumbs, webPage } from "../content/schema";
import { seo, trail } from "../content/pages";
import { Shell } from "../components/Shell";
import { PageHeader } from "../components/PageHeader";
import { ArticleCard } from "../components/ArticleCard";
import { CtaBand } from "../components/CtaBand";
import { HeaderFigure } from "../components/Blocks";

/**
 * Blog: every guide, the first one featured across the full width, with a
 * filter by topic in a bar above them (the buttons appear once scripts run,
 * src/motion/interactions.ts, initFilters; without them all guides show).
 * Each card carries its topic as a badge on its picture.
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
      <PageHeader
        trail={t}
        label={p.label}
        title={p.heading}
        lead={site.blog.lead}
        aside={<HeaderFigure src="/images/blog-head-43.webp" alt="A drop of amber oil landing on a steel plate" caption="Guides from the Krini Crude team" />}
      />
      <section className="section-tight" aria-labelledby="articles-title">
        <div className="frame">
          <h2 id="articles-title" className="sr-only">
            All guides
          </h2>
          <div className="filters" role="group" aria-label={p.filter} data-filters>
            <button type="button" className="filter" aria-pressed="true" data-filter="all">
              All <span className="filter-n">{articles.length}</span>
            </button>
            {used.map((c) => (
              <button key={c} type="button" className="filter" aria-pressed="false" data-filter={c}>
                {c} <span className="filter-n">{articles.filter((a) => a.category === c).length}</span>
              </button>
            ))}
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-14 lg:grid-cols-3" data-filter-list>
            {articles.map((a, i) => (
              <li key={a.slug} data-category={a.category} data-reveal className={i === 0 ? "blog-featured md:col-span-2 lg:col-span-3" : undefined}>
                <ArticleCard a={a} featured={i === 0} />
              </li>
            ))}
          </ul>
          <p className="sr-only" role="status" aria-live="polite" data-filter-status />
        </div>
      </section>
      <CtaBand heading={p.cta.heading} body={p.cta.body} />
    </Shell>
  );
}
