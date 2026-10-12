import { seo, trail } from "../content/pages";
import { breadcrumbs, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { ContactHero, ContactMain } from "../components/Contact";

/**
 * Contact, kept short: four ways to reach the team, the enquiry form, and
 * where to find us. No footer: the page ends with the form and the addresses.
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
