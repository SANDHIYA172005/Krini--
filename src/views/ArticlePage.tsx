import { enquireHref, routes, site } from "../content/site";
import { lineById } from "../content/catalogue";
import { articles, readingTime, type Article, type Block } from "../content/articles";
import { articleSeo, trail } from "../content/pages";
import { article, breadcrumbs, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { Breadcrumbs } from "../components/PageHeader";
import { ArticleCard } from "../components/ArticleCard";
import { SectionIntro } from "../components/Blocks";
import { Arrow, Fact, Glyph, MediaSlot } from "../components/ui";
import { SwipeUI } from "../components/Swipe";

/**
 * One guide: the header (topic, title, date, reading time, summary, picture),
 * the text beside a box for talking to the team and the product line it is
 * about, a footnote, and more guides.
 */
export function ArticlePage({ a }: { a: Article }) {
  const s = articleSeo(a);
  const t = trail.article(a);
  const line = a.line ? lineById(a.line) : undefined;
  const type = line ? `Enquiry: ${line.title}` : "Private label";
  // more guides: the same topic first, then the rest, in blog order
  const more = [...articles.filter((x) => x.slug !== a.slug && x.category === a.category), ...articles.filter((x) => x.slug !== a.slug && x.category !== a.category)].slice(0, 3);
  const c = site.contact;
  return (
    <Shell current="blog" schema={[webPage(s), breadcrumbs(t), article(a)]}>
      <article aria-labelledby="page-title">
        <header className="page-head">
          <div className="frame">
            <Breadcrumbs trail={t} />
            <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-7">
                <p className="label text-amber" data-reveal>
                  {a.category}
                </p>
                <h1 id="page-title" className="page-title article-title display-tight mt-6" data-split>
                  {a.title}
                </h1>
                <p className="label mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-mute" data-reveal>
                  <Fact value={a.date} />
                  <span>{readingTime(a)} min read</span>
                  <span>By the Krini Crude team</span>
                </p>
                <p className="mt-8 max-w-measure text-lg leading-relaxed text-bone/90 md:text-xl" data-reveal>
                  {a.summary}
                </p>
              </div>
              <figure className="lg:col-span-5">
                <div className="media aspect-[4/3] rounded-sm" data-shutter>
                  <MediaSlot label="Guide photo" w={1200} h={900} />
                </div>
              </figure>
            </div>
          </div>
        </header>

        <div className="frame grid gap-16 pb-[clamp(80px,11vw,160px)] pt-4 lg:grid-cols-12 lg:gap-8">
          <div className="prose lg:col-span-7">
            {a.body.map((b, i) => (
              <ArticleBlock key={i} b={b} />
            ))}
            <p className="article-note">
              This article is general guidance. Always follow the equipment maker’s recommendations and the product’s technical and safety data sheets.
            </p>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Talk to our team">
            <div className="side-box lg:sticky lg:top-24" data-reveal>
              <p className="label text-amber">Need a product recommendation?</p>
              <p className="display-tight mt-4 text-2xl leading-tight">Talk to our team.</p>
              <p className="mt-4 text-mute">Tell us the machine, the material or the job, and our team will suggest a product.</p>
              <div className="mt-8 grid gap-3">
                <a href={enquireHref(type)} className="btn btn-primary" data-enquire={type}>
                  Send an enquiry <Arrow />
                </a>
                <a href={c.phoneHref} className="btn btn-ghost">
                  <Glyph name="call" size={16} /> Call {c.phone}
                </a>
                <a href={c.whatsapp} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  <Glyph name="chat" size={16} /> WhatsApp
                </a>
              </div>
              <div className="mt-8 border-t border-bone/10 pt-6">
                <p className="label text-mute">{line ? "Products in this guide" : "Read next"}</p>
                {line ? (
                  <a href={routes.line(line.slug)} className="mt-3 flex items-center justify-between gap-4 text-lg hover:text-amber">
                    {line.title} <Arrow />
                  </a>
                ) : (
                  <a href={`${routes.services}#private-label`} className="mt-3 flex items-center justify-between gap-4 text-lg hover:text-amber">
                    Private label at Krini Crude <Arrow />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="section border-t border-bone/10" aria-labelledby="more-title">
        <div className="frame">
          <SectionIntro
            label="From the blog"
            heading="More guides."
            id="more-title"
            aside={
              <a href={routes.blog} className="btn btn-ghost" data-magnetic>
                All articles <Arrow />
              </a>
            }
          />
          <ul className="m-swipe mt-16 grid gap-x-6 gap-y-14 md:grid-cols-3 lg:mt-24" data-swipe>
            {more.map((m) => (
              <li key={m.slug} data-reveal>
                <ArticleCard a={m} />
              </li>
            ))}
          </ul>
          <SwipeUI count={more.length} label="guide" />
        </div>
      </section>
    </Shell>
  );
}

function ArticleBlock({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2>{b.text}</h2>;
    case "ul":
      return (
        <ul>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <aside className="tip" aria-label="Tip">
          <p className="label text-amber">Tip</p>
          <p>{b.text}</p>
        </aside>
      );
  }
}
