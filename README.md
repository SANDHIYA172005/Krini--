# Krini Crude: website

A cinematic site for Krini Crude (industrial lubricants, construction
chemicals and aerosols, Chennai): 16 pages, each with its own content, search
title and description, and structured data.

| Page | Address | What it holds |
| --- | --- | --- |
| Home | `/` | In the live site's order: the film played by scrolling, from rust to radiance (the page's h1 is a small line saying what Krini Crude is and where, "Lubricant manufacturer in Chennai", the name and its first line; on its first screen three pills, Lubricants, Greases and Aerosols, jump to their parts of the film; each line's words carry a spec plate of its grades); Lubricants, greases and aerosols (three cards, each a still from the film's moment, the series, the live site's line and the range with its grades, linked to each product); Welcome to Krini Crude (its paragraphs justified); Our Product Range (the showroom); Industry We Serve (four boxes, 2 × 2 on phones, each with its description in full); the figures; then services in brief (five tiles), private label (the photo the full height of the card), the latest guides, the questions buyers ask (seven, most linking on to the page that says more) and the closing band with the office and factory addresses |
| About | `/about` | The opening: Quality Industrial Solutions, ABOUT / KRINI CRUDE (KRINI in gold) and "Pioneers in lubricants, construction chemicals and aerosols." centred against the gears picture (a fine gold frame behind it, the turning seal on its corner), the figures under them, all on a laptop's first screen; the story, vision and mission (in the live site's own words), research & development from the Director's desk (name, message and photo to be supplied; until the photo comes, a card with a gold outline K) and our three ways to formulate side by side, six values as a spec sheet, the figures, how we work from enquiry to after-sales, office and factory, questions |
| Services | `/services` | The five services as picture cards (2 × 2 on phones) with an enquiry card, private label step by step, three ways to work with us, questions |
| Products | `/products` | The three lines, every product as a card with its variants or grades (shown one line at a time if you like), a guide per line, questions |
| Lubricants & Greases, Construction Chemicals, Aerosols | `/products/lubricants`, `/products/construction-chemicals`, `/products/aerosols` | On charcoal: the line's description, its picture and an index of its products. Then every product as a data sheet (grades as tiles, or variants; the products available under it; typical uses; Krini Crude's published claims; what is still to be confirmed) with its own Enquire button, and a card for products made to your formulation; industries; guides; questions; the other lines |
| How it's made | `/how-its-made` | How crude oil becomes a Krini Crude lubricant, in ten steps and four places (in nature, at the oilfield, at the refinery, at our plant): a film frame stays in place while the steps scroll past, each with its own looping clip; what changes from line to line; questions |
| Blog | `/blog` | Six practical guides, the first featured, filtered by topic, each with its topic as a badge |
| Articles | `/blog/<slug>` | One guide each, with a box for talking to the team and more guides |
| Contact | `/contact` | Kept short, with no footer: call, WhatsApp, email and directions, the enquiry form (the live site's "Enquire Now": name, contact number, message; also sendable through WhatsApp), the two addresses |

Everything the site says, page by page, is in `docs/CONTENT.md` (generated
from the content files).

The home page opens on **a film played by scrolling, from rust to radiance**:
one 8-second take that runs forward or back as the visitor scrolls (the
section is eight screens tall and stays on screen). Golden oil pours over a
rusty gear shaft, a thick coat of grease follows, a spray can mists it, and
the camera pulls back to the gear. The words change with it, one step at a
time: "Krini Crude" with the live site's two hero lines (Premium Quality
Industrial Solutions; Innovation & Excellence in Manufacturing); then
Lubricants & oils, Greases and Aerosols & sprays, each over its own part of
the film with a line and a link; then "Engineered for Performance" with the
figures line and two buttons. On larger screens a rail names the steps and
jumps to each; on phones the crop follows the action. See `docs/HERO.md`.

After the live site's welcome, **the showroom** is its "Our Product Range /
Complete Industrial Solutions": the three product lines standing side by
side in a dark room, each lit on its own plinth, with the live site's name,
description and products, and "View …" to its page. On phones the plinths
become cards to swipe.

The **menu** is the live site's: Home, About Us, the three product menus
(Lubricants, Construction, Aerosols: each product, and for some a side list
of its range) and Enquire now. The **footer** is kept to the minimum: the
name and "Quality Industrial Solutions", About Us, Our Products and Contact
Us, the phone and the email, and the copyright line (the addresses are on the
Contact and About pages). Services, Products, Blog, How it's made and Contact
are linked from the Home page, the footer (Our Products, Contact Us) and from
page to page.

**How it's made** (`/how-its-made`) follows the oil from the seabed to the
drum. The first eight steps are the oil industry's general process; only the
last two (blending, then testing, filling and dispatch) happen at Krini
Crude's factory, and the page groups the steps by place so that is plain.
Details the live site doesn't give (where the base oils come from, the
blending equipment, the tests on each batch, pack sizes) are TBC. See
`docs/PROCESS.md`.

## Colours

**Black and gold.** A warm **black** page (#0C0B09) with warm white words
(#F5EFE1) and a metallic **gold** accent (#D4AF37); lifted **charcoal**
(#15130F) bands where the old navy ones were (the film, the product range,
services, the Contact page's top, the footer, the phone menu and the enquiry
pop-up, and the matching bands on other pages); a **gold** band with black
words for the figures and the closing band. Buttons are gold with black words
(black with gold words on the gold band); links and hover states are gold. A
near-black (#080705) shades the film and pictures. The name is set as in the
logo, "KRINI" in gold, "CRUDE" in warm white. All of it is in the tokens at the
top of `app/globals.css` (they keep their old names: `.theme-navy` is now the
charcoal band, `.theme-yellow` the gold one).

The **top bar** is a slim floating capsule of dark glass (46px tall), held a
little below the top of the screen on every page (the space it takes is 80px
from 1024px, 68px below), with a hairline gold edge that brightens at its two
ends: the name on one line, finely spaced; a fine gold rule; the pages and the
three product menus in small warm-white type, gold on hover, the page you are
on in gold with a small gold dot beneath it; finer charcoal drop-downs with a
hairline gold edge; and Enquire now as a slim gold pill with a small black
arrow badge. On desktop the capsule fits its contents, centred. On phones and
tablets it holds the name, Enquire now (from 640px) and an outlined Menu pill.
The browser-tab icon is a gold "K" on black (`public/icon.svg`).

## Stack

- **Next.js 15 (App Router) + React 19 + TypeScript**
- **Tailwind CSS 3** for layout and tokens (`tailwind.config.ts`, `app/globals.css`)
- **Hero film**: one 8-second Google Flow (Veo) take, cut into 192 frames
  in 20 WebP sheets by `scripts/hero/frames.sh`. `src/motion/scrollhero.ts`
  draws the frame for the scroll position on a canvas (blending neighbours,
  so it stays smooth) and keeps the steps, the rail and the watermark in step
  with it. No video element, no scroll library needed for it.
- **Showroom**: three product visualisations made with Google Flow (Nano
  Banana Pro), graded to match (`scripts/showroom.py`). The entrance is CSS;
  `src/motion/showroom.ts` adds the pointer light, the phone carousel and the
  scroll exit. The brief suggested Three.js / React Three Fiber; the imagery is
  photoreal footage and pictures, so a 3D engine would add well over 100 KB of
  gzipped JavaScript and nothing visible.
- **How it's made**: ten Google Flow clips (Veo 3.1 Fast, text to video), cut
  into short seamless loops by `scripts/film/process.sh` (1280 and 960 wide);
  `src/motion/process.ts` plays the one for the step being read.
- **GSAP + ScrollTrigger** for scroll choreography, reveals, pinning and counters
- **Lenis** for smooth scrolling, synced to GSAP's ticker
- No Framer Motion: the few micro-interactions (magnetic buttons, cursor,
  hover states) are CSS + GSAP `quickTo`, which avoids another dependency.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run export       # fully static site in ./out (any static host)
```

The enquiry form is the live site's "Enquire Now", word for word (Name,
Contact Number, Message / Product Enquiry, "Submit Enquiry"): a pop-up from
every "Enquire now" button (`src/components/Enquiry.tsx`), and the form on the
Contact page. A button that names a product or a kind of enquiry writes it
into the message first.

Optional: set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` to any URL that accepts a JSON
POST (Formspree, a serverless function, your CRM) to make the enquiry form
send `{ name, phone, message, type, page }` (the phone as `+91` and ten
digits). Without it, the form validates and then tells visitors to send it on
WhatsApp, email or call. It never claims a message was sent.

## Structure

```
app/                      Next.js routes: one folder per page, each with its metadata;
                          products/[line] and blog/[slug] are generated from the content;
                          layout (fonts), not-found, robots, sitemap (every page)
src/content/site.ts       The copy for every page. Verified from krinicrude.com; unknowns are placeholder()
src/content/catalogue.ts  The three product lines and their products, variants, uses, claims, questions
src/content/articles.ts   The blog's six guides
src/content/pages.ts      Every page's title, description, address, share picture and breadcrumbs
src/content/schema.ts     Structured data (JSON-LD) for every page
src/content/media.ts      The hero film's frames and the showroom pictures (paths, timings, descriptions, credits)
src/content/process.ts    How it's made: the four places, the ten steps, the clips, the page's copy
src/views/*.tsx           One component per page (HomePage, AboutPage, … LinePage, ArticlePage)
src/components/*.tsx      Server-rendered parts: Shell (nav, footer, structured data), PageHeader,
                          Faq, CtaBand, ScrollHero, Showroom, Services, Products, Process, Contact, Enquiry,
                          QuickBar and Swipe (phones), cards…
src/components/MotionRuntime.tsx   Client component that boots the motion layer
src/seo/metadata.ts       Turns a page's entry in pages.ts into Next.js metadata
src/motion/*.ts           Lenis, ScrollTrigger, the hero film (scrollhero.ts), the showroom, reveals, the enquiry form, filters,
                          how it's made (process.ts), the phone bar and swipe rows (mobile.ts)
public/video/process/     How it's made, one loop per step (NN-id.mp4, and NN-id-m.mp4 at 960 wide)
public/images/            hero-seq/: the hero film's frame sheets and its last frame; Flow's watermark (veo-mark.png),
                          showroom pictures, page stills (WebP), share pictures (og*.jpg);
                          process/: each loop's first frame (its poster)
scripts/hero/frames.sh    Cuts the hero film into frame sheets and stills
scripts/film/             Page stills and share pictures (stills.py), and How it's made's loops,
                          posters and share picture (process.sh)
scripts/showroom.py       Grades and exports the three showroom pictures
scripts/build-preview.tsx Builds a static preview of every page from the same components
scripts/content-doc.ts    Writes docs/CONTENT.md from the content files
docs/HERO.md              How the hero film and the showroom work, and how to change or replace them
docs/PROCESS.md           How it's made: the steps, the clips and their prompts, how to replace them
docs/CONTENT.md           Everything the site says, page by page, and the placeholders to fill
```

Markup declares behaviour with data attributes (`data-split`, `data-reveal`,
`data-shutter`, `data-drift`, `data-zoom`, `data-odometer`, `data-draw`,
`data-chips`, `data-rows`, `data-tilt`, `data-magnetic`, `data-enquire`…), so
sections stay simple and the motion layer (`src/motion/reveal.ts`,
`src/motion/cinema.ts`) is one place to tune.

## Search (SEO)

- **One page per subject.** Each product line has its own page, so each can
  rank for its own searches (cutting oil, hydraulic oil 68, shuttering oil,
  anti-spatter spray…), and the blog answers the questions buyers ask.
- **Every page has its own** title (around 60 to 70 characters) and description
  (under 160), canonical address, share card (Open Graph and X, with a
  1200×630 picture cut for the page), one h1, and breadcrumbs.
  Source: `src/content/pages.ts`; Next.js metadata: `src/seo/metadata.ts`.
- **The home page** says what Krini Crude is and where in its h1 ("Lubricant
  manufacturer in Chennai", over the name), names the range product by product
  beside "Lubricants, greases and aerosols." (made at the Tiruverkadu factory),
  answers seven buyers' questions (with FAQPage structured data), and gives the
  office and factory addresses with the phone and email in its closing band.
- **Structured data** on every page (`src/content/schema.ts`): Organization
  (office and factory addresses, phone, email) and WebSite, plus breadcrumbs,
  FAQPage on the pages with questions, ItemList of products on the product
  pages, Service on Services, Blog and BlogPosting on the blog, AboutPage and
  ContactPage.
- **Internal links:** products link to their guides and guides to their
  products; the footer links About Us, Our Products and Contact Us, the menu every line; every page ends with a
  way to enquire, with the enquiry type (and product) chosen.
- `app/sitemap.ts` lists every page; `app/robots.ts` points to it.
- To add when available: the real logo (square PNG) and social profiles in the
  structured data, and each article's publication date (`articles.ts`).

## Motion in the sections

Everything after the hero is filmed rather than faded (`src/motion/reveal.ts`,
`src/motion/cinema.ts`, all declared with data attributes):

- **Headlines** rise word by word, each word tipping up from below its own edge.
  **Section labels** slide in and their rule draws across; text blocks rise and
  come into focus.
- **Pictures** open like a roller shutter from the bottom while the picture
  settles from a close-up and its lights come up, then a band of light crosses
  it once. The About picture floats past slower than the page; the production
  hall and the Contact backdrop ease back as they cross the screen.
- **The figures** (70+, 1,000+) roll up on mechanical counter wheels, the lower
  wheels carrying the higher ones.
- **Services:** the line icons draw themselves. **Private label:** an oil pipe
  fills as the steps scroll past, with light running along it and a bright bead
  at its head; each step lights, with a ring, as the oil reaches it.
- **Products:** each line's picture rolls up over the last one in the sticky
  frame, with bars marking the line in view; the products slide in row by row.
- **Blog:** on desktop the cards lean toward the pointer and catch the light.
- **How it's made:** the film frame stays in place while the ten steps scroll
  past; the step being read lights up, its clip fades in over the last one and
  plays, and the bar under the frame fills step by step (each mark scrolls to
  its step).
- **Showroom:** the plinths rise into place as it scrolls up and lean toward the
  pointer.
- **Headings always fit** (`src/motion/fit.ts`): a heading whose longest word
  ("recommendation?", "Tiruverkadu.") would be wider than its column is set just
  small enough to fit, measured once the fonts have loaded and again when the
  window changes width, so no heading ever runs into what is beside it.

With reduced motion none of this runs and every section is complete as it
comes into view; without JavaScript the page reads fully.

## Content rules

Every statement on the site comes from the live krinicrude.com (read
September and October 2026), and where the live site has its own words they
are used word for word, without links back to it: the welcome text (Home and
About), the three lines' descriptions and their pages' series names, the
industries and their descriptions, the figures, the products listed under
each category ("Available products": Repel, Magic, Silease 360, Nikri AL and
Nikri 30 shuttering oils; Krini and Repel shuttering greases; 1-COOL Aquacut
150, AL 5000 and AL 7000; the spray paints, Relese anti-spatter and
Lock-Bond adhesive sprays), the footer line, the phone number and the two
addresses. Also from it: product lines and products, markets, services, private
label sectors, R&D oversight, office and factory addresses, phone, email, and
the published figures (70+ products, 1000+ clients, all major states, ISO
certified).

Things the live site does not state are shown as dashed **TBC** chips, never
invented: office hours; the Director's name, message and photograph; the ISO
standard and certificate number; each product's technical data sheet (and the
coolant mixing ratio, grease types, spray can sizes, release spray
applications); on How it's made, where the base oils come from, the blending
process and equipment, the tests on each batch and pack sizes; and the
articles' publication dates. The full list, with where
each appears, is at the end of `docs/CONTENT.md`.

The product pages explain in general terms what each type of product is for
("uses"); Krini Crude's own claims ("highlights") are only those on the live
site. The six blog guides are general, practical guidance written for the
site; have the technical team review them and set their dates before
publishing. Also review the short descriptions of the six private-label steps
(`services.privateLabel.steps`). They describe the generic process and should
be checked against how Krini Crude actually works.

How it's made describes the oil industry's general process (steps 1 to 8) and
how lubricants are generally blended and packed (steps 9 and 10); of Krini
Crude's own facts it uses only the factory's location and the product lines.
Have the team check steps 9 and 10 and fill in their TBCs.

All images, the film and the clips are AI-generated with Google Flow and are
labelled as such ("Film generated with Google Flow (Veo), an illustration"
on the hero film, "AI-generated product visualisations (Google
Flow), not Krini Crude packaging" under the showroom, and "AI-generated
visualisation" on the section images, "AI-generated illustrations, not
footage of our plant" on How it's made). They keep
Flow's required visible watermark. They are not photographs or footage of
Krini Crude's own products, packaging, plant or machinery: replace them with
real ones when possible (same file names; see `docs/HERO.md`).

## On phones

Under 640px wide the site is built for the thumb:

- **Quick-contact bar:** Call, WhatsApp and a gold Enquire now, held at the
  foot of the screen (`QuickBar.tsx`). It slides up once you are past the
  first screen and slides away over the closing band (which has the same
  three) and the footer, while the menu or the pop-up is open, and while
  typing in a form. Not on the Contact page.
- **Swipe rows:** rows of cards that would stack into a long column swipe
  sideways instead, the next card peeking in: Home's welcome cards, the
  industries and the guides; the guides and the other product lines on the
  product pages; "More guides" under each article (`m-swipe`, `Swipe.tsx`).
  Under each row, bars and "02 / 04" follow the swipe, with buttons for the
  previous and next card. The first time a row comes into view it nudges
  sideways and back, to show that it swipes (not with reduced motion).
- About's three ways to formulate read as rows, the icon beside the words; the
  Contact page's send button runs across the form; cards and buttons press in
  slightly when tapped. The menu button is solid gold.
- Behaviour: `src/motion/mobile.ts`. From 640px the rows are grids again and
  the bar is gone; without JavaScript the rows still swipe and the bar stays
  hidden.

## Performance

- The hero film is 20 WebP sheets of ten 1280×720 frames, 7 MB in all, loaded
  coarse to fine (every 8th sheet first), so the first screen and any part of
  the film soon have a frame; nothing else in the hero is heavy. The canvas
  only redraws when the scroll moves. With reduced motion no sheet loads: the
  hero is its last frame (a WebP of about 100 KB).
- The showroom's three pictures are WebP: about 215 KB in all on larger
  screens and 70 KB on phones, chosen by `srcset`.
- How it's made: no clip loads until the section is within a screen, and then
  only the step being read and the steps either side of it (a loop is 0.4 to
  1.6 MB at 960 wide, 0.6 to 2.5 MB at 1280). The 960 copy is used when the
  frame is under 1150 device pixels wide (phones, and desktops at 1x). Only the
  first step's poster loads with the page; the others come as their steps come
  near. Only the clip on screen plays. With Save-Data or reduced motion the
  clips never load: each step shows its first frame.
- Images are WebP with explicit dimensions and lazy loading below the fold.

## Accessibility

- `prefers-reduced-motion`: no film, no smooth scroll, no pinning, no
  entrances. The hero is one screen: the film's last frame, the name, the
  promise and the buttons. Every section is fully visible.
- The hero film is decorative (hidden from screen readers); its words are
  text, one step at a time, and the rail beside it is a list of labelled
  buttons (the step on screen is marked `aria-current="step"`), with a Skip
  intro link. The home page's h1 is a small line saying what Krini Crude is
  and where ("Lubricant manufacturer in Chennai"), the name and its first line
  (as on the live site). The showroom's plinths
  are a real list, each one link, and keyboard focus lights them.
- The product menus open on hover, or from the arrow beside each line name
  (a button: keyboard, touch, screen readers); Esc closes them. On phones
  each line folds open to its products.
- How it's made: the clips are decorative (the steps say what they show); the
  bar under the frame is a row of links, one per step, labelled with the
  step's number and title, and the step being read is marked
  (`aria-current="step"`). With reduced motion the clips don't play and the
  page scrolls without smoothing; without JavaScript every step reads in full.
- Every page has one h1 and headings that never skip a level; the page you are
  on is marked in the menu (`aria-current`) and in the breadcrumbs; questions
  open in place (native `<details>`).
- Content is visible without JavaScript (the hero shows the film's last frame, the name, the promise and the buttons);
  entrance animations only hide elements once the motion layer is running.
- Skip link, visible focus rings, keyboard-operable mobile menu (Esc closes),
  labelled form fields with inline validation and a polite live region. The
  enquiry pop-up is a native modal dialog: focus moves to its first field and
  stays inside it, Esc, the close button or a click outside closes it, and
  focus goes back to the button that opened it. The
  blog's topic filter and the products' line filter use pressed buttons and
  announce how many guides or products show.

## Tuning the hero

- The words: `site.film` (the name, its two lines, the promise) and `site.work` (the three products
  and their lines) in `src/content/site.ts`
- The film: cut it with `scripts/hero/frames.sh`, then set `heroSeq` in `src/content/media.ts`: when each
  step starts (`beats`, seconds of the film), how long the first frame holds (`lead`) and from where the
  last does (`hold`), where the subject sits for narrow screens (`focus`)
- Layout and type: the `.sh` rules in `app/globals.css`; drawing, the steps, the rail and the watermark:
  `src/motion/scrollhero.ts`
- How it's made: `src/content/process.ts` (steps, places, words, clips),
  `scripts/film/process.sh` (where each loop starts, how long it is, the
  dissolve), the `.process-*` rules (layout), `src/motion/process.ts` (reading
  line, loading, playing)
- The showroom: `site.hero` and `site.products` (words), `heroMedia` (pictures),
  `scripts/showroom.py` (grade), the `.hs` rules (layout), `src/motion/showroom.ts` (behaviour)
