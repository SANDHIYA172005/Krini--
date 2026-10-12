/**
 * Writes docs/CONTENT.md: everything the site says, page by page, from the
 * content files (src/content). Run after changing the copy:
 *
 *   npx esbuild scripts/content-doc.ts --bundle --platform=node --outfile=.content-doc.cjs && node .content-doc.cjs
 */
import fs from "node:fs";
import path from "node:path";
import { enquireHref, isPlaceholder, routes, site, type Placeholder } from "../src/content/site";
import { lines } from "../src/content/catalogue";
import { articles, readingTime } from "../src/content/articles";
import { allPages, articleSeo, lineSeo } from "../src/content/pages";
import { places, processMedia, processPage, processSteps, stepNo } from "../src/content/process";

const out: string[] = [];
const w = (...l: string[]) => out.push(...l);
const tbc = (v: string | Placeholder) => (isPlaceholder(v) ? `**[TBC: ${v.note}]**` : v);
const url = (p: string) => new URL(p, site.url).toString();
const faq = (items: readonly { q: string; a: string }[]) => items.forEach((f, i) => w(`${i + 1}. **${f.q}** ${f.a}`));
const cell = (t: string) => t.replace(/\|/g, "\\|");
const heading = (h: string | readonly string[]) => (typeof h === "string" ? h : h.join(" "));
const placeholders = new Map<string, string[]>();
const note = (where: string, v: Placeholder) => placeholders.set(v.note, [...(placeholders.get(v.note) ?? []), where]);

const c = site.contact;
const p = site.pages;

w(
  "# Krini Crude: website content, page by page",
  "",
  "Everything the site says, page by page, generated from the content files in `src/content` (`site.ts`, `catalogue.ts`, `articles.ts`, `process.ts`, `pages.ts`). Facts about Krini Crude come from krinicrude.com. Items in **[TBC: …]** are placeholders for facts the live site doesn't state; they show on the site as dashed \"TBC\" chips until they are filled in. The complete list is at the end.",
  "",
  "Don't edit this file by hand: change the content files, then regenerate it with the command at the top of `scripts/content-doc.ts`.",
  "",
  "## Company details used across the site",
  "",
  `- Name: ${site.name} · ${site.tagline}`,
  `- Phone: ${c.phone} · WhatsApp: ${c.phone} (${c.whatsapp.split("?")[0]})`,
  `- Email: ${c.email}`,
  `- Office: ${c.office.join(" ")}`,
  `- Factory: ${c.factory.join(" ")}`,
  `- Hours: ${tbc(c.hours)}`,
  `- Menu (as on krinicrude.com): ${site.menu.pages.map((n) => n.label).join(" · ")} · ${site.menu.lines.map((m) => `${m.label} ▾`).join(" · ")} · button "Enquire now" (opens the Enquire Now pop-up)`,
  ...site.menu.lines.map(
    (m) => `  - ${m.label}: ${m.items.map((it) => (it.sub ? `${it.label} › (${it.sub.map((x) => x.label).join(", ")})` : it.label)).join(" · ")}`,
  ),
  `- Enquiry types (what an Enquire button can be about; it goes into the message): ${[...c.enquiryTypes, ...lines.map((l) => `Enquiry: ${l.title}`)].join(" · ")}`,
  "",
  "## Enquire Now pop-up (every page but Contact)",
  "",
  "Word for word as on krinicrude.com. Every \"Enquire now\" button opens it; without JavaScript the buttons go to the Contact page's form, which is the same form.",
  "",
  `- **${site.enquiry.heading}**`,
  `- ${site.enquiry.lead}`,
  `- ${site.enquiry.name.label} * ("${site.enquiry.name.placeholder}") · ${site.enquiry.phone.label} * ("${site.enquiry.phone.placeholder}") · ${site.enquiry.message.label} * ("${site.enquiry.message.placeholder}")`,
  `- Buttons: ${site.enquiry.submit} · ${site.enquiry.whatsapp} (opens WhatsApp with the enquiry written out) · ${site.enquiry.close} (×; Esc or a click outside also closes it)`,
  `- A button that names a product or a kind of enquiry (a quote, private label, a product line) writes it into the message first, e.g. "Request a quote / Product: Hydraulic Oil", and the visitor can change it.`,
  `- Checks: ${Object.values(site.enquiry.status.missing).join(" ")} (the contact number may be typed with spaces, +91 or a leading 0)`,
  `- Sent: "${site.enquiry.status.sent}" · until an enquiry endpoint is configured (NEXT_PUBLIC_ENQUIRY_ENDPOINT): "${site.enquiry.status.offline}" · if sending fails: "${site.enquiry.status.failed}"`,
  "",
  "## Search titles and descriptions",
  "",
  "Every page has its own title, description, address (canonical), share picture (1200×630) and structured data.",
  "",
  "| Page | Address | Title | Description |",
  "| --- | --- | --- | --- |",
  ...allPages().map((pg) => `| ${pg.key} | ${pg.path} | ${cell(pg.title)} (${pg.title.length}) | ${cell(pg.description)} (${pg.description.length}) |`),
  "",
);
if (isPlaceholder(c.hours)) note("Contact page", c.hours);

// ---------------------------------------------------------------- Home
w(
  "---",
  "",
  `## 1. Home (${routes.home})`,
  "",
  "### Hero: from rust to radiance",
  "- One 8-second Google Flow film in a single take, played by scrolling (the section is eight screens tall and stays on screen): golden oil pours over a rusty gear shaft, a thick coat of grease follows, a spray can mists it, and the camera pulls back to the gear. Reduced motion or no JavaScript: one screen, the film's last frame with the name, the promise and the buttons.",
  `- **h1**: a small line over the name, ${site.film.kicker} (for search: what Krini Crude is and where) · **${site.film.brand}** · ${site.film.tagline} (as on the live site); under it: ${site.film.motto}`,
  `- Under that, three pills, each a jump to its part of the film (without JavaScript, a link to its page): ${site.work.map((x) => x.rail).join(" · ")}`,
  `- Then, each over its own part of the film (01 / 03 …): ${site.work.map((x) => `**${x.name}**: ${x.body} Spec: ${x.spec.map((r) => `${r.label} ${r.values.join(" / ")}`).join("; ")} (${x.link})`).join(" · ")}`,
  `- End: **${site.film.promise}** · ${site.hero.lead} · buttons: View products · Get a quote`,
  `- Beside it (larger screens): the steps (${["Krini Crude", ...site.work.map((x) => x.rail), "Get started"].join(" · ")}), each a jump to its step, and Skip intro (to the next section)`,
  "",
  `### ${p.home.range.label}`,
  `- **${heading(p.home.range.heading)}**`,
  `- ${p.home.range.lead}`,
  ...p.home.range.families.map(
    (f, i) =>
      `- 0${i + 1} **${f.name}** (still from the film: "${f.alt}") · ${f.series} · ${f.line} · ${f.rows.map((r) => `${r.label}: ${r.values.join(" / ")}`).join("; ")} · ${f.link} → ${f.href}`,
  ),
  `- Under the cards: ${p.home.range.credit}`,
  "",
  `### ${p.home.about.label}`,
  `- **${heading(p.home.about.heading)}**`,
  `- ${site.about.lead}`,
  ...p.home.about.parts.map((t, k) => `- **${t}**: ${site.about.story[k + 1]}`),
  `- Markets we supply: ${site.about.markets.join(" · ")}`,
  "",
  `### ${site.hero.kicker} (the showroom)`,
  `- **${site.hero.heading.join(" ").replace(/[[\]]/g, "")}**`,
  `- ${site.hero.lead}`,
  "- Buttons: View products · Get a quote",
  ...lines.map((l) => `- ${l.index} **${l.short}**: ${l.description} Products: ${site.hero.lines[l.id]} · View ${l.short.toLowerCase()} → ${routes.line(l.slug)}`),
  "",
  `### ${p.home.industries.label}`,
  `- **${p.home.industries.heading}**`,
  ...site.industries.map((i) => `- **${i.title}**: ${i.body}`),
  "",
  "### Figures (the live site's own, shown without a source line)",
  `- ${site.stats.map((s) => ("value" in s ? `${s.value.toLocaleString("en-IN")}${s.suffix} ${s.label}` : `${s.text}: ${s.label}`)).join(" · ")}`,
  "",
  `### ${p.home.services.label}`,
  `- **${heading(p.home.services.heading)}**`,
  `- ${site.services.lead}`,
  ...site.services.items.map((s) => `- **${s.title}**: ${s.body} (phones: "${s.short}")`),
  `- **${p.home.privateLabel.heading}** ${p.home.privateLabel.body} · buttons: ${p.home.privateLabel.cta} · Discuss private label`,
  "",
  `### ${p.home.blog.label}`,
  `- **${p.home.blog.heading}** · the three newest guides · button: ${p.home.blog.cta}`,
  "",
  `### ${p.home.faq.label}`,
  `- **${p.home.faq.heading}** ${p.home.faq.lead}`,
  ...p.home.faq.items.map((f, i) => `${i + 1}. **${f.q}** ${f.a}${"link" in f && f.link ? ` (${f.link.label} → ${f.link.href})` : ""}`),
  "",
  `### ${site.cta.label}`,
  `- **${site.cta.heading}** ${site.cta.body} · Enquire now · Call · WhatsApp`,
  `- Under the phone and email (home page only), each opening its map: Office ${c.office.join(" ")} · Factory ${c.factory.join(" ")}`,
  "",
);

// ---------------------------------------------------------------- About
w(
  "---",
  "",
  `## 2. About (${routes.about})`,
  "",
  "### Header",
  `- ${p.about.label}`,
  `- **h1: ${p.about.heading}**`,
  `- ${p.about.lead}`,
  "- Buttons: Talk to our team · View products",
  `- Beside the picture, a turning seal: ${p.about.seal}`,
  `- Facts: ${p.about.facts.map((f) => `${f.value} ${f.label}`).join(" · ")}`,
  "",
  `### ${p.about.story.label}`,
  `- **${p.about.story.heading}**`,
  `- Quote: “${p.about.story.quote}”`,
  ...site.about.story.map((s) => `- ${s}`),
  `- Our three lines: ${lines.map((l) => l.title).join(" · ")} (each links to its page)`,
  `- Markets we supply: ${site.about.markets.join(" · ")}`,
  "",
  `### ${p.about.vision.label}`,
  `- ${p.about.vision.visionLabel}: **${p.about.vision.vision}**`,
  `- ${p.about.vision.missionLabel} (what we are committed to, in our own words):`,
  ...p.about.vision.mission.map((m, i) => `  ${i + 1}. **${m.title}**: ${m.body}`),
  "- Both are drawn from krinicrude.com's own words (its home page line and what its About page says Krini Crude is committed to). Replace them with Krini Crude's formal vision and mission statements, if it has them.",
  "",
  `### ${p.about.rd.label}: ${p.about.rd.desk}`,
  `- **${p.about.rd.heading}**`,
  `- ${tbc(p.about.leadership.photo)} · ${tbc(p.about.leadership.name)}, ${p.about.leadership.role}, Krini Crude`,
  `- ${p.about.leadership.note}`,
  `- ${tbc(p.about.leadership.message)}`,
  ...site.about.routes.map((r, i) => `${i + 1}. **${r.title}**: ${r.body} (phones, side by side: "${r.short}")`),
  "",
  `### ${p.about.values.label}`,
  `- **${p.about.values.heading}** ${p.about.values.lead}`,
  ...site.principles.map((x, i) => `- KC–${String(i + 1).padStart(2, "0")} **${x.title}**: ${x.body}${x.detail ? ` ${tbc(x.detail)}` : ""}`),
  "",
  `### ${p.about.figures.label}`,
  `- **${p.about.figures.heading}** ${site.stats.map((s) => ("value" in s ? `${s.value.toLocaleString("en-IN")}${s.suffix} ${s.label}` : `${s.text}: ${s.label}`)).join(" · ")}`,
  "",
  `### ${p.about.process.label}`,
  `- **${p.about.process.heading}** · button: Private label, step by step`,
  ...p.about.process.steps.map((st, i) => `${i + 1}. **${st.title}**: ${st.body}`),
  "",
  `### ${p.about.places.label}`,
  `- **${p.about.places.heading}**`,
  `- Office address: ${c.office.join(" ")} · Get directions`,
  `- Factory address: ${c.factory.join(" ")} · Get directions`,
  "",
  "### Questions, answered.",
);
faq(p.about.faq);
w("", "Closing band: as on Home.", "");
[p.about.leadership.name, p.about.leadership.message, p.about.leadership.photo].forEach((v) => isPlaceholder(v) && note("About page, from the Director's desk", v));
site.principles.forEach((x) => x.detail && note("About page, values", x.detail));

// ---------------------------------------------------------------- Services
w(
  "---",
  "",
  `## 3. Services (${routes.services})`,
  "",
  "### Header",
  `- ${p.services.label}`,
  `- **h1: ${p.services.heading}**`,
  `- ${p.services.lead}`,
  `- Facts: ${p.services.facts.map((f) => `${f.value} ${f.label}`).join(" · ")}`,
  "- Buttons: Discuss private label · Discuss a formulation",
  "- Picture: production hall (AI-generated visualisation)",
  "",
  `### ${p.services.what.label}`,
  `- **${p.services.what.heading}**`,
  `- ${site.services.lead}`,
  ...site.services.items.map((s, i) => `${i + 1}. **${s.title}** (picture card, number ${String(i + 1).padStart(2, "0")}): ${s.body} Covers: ${s.more.join("; ")}.${"detail" in s && s.detail ? ` ${tbc(s.detail)}` : ""} Phones: "${s.short}" · Enquire (${s.enquire})`),
  "6. **Tell us what you need.** Products and quantities, a formulation, or a product under your brand. · Enquire",
  "",
  `### ${p.services.privateLabel.label}`,
  `- **${p.services.privateLabel.heading.join(" ")}**`,
  `- ${site.services.privateLabel.lead}`,
  ...site.services.privateLabel.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.body}`),
  `- Sectors we manufacture for: ${site.services.privateLabel.sectors.join(" · ")}`,
  "",
  `### ${p.services.ways.label}`,
  `- **${p.services.ways.heading}**`,
  ...site.services.ways.map((x, i) => `${i + 1}. **${x.title}**: ${x.body} · ${x.cta}`),
  "",
  "### Questions, answered.",
);
faq(p.services.faq);
w("", `Closing band: **${p.services.cta.heading}** ${p.services.cta.body}`, "");
site.services.items.forEach((s) => "detail" in s && s.detail && note("Services page, quality control", s.detail));

// ---------------------------------------------------------------- Products
w(
  "---",
  "",
  `## 4. Products (${routes.products})`,
  "",
  "### Header",
  `- ${p.products.label}`,
  `- **h1: ${p.products.heading}**`,
  `- ${p.products.lead}`,
  `- Facts: ${p.products.facts.map((f) => `${f.value} ${f.label}`).join(" · ")}`,
  "- Buttons: Request a quote · All products · the three lines as pictures, each opening its page",
  "",
  `### ${p.products.lines.label}`,
  `- **${p.products.lines.heading.join(" ")}** Standard, speciality and niche-market products, made to our formulations or to yours.`,
  ...lines.map((l) => `- **${l.index} ${l.title}**: ${l.description} Products: ${l.products.map((x) => x.name).join(", ")} · View ${l.short.toLowerCase()} · Enquire`),
  "",
  `### ${p.products.index.label}`,
  `- **${p.products.index.heading}** ${p.products.index.note}`,
  "",
  `- As cards, with a bar to show one line at a time: All · ${lines.map((l) => l.title).join(" · ")}. Each card: the line, the product, its variants or grades, Enquire.`,
  "",
  "| Product | Variants & grades | Line |",
  "| --- | --- | --- |",
  ...lines.flatMap((l) => l.products.map((x) => `| ${cell(x.name)} | ${cell(x.variants?.join(" · ") ?? "Ask us")} | ${cell(l.title)} |`)),
  "",
  `### ${p.products.guides.label}`,
  `- **${p.products.guides.heading}** One guide for each line.`,
  "",
  "### Questions, answered.",
);
faq(p.products.faq);
w("", `Closing band: **${p.products.cta.heading}** ${p.products.cta.body}`, "");

// ---------------------------------------------------------------- Lines
lines.forEach((l, k) => {
  const s = lineSeo(l);
  w(
    "---",
    "",
    `## ${5 + k}. ${l.title} (${routes.line(l.slug)})`,
    "",
    "### Header (on navy)",
    `- ${l.index} · ${l.series}`,
    `- **h1: ${l.heading}**`,
    `- ${l.description}`,
    "- Buttons: Enquire now · Request a quote",
    `- In this range: ${l.products.map((x, i) => `${l.index}.${String(i + 1).padStart(2, "0")} ${x.name}`).join(" · ")} (links to each product)`,
    `- Share picture: ${s.image}`,
    "",
    "### Products",
    `- **The ${l.title.toLowerCase()} range.** ${l.strap}`,
    "- Each product as a data sheet: its number and name, what it does, then rows for its grades (as tiles) or variants, the products available under it, typical uses and highlights; at its foot, Enquire and what is still to be confirmed.",
  );
  l.products.forEach((x, i) => {
    w(
      "",
      `**${l.index}.${String(i + 1).padStart(2, "0")} ${x.name}**${x.variants ? ` · ${x.variants.join(" · ")}` : ""}`,
      "",
      `${x.about}`,
    );
    if (x.range) w(`- Available products (as listed on krinicrude.com): ${x.range.map((r) => `**${r.name}**: ${r.text}`).join(" · ")}`);
    if (x.uses) w(`- Typical uses: ${x.uses.join("; ")}`);
    if (x.claims) w(`- Highlights (as published by Krini Crude): ${x.claims.join("; ")}`);
    if (x.tbc) {
      w(`- ${x.tbc.map(tbc).join(" · ")}`);
      x.tbc.forEach((t) => note(`${l.title}: ${x.name}`, t));
    }
    w(`- Button: Enquire (opens the form with "Enquiry: ${l.title}" chosen and ${x.name} named in the message)`);
  });
  w(
    "",
    "**Your formulation: Need something not listed here?** We manufacture to our own formulations and to formulations specified by customers, and make products for brands to sell under their own name.",
    `- Buttons: Discuss a formulation (enquiry: Custom formulation) · Private label → ${routes.services}#private-label`,
  );
  const ind = site.industries.filter((i) => i.line === l.id);
  if (ind.length) w("", "### Industries we serve", `- **Where our ${l.title.toLowerCase()} work.**`, ...ind.map((i) => `- **${i.title}**: ${i.body}`));
  const g = articles.filter((a) => a.line === l.id);
  if (g.length) w("", "### Guides", `- **Choosing and using ${l.title.toLowerCase()}.** ${g.map((a) => a.title).join(" · ")}`);
  w("", "### Questions, answered.");
  faq(l.faq);
  w(
    "",
    `### More from Krini Crude`,
    `- **Our other product lines.** ${lines.filter((o) => o.id !== l.id).map((o) => o.title).join(" · ")}`,
    "",
    `Closing band: **Tell us what you need.** Send us the ${l.title.toLowerCase()} you need, with grades, quantities, application and delivery location.`,
    "",
  );
});

// ---------------------------------------------------------------- How it's made
w(
  "---",
  "",
  `## 8. How it’s made (${routes.process})`,
  "",
  "Linked from the home page, the Products page and the footer.",
  "",
  "### Header",
  `- ${processPage.label}`,
  `- **h1: ${processPage.heading}**`,
  `- ${processPage.lead}`,
  `- Facts: ${processPage.facts.map((f) => `${f.value} ${f.label}`).join(" · ")}`,
  "- Buttons: Follow the journey · Discuss a formulation",
  "",
  `### ${processPage.journey.label}`,
  `- **${processPage.journey.heading}**`,
  `- Note under the heading: ${processMedia.credit}`,
  "- A film frame stays in place while the steps scroll past (on the left on larger screens, at the top on phones); the step being read shows its clip. Under the frame, a bar of the ten steps grouped by place; each one scrolls to its step.",
  "",
);
places.forEach((pl) => {
  w(`**${pl.label}** · ${pl.where}`, "");
  processSteps
    .filter((x) => x.place === pl.id)
    .forEach((x) => {
      w(`- **${stepNo(x)} ${x.title}**: ${x.body}${x.tbc ? ` ${x.tbc.map(tbc).join(" · ")}` : ""} *(Clip: ${x.alt}.)*`);
      x.tbc?.forEach((t) => note(`How it’s made: ${stepNo(x)} ${x.title}`, t));
    });
  w("");
});
w(
  `### ${processPage.mix.label}`,
  `- **${processPage.mix.heading}** ${processPage.mix.lead}`,
  ...processPage.mix.items.map((m) => `- **${m.title}** (${m.line}): ${m.body}`),
  "",
  "### Questions, answered.",
);
faq(processPage.faq);
w("", `Closing band: **${processPage.cta.heading}** ${processPage.cta.body}`, "");

// ---------------------------------------------------------------- Blog
w(
  "---",
  "",
  `## 9. Blog (${routes.blog})`,
  "",
  `- ${p.blog.label}`,
  `- **h1: ${p.blog.heading}**`,
  `- ${site.blog.lead}`,
  `- ${p.blog.filter}: All · ${[...new Set(articles.map((a) => a.category))].join(" · ")}`,
  `- Featured guide (the first, across the full width): ${articles[0].title}`,
  "- Each card carries its topic as a badge on its picture.",
  `- Closing band: **${p.blog.cta.heading}** ${p.blog.cta.body}`,
  "",
  "### On every article",
  "- Side box: **Need a product recommendation? Talk to our team.** Tell us the machine, the material or the job, and our team will suggest a product. · Send an enquiry · Call · WhatsApp · the product line the guide is about",
  "- Footnote: This article is general guidance. Always follow the equipment maker’s recommendations and the product’s technical and safety data sheets.",
  "- **More guides.** · All articles",
  "",
);
articles.forEach((a, k) => {
  const s = articleSeo(a);
  w(`### 9.${k + 1} ${a.title}`, "", `*${a.category} · ${tbc(a.date)} · ${readingTime(a)} min read · By the Krini Crude team* · ${s.path}`, "", `**Summary:** ${a.summary}`, "");
  if (isPlaceholder(a.date)) note(`Article: ${a.title}`, a.date);
  a.body.forEach((b) => {
    if (b.type === "p") w(b.text, "");
    else if (b.type === "h2") w(`**${b.text}**`, "");
    else if (b.type === "ul") w(...b.items.map((i) => `- ${i}`), "");
    else if (b.type === "ol") w(...b.items.map((i, n) => `${n + 1}. ${i}`), "");
    else w(`> Tip: ${b.text}`, "");
  });
});

// ---------------------------------------------------------------- Contact
w(
  "---",
  "",
  `## 10. Contact (${routes.contact})`,
  "",
  "Kept short: four ways to reach the team, the form, where to find us.",
  "",
  `- ${p.contact.label}`,
  `- **h1: ${p.contact.heading}**`,
  `- ${p.contact.lead}`,
  `- Call ${c.phone} · WhatsApp: Chat with us · Email ${c.email} · Visit: Anna Nagar East`,
  "",
  `### The enquiry form (${site.enquiry.heading})`,
  "- The same form as the pop-up on every other page (see \"Enquire Now pop-up\" above).",
  `- Enquire buttons on this page scroll to it. Links from other pages (without JavaScript) arrive as e.g. ${enquireHref("Enquiry: Lubricants & Greases", "Hydraulic Oil")}, and what they are about goes into the message.`,
  "",
  `### ${p.contact.visit.label}`,
  `- Office address: ${c.office.join(" ")} · Directions`,
  `- Factory address: ${c.factory.join(" ")} · Directions`,
  `- Hours: ${tbc(c.hours)}`,
);

// ---------------------------------------------------------------- Footer, structured data, placeholders
w(
  "",
  "---",
  "",
  "## Footer (every page except Contact)",
  `- ${site.name} · ${site.tagline}`,
  `- Links: ${site.footer.links.map((l) => l.label).join(" · ")}`,
  `- ${c.phone} · ${c.email}`,
  "- © 2026 Krini Crude. All rights reserved. · Back to top",
  "",
  "## Structured data (JSON-LD)",
  "",
  "Every page: Organization (name, address, office and factory, phone, email, contact point) and WebSite, plus:",
  "",
  `- Home: WebPage, FAQPage (the questions buyers ask)`,
  `- About: AboutPage, BreadcrumbList, FAQPage`,
  `- Services: WebPage, BreadcrumbList, Service ×${site.services.items.length}, FAQPage`,
  `- Products: CollectionPage, BreadcrumbList, ItemList (the three lines), FAQPage`,
  `- Each product line: CollectionPage, BreadcrumbList, ItemList (its products), FAQPage`,
  `- Blog: CollectionPage, BreadcrumbList, Blog with a BlogPosting per article`,
  `- Each article: WebPage, BreadcrumbList, BlogPosting (datePublished is added once the date is set)`,
  `- How it’s made: WebPage, BreadcrumbList, FAQPage`,
  `- Contact: ContactPage, BreadcrumbList`,
  "",
  `Canonical addresses use ${site.url}. Sitemap: ${url("/sitemap.xml")} (all ${allPages().length} pages). To add once supplied: the logo (a square PNG, 112 px or larger) and social profiles (sameAs) on the Organization.`,
  "",
  "## Placeholders to supply before launch",
  "",
  ...[...placeholders.entries()].map(([k, where]) => `- **${k}**: ${[...new Set(where)].join("; ")}`),
  "- **Logo** for search results (structured data) and **social profiles**: not on the live site",
  "- **Enquiry endpoint**: where the form sends (NEXT_PUBLIC_ENQUIRY_ENDPOINT)",
  "",
);

fs.mkdirSync(path.join(process.cwd(), "docs"), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), "docs/CONTENT.md"), out.join("\n"));
console.log(`docs/CONTENT.md: ${out.length} lines, ${placeholders.size} kinds of placeholder`);
