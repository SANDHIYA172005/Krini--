import type { CSSProperties, ReactNode } from "react";
import { enquireHref, routes, site } from "../content/site";
import { heroMedia } from "../content/media";
import { lineById } from "../content/catalogue";
import { Arrow } from "./ui";

/**
 * Holds the entrance (CSS, paused until `.is-go`) until the section comes into
 * view and its three pictures have loaded (or 2.5 s after it came into view), so
 * the lights come on in front of the visitor, over real pictures. Runs inline at
 * the end of the section, before the page's scripts. Without JavaScript the
 * <noscript> style shows everything at once.
 */
const GO = `(function(){var s=document.currentScript&&document.currentScript.parentNode;if(!s)return;var done=0,go=function(){if(!done){done=1;s.classList.add('is-go')}};var im=s.querySelectorAll('img[data-hs-img]'),n=im.length,seen=0,loaded=!n,check=function(){if(seen&&loaded)go()},one=function(){if(--n<=0){loaded=1;check()}};for(var i=0;i<im.length;i++){if(im[i].complete)one();else{im[i].addEventListener('load',one);im[i].addEventListener('error',one)}}if(!('IntersectionObserver' in window)){seen=1;check();setTimeout(go,2500);return}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){seen=1;io.disconnect();check();setTimeout(go,2500)}},{threshold:0.3});io.observe(s)})();`;

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** "We make [lubricants]," → text with the bracketed product-line words wrapped, numbered from `start`. */
function markWords(line: string, start: number): [ReactNode[], number] {
  let k = start;
  const parts = line.split(/(\[[^\]]+\])/).filter(Boolean);
  const nodes = parts.map((part, j) => {
    if (!part.startsWith("[")) return part;
    const word = (
      <em key={j} className="hs-word" data-hs-word={k} style={vars({ "--k": k })}>
        {part.slice(1, -1)}
      </em>
    );
    k += 1;
    return word;
  });
  return [nodes, k];
}

/**
 * The showroom (part of Home): the live site's "Our Product Range / Complete
 * Industrial Solutions". The three product lines stand side by side, each lit
 * on its own plinth, with the live site's name, description and products, and
 * "View …" to its page. When the section comes into view the lights come on
 * one plinth at a time and a word of the heading lights with each. On phones
 * the plinths become a row of cards to swipe. Behaviour:
 * src/motion/showroom.ts. Docs: docs/HERO.md.
 */
export function Showroom() {
  const { hero, products } = site;
  const { stages } = heroMedia;

  let k = 0;
  const heading = hero.heading.map((line, i) => {
    const [nodes, next] = markWords(line, k);
    k = next;
    return (
      <span key={i}>
        <span className="hs-h1-line">
          <span className="hs-h1-in" style={vars({ "--i": i })}>
            {nodes}
          </span>
        </span>
        {i < hero.heading.length - 1 ? " " : null}
      </span>
    );
  });

  return (
    <section id="lines" className="hs" data-showroom aria-labelledby="lines-heading" suppressHydrationWarning>
      <noscript>
        <style>{`.hs *{animation:none!important}.hs-dots{display:none!important}`}</style>
      </noscript>

      <div className="hs-grid frame">
        <div className="hs-title">
          <p className="label hs-kicker">{hero.kicker}</p>
          <h2 id="lines-heading" className="hs-h1 display-tight">
            {heading}
          </h2>
        </div>

        <div className="hs-side">
          <p className="hs-lead">{hero.lead}</p>
          <div className="hs-ctas">
            <a href={routes.products} className="btn btn-primary" data-magnetic>
              View products <Arrow />
            </a>
            <a href={enquireHref("Request a quote")} className="btn btn-ghost" data-enquire="Request a quote" data-magnetic>
              Get a quote <Arrow />
            </a>
          </div>
        </div>

        <div className="hs-stage" data-hs-stage>
          <ol className="hs-bays" aria-label="Product lines" data-hs-track>
            {products.map((p, n) => {
              const st = stages[p.id];
              return (
                <li key={p.id} className="hs-bay" data-hs-bay={n} style={vars({ "--k": n })}>
                  <div className="hs-figure" data-hs-figure>
                    <div className="hs-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={st.src}
                        srcSet={`${st.srcSmall} 720w, ${st.src} 1200w`}
                        sizes="(orientation: landscape) and (min-width: 900px) 30vw, min(78vw, 420px)"
                        width={heroMedia.width}
                        height={heroMedia.height}
                        alt={st.alt}
                        style={{ objectPosition: st.focus }}
                        decoding="async"
                        fetchPriority={n === 0 ? "high" : "auto"}
                        data-hs-img
                      />
                      <span className="hs-cone" aria-hidden="true" />
                      <span className="hs-torch" aria-hidden="true" />
                      <span className="hs-sweep" aria-hidden="true" />
                    </div>
                    <h3 className="hs-name display-tight">
                      <span className="hs-idx label">{p.index}</span>{" "}
                      {lineById(p.id).short}
                    </h3>
                    <p className="hs-desc">{lineById(p.id).description}</p>
                    <div className="hs-plaque">
                      <ul className="hs-list">
                        {hero.lines[p.id].split(", ").map((name) => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                      <a href={p.href} className="hs-link label">
                        View {lineById(p.id).short.toLowerCase()} <Arrow />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="hs-dots" role="group" aria-label="Choose a product line" data-hs-dots>
            {products.map((p, n) => (
              <button
                key={p.id}
                type="button"
                className="hs-dot"
                data-hs-dot={n}
                aria-label={`Show ${p.title}`}
                aria-current={n === 0 ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>
        </div>

        <p className="hs-foot label">{heroMedia.credit}</p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: GO }} />
    </section>
  );
}
