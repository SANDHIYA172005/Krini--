import { permanentRedirect } from "next/navigation";
import { lines } from "../../../src/content/catalogue";
import { routes } from "../../../src/content/site";

/**
 * The product lines no longer have pages of their own (/products/lubricants,
 * /products/construction-chemicals, /products/aerosols): an old link or
 * bookmark to one goes to the Products page, where every product is listed.
 */
export const dynamicParams = false;
export function generateStaticParams() {
  return lines.map((l) => ({ line: l.slug }));
}

export default function Page() {
  permanentRedirect(routes.products);
}
