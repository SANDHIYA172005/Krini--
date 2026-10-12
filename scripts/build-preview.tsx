/**
 * Builds a static, self-contained preview of the whole site from the same
 * source the Next.js app uses: every page is server-rendered with
 * react-dom/server, Tailwind compiles the CSS, esbuild bundles the motion code.
 *
 *   npx esbuild scripts/build-preview.tsx --bundle --platform=node --jsx=automatic --packages=external --outfile=.preview-build.cjs && node .preview-build.cjs
 *
 * Output (preview-dist/): one HTML file per page, side by side, with the links
 * between them rewritten to those files ("/" → index.html, "/about" →
 * about.html, "/products/lubricants" → products-lubricants.html,
 * "/blog/<slug>" → blog-<slug>.html). index.html is written without the
 * document wrapper (the host that publishes the preview adds it); the other
 * pages are complete documents. Shared: assets/site.css, assets/site.js,
 * images/.
 *
 * Env: TAILWIND_BIN (standalone CLI) and ESBUILD_BIN when the npm registry is unavailable.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { allPages, type PageEntry } from "../src/content/pages";
import { lineBySlug } from "../src/content/catalogue";
import { articleBySlug } from "../src/content/articles";
import { site } from "../src/content/site";
import { HomePage } from "../src/views/HomePage";
import { AboutPage } from "../src/views/AboutPage";
import { ServicesPage } from "../src/views/ServicesPage";
import { ProductsPage } from "../src/views/ProductsPage";
import { LinePage } from "../src/views/LinePage";
import { BlogPage } from "../src/views/BlogPage";
import { ArticlePage } from "../src/views/ArticlePage";
import { ContactPage } from "../src/views/ContactPage";
import { ProcessPage } from "../src/views/ProcessPage";
import { NotFoundPage } from "../src/views/NotFoundPage";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "preview-dist");
const V = process.env.KC_VENDOR || "/home/claude/vendor";
const TAILWIND = process.env.TAILWIND_BIN || path.join(V, "tailwindcss");
const ESBUILD = process.env.ESBUILD_BIN || "esbuild";

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });

// 1. CSS, shared by every page
execFileSync(TAILWIND, ["-c", path.join(ROOT, "tailwind.config.ts"), "-i", path.join(ROOT, "app/globals.css"), "-o", path.join(OUT, "assets/site.css"), "--minify"], {
  cwd: ROOT,
  stdio: "inherit",
});
// the fonts, as next/font names them in the app
fs.appendFileSync(path.join(OUT, "assets/site.css"), `:root{--font-display:"Archivo";--font-sans:"IBM Plex Sans";--font-mono:"IBM Plex Mono"}`);

// 2. JS
execFileSync(
  ESBUILD,
  [
    path.join(ROOT, "scripts/preview-entry.ts"),
    "--bundle",
    "--splitting",
    "--format=esm",
    ...(process.env.PREVIEW_MINIFY === "0" ? [] : ["--minify"]),
    "--target=es2020",
    `--outdir=${path.join(OUT, "assets")}`,
    "--chunk-names=[name]-[hash]",
    "--entry-names=site",
    "--define:process.env.NODE_ENV=\"production\"",
    // media paths become relative so the preview works from any folder
    "--define:process.env.NEXT_PUBLIC_ASSET_BASE=\".\"",
    `--alias:gsap=${path.join(V, "gsap/esm")}`,
    `--alias:lenis=${path.join(V, "lenis/packages/core/index.ts")}`,
    "--log-level=warning",
  ],
  { cwd: ROOT, stdio: "inherit" },
);

// 3. HTML, one file per page
/** "/" → index.html, "/about" → about.html, "/products/lubricants" → products-lubricants.html */
export const fileFor = (p: string) => (p === "/" || p === "" ? "index.html" : `${p.replace(/^\/|\/$/g, "").replace(/\//g, "-")}.html`);

function view(key: string): ReactElement {
  const [kind, slug] = key.split(":");
  switch (kind) {
    case "home":
      return <HomePage />;
    case "about":
      return <AboutPage />;
    case "services":
      return <ServicesPage />;
    case "products":
      return <ProductsPage />;
    case "line":
      return <LinePage line={lineBySlug(slug)!} />;
    case "blog":
      return <BlogPage />;
    case "article":
      return <ArticlePage a={articleBySlug(slug)!} />;
    case "contact":
      return <ContactPage />;
    case "process":
      return <ProcessPage />;
    default:
      return <NotFoundPage />;
  }
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function head(p: PageEntry | { title: string; description: string; path?: string; image?: string; imageAlt?: string; type?: string }) {
  const url = p.path ? new URL(p.path, site.url).toString() : "";
  const img = p.image ? new URL(p.image, site.url).toString() : "";
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}">`,
    `<meta name="theme-color" content="#0C0B09">`,
    ...(url
      ? [
          `<link rel="canonical" href="${url}">`,
          `<meta property="og:type" content="${p.type ?? "website"}">`,
          `<meta property="og:site_name" content="${site.name}">`,
          `<meta property="og:locale" content="en_IN">`,
          `<meta property="og:url" content="${url}">`,
          `<meta property="og:title" content="${esc(p.title)}">`,
          `<meta property="og:description" content="${esc(p.description)}">`,
          `<meta property="og:image" content="${img}">`,
          `<meta property="og:image:width" content="1200">`,
          `<meta property="og:image:height" content="630">`,
          `<meta property="og:image:alt" content="${esc(p.imageAlt ?? "")}">`,
          `<meta name="twitter:card" content="summary_large_image">`,
        ]
      : [`<meta name="robots" content="noindex">`]),
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">`,
    `<link rel="stylesheet" href="assets/site.css">`,
  ].join("\n");
}

function body(el: ReactElement) {
  let html = renderToStaticMarkup(el);
  // media paths become relative (src, every srcset entry, url()) so the preview works from any folder
  html = html.replace(/(["\s,(])\/(images|video)\//g, "$1$2/");
  // links between pages point at the preview's files
  html = html.replace(/href="(\/[^"]*)"/g, (_m, url: string) => {
    const [, p = "/", rest = ""] = url.match(/^([^?#]*)(.*)$/) ?? [];
    return `href="${fileFor(p || "/")}${rest}"`;
  });
  return html;
}

const doc = (h: string, b: string) =>
  `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${h}
</head>
<body>
${b}
<script type="module" src="assets/site.js"></script>
</body>
</html>
`;

const written: string[] = [];
for (const p of allPages()) {
  const file = fileFor(p.path);
  const h = head(p);
  const b = body(view(p.key));
  // index.html: the published page, which the host wraps in its own document and names after its
  // <title>, so there the title is just the name (the home page's search title is in the Next.js app)
  const html =
    file === "index.html"
      ? `${h.replace(/<title>[^<]*<\/title>/, `<title>${site.name}</title>`)}\n${b}\n<script type="module" src="assets/site.js"></script>\n`
      : doc(h, b);
  fs.writeFileSync(path.join(OUT, file), html);
  written.push(`${file} (${(html.length / 1024).toFixed(0)} kB)`);
}
fs.writeFileSync(path.join(OUT, "404.html"), doc(head({ title: "Page not found | Krini Crude", description: "This page doesn’t exist." }), body(view("404"))));

// 4. Images (and any video)
fs.cpSync(path.join(ROOT, "public/images"), path.join(OUT, "images"), { recursive: true });
if (fs.existsSync(path.join(ROOT, "public/video"))) fs.cpSync(path.join(ROOT, "public/video"), path.join(OUT, "video"), { recursive: true });

const files = fs.readdirSync(path.join(OUT, "assets"));
console.log(`preview built: ${written.length} pages + 404.html, ${files.length} asset files\n  ${written.join("\n  ")}`);
