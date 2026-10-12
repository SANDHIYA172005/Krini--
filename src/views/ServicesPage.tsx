import { enquireHref, site } from "../content/site";
import { seo, trail } from "../content/pages";
import { breadcrumbs, faqPage, services, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { PageHeader } from "../components/PageHeader";
import { PrivateLabel, ServicesHall, ServicesList, Ways } from "../components/Services";
import { Faq } from "../components/Faq";
import { CtaBand } from "../components/CtaBand";
import { Arrow } from "../components/ui";

/**
 * Services: manufacturing, R&D, customised formulation, private label and
 * quality control in full; private label step by step; the three ways to work
 * with Krini Crude; questions.
 */
export function ServicesPage() {
  const p = site.pages.services;
  const t = trail.services;
  return (
    <Shell current="services" schema={[webPage(seo.services), breadcrumbs(t), ...services(site.services.items), faqPage(seo.services.path, p.faq)]}>
      <PageHeader
        trail={t}
        label={p.label}
        title={p.heading}
        lead={p.lead}
        facts={p.facts}
        actions={
          <>
            <a href={enquireHref("Private label")} className="btn btn-primary" data-enquire="Private label" data-magnetic>
              Discuss private label <Arrow />
            </a>
            <a href={enquireHref("Custom formulation")} className="btn btn-ghost" data-enquire="Custom formulation" data-magnetic>
              Discuss a formulation <Arrow />
            </a>
          </>
        }
      />
      <ServicesHall />
      <ServicesList label={p.what.label} heading={p.what.heading} />
      <PrivateLabel label={p.privateLabel.label} heading={p.privateLabel.heading} />
      <Ways label={p.ways.label} heading={p.ways.heading} />
      <Faq items={p.faq} />
      <CtaBand heading={p.cta.heading} body={p.cta.body} type="Private label" />
    </Shell>
  );
}
