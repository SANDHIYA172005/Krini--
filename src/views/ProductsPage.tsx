import { site } from "../content/site";
import { lines } from "../content/catalogue";
import { seo, trail } from "../content/pages";
import { abs, breadcrumbs, faqPage, lineList, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { Breadcrumbs } from "../components/PageHeader";
import { ProductShop } from "../components/ProductShop";
import { Faq } from "../components/Faq";
import { CtaBand } from "../components/CtaBand";

/**
 * Products, kept simple: the page opens on the shop (ProductShop), under the
 * breadcrumbs, with its heading as the page's h1: search,
 * the three lines as chips, every product as a card with Add to cart, and the
 * cart that sends the order on WhatsApp or by email. Then the questions buyers
 * ask and a way to get in touch.
 */
export function ProductsPage() {
  const p = site.pages.products;
  const t = trail.products;
  // one guide per line, in line order
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
      <ProductShop top={<Breadcrumbs trail={t} />} />
      <Faq items={p.faq} />
      <CtaBand heading={p.cta.heading} body={p.cta.body} type="Request a quote" />
    </Shell>
  );
}
