import { routes } from "../content/site";
import type { LegalDoc } from "../content/legal";
import { breadcrumbs, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { Breadcrumbs } from "../components/PageHeader";

/**
 * Privacy Policy or Terms & Conditions: the title, when it was last updated
 * and a short lead, then the sections as one easy-to-read column, with the
 * section names in a list beside it on large screens.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const t = [
    { name: "Home", path: routes.home },
    { name: doc.label, path: doc.seo.path },
  ];
  const id = (i: number) => `${doc.id}-${i + 1}`;
  return (
    <Shell schema={[webPage(doc.seo), breadcrumbs(t)]}>
      <section className="legal" aria-labelledby="page-title">
        <div className="frame">
          <Breadcrumbs trail={t} />
          <header className="legal-head">
            <h1 id="page-title" className="legal-title">
              {doc.title}
            </h1>
            <p className="legal-lead">{doc.lead}</p>
            <p className="legal-date">Last updated: {doc.updated}</p>
          </header>
          <div className="legal-grid">
            <nav className="legal-toc" aria-label="On this page">
              <p className="legal-toc-k">On this page</p>
              <ol>
                {doc.body.map((b, i) => (
                  <li key={b.h}>
                    <a href={`#${id(i)}`}>{b.h}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="legal-body">
              {doc.body.map((b, i) => (
                <section key={b.h} id={id(i)} className="legal-sec" aria-labelledby={`${id(i)}-h`}>
                  <h2 id={`${id(i)}-h`}>
                    <span className="legal-n">{String(i + 1).padStart(2, "0")}</span> {b.h}
                  </h2>
                  {b.p?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {b.list ? (
                    <ul>
                      {b.list.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  ) : null}
                  {b.after?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
