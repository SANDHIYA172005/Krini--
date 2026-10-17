"use client";

import { useMemo, useState } from "react";

/** A guide as the Blog page lists it (built on the server: BlogPage.tsx). */
export type BlogItem = {
  slug: string;
  href: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  minutes: number;
};

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ");

/**
 * The Blog page's guides. The newest guide large across the top (picture
 * beside it), then a search box and the topics as chips, then the rest as a
 * numbered reading list: picture, topic and reading time, title, a line of
 * summary. Searching or picking a topic lists every match in the same way.
 * Every guide is in the page's HTML; the search and chips need scripts.
 */
export function BlogClient({ items, topics, whatsapp }: { items: BlogItem[]; topics: string[]; whatsapp: string }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const filtering = Boolean(query.trim()) || topic !== "all";

  const shown = useMemo(() => {
    const words = norm(query).split(" ").filter(Boolean);
    return items.filter((a) => {
      if (topic !== "all" && a.category !== topic) return false;
      if (!words.length) return true;
      const hay = norm(`${a.title} ${a.category} ${a.summary}`);
      return words.every((w) => hay.includes(w));
    });
  }, [items, query, topic]);

  const [first, ...rest] = items;
  const list = filtering ? shown : rest;

  return (
    <>
      {!filtering && first ? (
        <a href={first.href} className="bl-feature">
          <span className="bl-feature-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={first.image} alt={first.imageAlt} width={1200} height={900} decoding="async" />
          </span>
          <span className="bl-feature-body">
            <span className="bl-kicker">
              <span className="bl-new">Latest guide</span> {first.category} · {first.minutes} min read
            </span>
            <span className="bl-feature-title">{first.title}</span>
            <span className="bl-feature-sum">{first.summary}</span>
            <span className="bl-read">
              Read the guide <span aria-hidden="true">→</span>
            </span>
          </span>
        </a>
      ) : null}

      <div className="bl-tools">
        <div className="bl-topics" role="group" aria-label="Topics">
          {["all", ...topics].map((t) => (
            <button key={t} type="button" className="bl-topic" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t === "all" ? "All guides" : t}
              <span>{t === "all" ? items.length : items.filter((a) => a.category === t).length}</span>
            </button>
          ))}
        </div>
        <label className="bl-search">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="sr-only">Search the guides</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guides" autoComplete="off" />
        </label>
      </div>

      <div className="bl-layout">
        <div>
          <p className="bl-count" aria-live="polite">
            {filtering ? `${shown.length} ${shown.length === 1 ? "guide" : "guides"}${query.trim() ? ` for “${query.trim()}”` : ""}` : "More guides"}
          </p>
          {list.length ? (
            <ol className="bl-list">
              {list.map((a) => (
                <li key={a.slug}>
                  <a href={a.href} className="bl-row">
                    <span className="bl-n" aria-hidden="true">
                      {String(items.indexOf(a) + 1).padStart(2, "0")}
                    </span>
                    <span className="bl-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.image} alt="" width={1200} height={900} loading="lazy" decoding="async" />
                    </span>
                    <span className="bl-row-body">
                      <span className="bl-kicker">
                        {a.category} · {a.minutes} min read
                      </span>
                      <span className="bl-row-title">{a.title}</span>
                      <span className="bl-row-sum">{a.summary}</span>
                    </span>
                    <span className="bl-go" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <div className="bl-empty">
              <p>
                No guides match <b>“{query.trim()}”</b>.
              </p>
              <button type="button" onClick={() => (setQuery(""), setTopic("all"))}>
                Show all guides
              </button>
            </div>
          )}
        </div>

        <aside className="bl-ask" aria-label="Ask our team">
          <p className="bl-ask-k">Ask our team</p>
          <p className="bl-ask-t">Not sure which oil, grease or spray you need?</p>
          <p className="bl-ask-b">Tell us the machine, the job and the conditions. Our team replies with the right product and grade.</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bl-ask-wa">
            Ask on WhatsApp
          </a>
          <a href="/products" className="bl-ask-shop">
            Browse products →
          </a>
        </aside>
      </div>
    </>
  );
}
