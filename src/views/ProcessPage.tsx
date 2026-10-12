import { enquireHref } from "../content/site";
import { processPage } from "../content/process";
import { seo, trail } from "../content/pages";
import { breadcrumbs, faqPage, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { PageHeader } from "../components/PageHeader";
import { ProcessFlow, ProcessMix } from "../components/Process";
import { Faq } from "../components/Faq";
import { CtaBand } from "../components/CtaBand";
import { Arrow } from "../components/ui";

/**
 * How it's made: from crude oil to the drum. The journey in ten steps beside
 * a film frame that follows the reader, what changes from one product line to
 * the next, questions, and a way to get in touch.
 */
export function ProcessPage() {
  const p = processPage;
  const t = trail.process;
  return (
    <Shell schema={[webPage(seo.process), breadcrumbs(t), faqPage(seo.process.path, p.faq)]}>
      <PageHeader
        trail={t}
        label={p.label}
        title={p.heading}
        lead={p.lead}
        facts={p.facts}
        actions={
          <>
            <a href="#journey" className="btn btn-primary" data-magnetic>
              Follow the journey <Arrow />
            </a>
            <a href={enquireHref("Custom formulation")} className="btn btn-ghost" data-enquire="Custom formulation" data-magnetic>
              Discuss a formulation <Arrow />
            </a>
          </>
        }
      />
      <ProcessFlow label={p.journey.label} heading={p.journey.heading} />
      <ProcessMix />
      <Faq items={p.faq} />
      <CtaBand heading={p.cta.heading} body={p.cta.body} type="Custom formulation" />
    </Shell>
  );
}
