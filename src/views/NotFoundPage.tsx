import { routes } from "../content/site";
import { lines } from "../content/catalogue";
import { Shell } from "../components/Shell";
import { Arrow } from "../components/ui";

/** The page for an address that doesn't exist: where to go instead. */
export function NotFoundPage() {
  return (
    <Shell schema={[]}>
      <section className="page-head min-h-[70svh]" aria-labelledby="page-title">
        <div className="frame">
          <p className="label text-amber">404 · Page not found</p>
          <h1 id="page-title" className="page-title display-tight mt-6 max-w-[16ch]">
            This page has run dry.
          </h1>
          <p className="mt-8 max-w-measure text-lg text-bone/90">The page you were looking for isn’t here. Try one of these instead.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={routes.home} className="btn btn-primary">
              Home <Arrow />
            </a>
            <a href={routes.products} className="btn btn-ghost">
              Products <Arrow />
            </a>
            <a href={routes.contact} className="btn btn-ghost">
              Contact <Arrow />
            </a>
          </div>
          <ul className="mt-14 flex flex-wrap gap-2">
            {lines.map((l) => (
              <li key={l.id}>
                <a href={routes.line(l.slug)} className="chip chip-link">
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
