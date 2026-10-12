import { enquireHref, routes, site } from "../content/site";
import { lines } from "../content/catalogue";
import { articles, type Article } from "../content/articles";
import { seo, trail } from "../content/pages";
import { abs, breadcrumbs, faqPage, lineList, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { PageHeader } from "../components/PageHeader";
import { ProductIndex, ProductLines } from "../components/Products";
import { Guides, LineThumbs } from "../components/Blocks";
import { Faq } from "../components/Faq";
import { CtaBand } from "../components/CtaBand";
import { Arrow } from "../components/ui";

/**
 * Products: the three lines (each linking to its own page), every product at a
 * glance, a guide for each line, questions.
 */
export function ProductsPage() {
  const p = site.pages.products;
  const t = trail.products;
  // one guide per line, in line order
  const guides = lines.map((l) => articles.find((a) => a.line === l.id)).filter((a): a is Article => a !== undefined);
  return (
    <Shell
      current="products"
      schema={[
        webPage(seo.products, "CollectionPage", { mainEntity: { "@id": `${abs(seo.products.path)}#lines` } }),
        breadcrumbs(t),
        lineList(lines),
        faqPage(seo.products.path, p.faq),
      ]}
    >
      <PageHeader
        trail={t}
        label={p.label}
        title={p.heading}
        lead={p.lead}
        facts={p.facts}
        actions={
          <>
            <a href={enquireHref("Request a quote")} className="btn btn-primary" data-enquire="Request a quote" data-magnetic>
              Request a quote <Arrow />
            </a>
            <a href="#all-products" className="btn btn-ghost" data-magnetic>
              All products <Arrow />
            </a>
            <a href={routes.process} className="btn btn-ghost" data-magnetic>
              How it’s made <Arrow />
            </a>
          </>
        }
        aside={<LineThumbs />}
      />
      <ProductLines label={p.lines.label} heading={p.lines.heading} />
      <ProductIndex label={p.index.label} heading={p.index.heading} note={p.index.note} />
      <Guides list={guides} label={p.guides.label} heading={p.guides.heading} />
      <Faq items={p.faq} />
      <CtaBand heading={p.cta.heading} body={p.cta.body} type="Request a quote" />
    </Shell>
  );
}
