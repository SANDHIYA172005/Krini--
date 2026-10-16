import type { ReactNode } from "react";
import { isPlaceholder, type Placeholder } from "../content/site";

/** Small mono label followed by a hairline rule. */
export function SectionHead({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p className="section-head label" id={id}>
      <span>{children}</span>
    </p>
  );
}

/** Renders a value, or a dashed "TBC" chip when the fact is not yet confirmed. */
export function Fact({ value }: { value: string | Placeholder }) {
  if (isPlaceholder(value)) return <span className="placeholder">{value.note}</span>;
  return <>{value}</>;
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M0 5h12.5M8.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Running text with names that must stay on one line kept whole: "1-COOL" would otherwise split at its hyphen. */
export function Whole({ children }: { children: string }) {
  return (
    <>
      {children.split(/(1-COOL)/).map((part, i) =>
        part === "1-COOL" ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** The name as in the logo: "KRINI" in the brand yellow, "CRUDE" in white (no symbol, as on the live site). */
export function Name() {
  return (
    <>
      <span className="text-amber">Krini</span> <span>Crude</span>
    </>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark display">
      <Name />
    </span>
  );
}

/** Small caption for AI-generated imagery (Google Flow, on the home page), so it is never mistaken for photos of the Krini Crude plant. */
export function CgNote({ children = "AI-generated visualisation" }: { children?: ReactNode }) {
  return <span className="label text-bone/50">{children}</span>;
}

/**
 * A blank frame where an original photograph goes. It fills its parent (or,
 * given `w` and `h`, keeps that shape) and says what belongs there and at what
 * size, so the picture can be dropped in later: replace the <MediaSlot …/>
 * with an <img src="/images/…" alt="…" />, keeping the parent element.
 */
export function MediaSlot({ label, w, h, className = "" }: { label: string; w?: number; h?: number; className?: string }) {
  return (
    <div className={`media-slot ${className}`} style={w && h ? { aspectRatio: `${w} / ${h}` } : undefined} aria-hidden="true" data-media-slot>
      <span className="media-slot-in">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7.5h3l1.6-2.5h6.8L17 7.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13" r="3.6" />
        </svg>
        <span className="media-slot-label">{label}</span>
        {w && h ? <span className="media-slot-size">{`${w} × ${h} px`}</span> : null}
      </span>
    </div>
  );
}

/**
 * Line icons, drawn on a 28 px grid. Every shape has pathLength 1, so it can be
 * drawn in (cinema.ts, data-draw).
 */
export type IconName = "factory" | "flask" | "formula" | "label" | "shield" | "car" | "gear" | "crane" | "spray";
export function Icon({ name }: { name: IconName }) {
  const common = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", stroke: "currentColor", strokeWidth: 1.2, "aria-hidden": true } as const;
  switch (name) {
    case "factory":
      return (
        <svg {...common}>
          <path pathLength={1} d="M3 24V12l6 4v-4l6 4v-4l6 4V5h4v19H3Z" />
          <path pathLength={1} d="M7 20h2M12 20h2M17 20h2" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path pathLength={1} d="M11 3h6M12 3v7l-6.5 11.2A2 2 0 0 0 7.2 24h13.6a2 2 0 0 0 1.7-2.8L16 10V3" />
          <path pathLength={1} d="M8.5 17h11" />
        </svg>
      );
    case "formula":
      return (
        <svg {...common}>
          <circle pathLength={1} cx="8" cy="8" r="3" />
          <circle pathLength={1} cx="20" cy="8" r="3" />
          <circle pathLength={1} cx="14" cy="20" r="3" />
          <path pathLength={1} d="M10.4 9.8l2.2 7.4M17.6 9.8l-2.2 7.4M11 8h6" />
        </svg>
      );
    case "label":
      return (
        <svg {...common}>
          <path pathLength={1} d="M9 3h10v4l2 3v14H7V10l2-3V3Z" />
          <path pathLength={1} d="M7 13h14v7H7" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path pathLength={1} d="M14 3l9 3.5v6.5c0 5.2-3.8 9.4-9 11-5.2-1.6-9-5.8-9-11V6.5L14 3Z" />
          <path pathLength={1} d="M9.5 14l3 3 6-6.5" />
        </svg>
      );
    case "car": // vehicle assembly
      return (
        <svg {...common}>
          <path pathLength={1} d="M4 19v-4.6L6.8 9a1.8 1.8 0 0 1 1.6-1h11.2a1.8 1.8 0 0 1 1.6 1l2.8 5.4V19H4Z" />
          <circle pathLength={1} cx="9" cy="19.5" r="2.3" />
          <circle pathLength={1} cx="19" cy="19.5" r="2.3" />
          <path pathLength={1} d="M6.2 14h15.6" />
        </svg>
      );
    case "gear": // components
      return (
        <svg {...common}>
          <circle pathLength={1} cx="14" cy="14" r="7" />
          <circle pathLength={1} cx="14" cy="14" r="2.8" />
          <path pathLength={1} d="M14 3.5V7M14 21v3.5M3.5 14H7M21 14h3.5M6.6 6.6l2.4 2.4M19 19l2.4 2.4M6.6 21.4 9 19M19 9l2.4-2.4" />
        </svg>
      );
    case "crane": // construction
      return (
        <svg {...common}>
          <path pathLength={1} d="M8.5 24V4M4 7.5h20" />
          <path pathLength={1} d="M4 7.5 8.5 4l15.5 3.5M19.5 7.5v6.5" />
          <path pathLength={1} d="M17.5 14h4v3.5h-4ZM4 24h9" />
        </svg>
      );
    case "spray": // paint and coatings
      return (
        <svg {...common}>
          <path pathLength={1} d="M8 12h9v12.5H8Z" />
          <path pathLength={1} d="M10 12V8.5h5V12M15 9.5h2.5" />
          <path pathLength={1} d="M20.5 6.5h.5M23.5 4.5h.5M23.5 9h.5M21 11.5h.5" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      );
  }
}

/** Small glyphs for navigation and contact links, on a 24 px grid. */
export type GlyphName = "home" | "about" | "services" | "products" | "blog" | "contact" | "call" | "mail" | "chat" | "clock" | "route" | "user" | "note";
export function Glyph({ name, size = 22 }: { name: GlyphName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  } as const;
  switch (name) {
    case "home": // a house
      return (
        <svg {...common}>
          <path d="M4 11 12 4.5l8 6.5" />
          <path d="M6 9.5V19.5h12V9.5" />
          <path d="M10 19.5v-5h4v5" />
        </svg>
      );
    case "about": // the brand's drop in a ring
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6.8c2 2.6 3.1 4.4 3.1 5.9a3.1 3.1 0 1 1-6.2 0c0-1.5 1.1-3.3 3.1-5.9Z" />
        </svg>
      );
    case "services": // the plant
      return (
        <svg {...common}>
          <path d="M3 20V10.5l5 3.2v-3.2l5 3.2v-3.2l5 3.2V4h3v16H3Z" />
          <path d="M6.5 17h1.5M11 17h1.5M15.5 17h1.5" />
        </svg>
      );
    case "products": // a drum
      return (
        <svg {...common}>
          <rect x="6" y="3.5" width="12" height="17" rx="2" />
          <path d="M6 8.5h12M6 15.5h12" />
        </svg>
      );
    case "blog": // a page of writing
      return (
        <svg {...common}>
          <path d="M6 3.5h9l3 3v14H6z" />
          <path d="M9 10h6M9 13.5h6M9 17h4" />
        </svg>
      );
    case "contact": // a pin
      return (
        <svg {...common}>
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );
    case "call":
      return (
        <svg {...common}>
          <path d="M6.6 3.5h2.6l1.6 4.4-2.1 1.3a11 11 0 0 0 6.1 6.1l1.3-2.1 4.4 1.6v2.6a2 2 0 0 1-2 2A15.9 15.9 0 0 1 4.6 5.5a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "chat": // a speech bubble (WhatsApp)
      return (
        <svg {...common}>
          <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6Z" />
          <path d="M9 11.5h.01M12 11.5h.01M15 11.5h.01" strokeWidth={2} />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "user": // a person
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3.6" />
          <path d="M4.8 20c.9-3.6 3.7-5.6 7.2-5.6s6.3 2 7.2 5.6" />
        </svg>
      );
    case "note": // a page and a pencil
      return (
        <svg {...common}>
          <path d="M14 4H6.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6" />
          <path d="M18.3 3.7a1.6 1.6 0 0 1 2.3 2.3L13 13.6l-3 .7.7-3Z" />
        </svg>
      );
    case "route": // directions
      return (
        <svg {...common}>
          <circle cx="6.5" cy="17.5" r="2" />
          <path d="M8.5 17.5h6a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6h7" />
          <path d="m15 3 2 2.5-2 2.5" />
        </svg>
      );
  }
}

/** Structured data for search engines (src/content/schema.ts). */
export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so the JSON can never close the script element early
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
