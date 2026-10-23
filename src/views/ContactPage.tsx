import { seo, trail } from "../content/pages";
import { breadcrumbs, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { ContactHero, ContactMain } from "../components/Contact";

/**
 * Contact: the four ways to reach the team in a row, then the enquiry form and
 * the gold "Visit us" card side by side, the same size. No footer.
 */
export function ContactPage({ endpoint = "" }: { endpoint?: string }) {
  const t = trail.contact;
  return (
    <Shell current="contact" footer={false} schema={[webPage(seo.contact, "ContactPage"), breadcrumbs(t)]}>
      <ContactHero trail={t} />
      <ContactMain endpoint={endpoint} />
    </Shell>
  );
}
