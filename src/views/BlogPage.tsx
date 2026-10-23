import { routes, site } from "../content/site";
import { articles, categories, readingTime } from "../content/articles";
import { abs, blog, breadcrumbs, webPage } from "../content/schema";
import { seo, trail } from "../content/pages";
import { Shell } from "../components/Shell";
import { Breadcrumbs } from "../components/PageHeader";
import { BlogClient, type BlogItem } from "../components/BlogClient";

/**
 * Blog: the heading and a line about it, then the guides (BlogClient): the
 * newest one large with its picture, a search box and the topics as chips,
 * the rest as a numbered reading list, and a box to ask the team.
 */
export function BlogPage() {
  const p = site.pages.blog;
  const t = trail.blog;
  const topics = categories.filter((c) => articles.some((a) => a.category === c));
  const items: BlogItem[] = articles.map((a) => ({
    slug: a.slug,
    href: routes.article(a.slug),
    title: a.title,
    category: a.category,
    summary: a.summary,
    image: a.image,
    imageAlt: a.imageAlt,
    minutes: readingTime(a),
  }));
  return (
    <Shell
      current="blog"
      schema={[webPage(seo.blog, "CollectionPage", { mainEntity: { "@id": `${abs(seo.blog.path)}#blog` } }), breadcrumbs(t), blog(articles)]}
    >
      <section className="bl" aria-labelledby="page-title">
        <div className="frame">
          <header className="bl-head">
            <Breadcrumbs trail={t} />
            <h1 id="page-title" className="bl-title">
              {p.heading}
            </h1>
            <p className="bl-lead">{site.blog.lead}</p>
          </header>
          <BlogClient items={items} topics={topics} whatsapp={site.contact.whatsapp} />
        </div>
      </section>
    </Shell>
  );
}
