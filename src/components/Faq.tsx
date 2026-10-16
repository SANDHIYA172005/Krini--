import { Arrow, SectionHead, Whole } from "./ui";

/** A question, its answer and, if there is one, the page that says more. */
export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

/**
 * Questions and answers, each one opening in place (native <details>, so it
 * works without JavaScript and every answer is in the page for search
 * engines). The same questions go into the page's structured data as an
 * FAQPage (src/content/schema.ts). An answer can end with a link on to the
 * page that says more.
 */
export function Faq({
  items,
  label = "Questions",
  heading = "Questions, answered.",
  lead,
  id = "faq",
}: {
  items: readonly FaqItem[];
  label?: string;
  heading?: string;
  lead?: string;
  id?: string;
}) {
  return (
    <section id={id} className="section border-t border-bone/10" aria-labelledby={`${id}-title`}>
      <div className="frame">
        <SectionHead>{label}</SectionHead>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id={`${id}-title`} className="display text-h leading-[0.95]" data-split>
              {heading}
            </h2>
            {lead ? (
              <p className="mt-6 max-w-sm text-mute" data-reveal>
                {lead}
              </p>
            ) : null}
          </div>
          <div className="faq lg:col-span-7 lg:col-start-6" data-rows>
            {items.map((f, i) => (
              <details key={f.q} className="faq-item">
                <summary className="faq-q">
                  <span className="faq-n label" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-text">{f.q}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <div className="faq-a">
                  <p>
                    <Whole>{f.a}</Whole>
                  </p>
                  {f.link ? (
                    <a href={f.link.href} className="faq-link label">
                      {f.link.label} <Arrow />
                    </a>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
