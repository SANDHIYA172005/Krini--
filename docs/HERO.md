# Hero: the film played by scrolling, then the showroom

The page opens on a short film that the visitor plays by scrolling, and the
showroom follows it.

## The film: from rust to radiance

One take, 8 seconds, made with Google Flow (Veo) at 1080p and chosen by the
owner: golden oil pours over a rusty gear shaft, a thick coat of grease
follows, a spray can mists it, and the camera pulls back to the gear. Each of
three things Krini Crude makes has its moment in it, in that order. It is
AI-generated footage, not Krini Crude's plant or product; Flow's own "Veo" mark
stays in its corner (the owner's version has no credit line under the film).

The section is eight screens tall and its stage stays on screen (sticky)
while it scrolls past. The scroll position picks the film's frame, drawn on a
canvas to cover the screen, and which words are shown, one step at a time,
each over its own part of the film:

| Step | Film | Words |
|------|------|-------|
| 1 | The rusty shaft (the first frame holds for the first 8% of the scroll) | Lubricant manufacturer in Chennai (a small line over the name) · **Krini Crude** · Premium Quality Industrial Solutions (together the h1; the name and tagline as on the live site) · Innovation & Excellence in Manufacturing |
| 2 | Oil pours over the shaft (from 0.5 s) | 01 / 03 **Lubricants & oils**, its line, *View lubricants* |
| 3 | A thick coat of grease (from 2.6 s) | 02 / 03 **Greases**, its line, *View greases* (to the Greases sheet) |
| 4 | The spray can mists it (from 4.3 s) | 03 / 03 **Aerosols & sprays**, its line, *View aerosols* |
| 5 | The pull-back to the gear (from 6.2 s; the last frame holds from 92% of the scroll) | **Engineered for Performance**, the figures line, *View products*, *Get a quote* |

The names of the three are the owner's; the lines under them are the live
site's words (`site.work`); under them a spec plate of the line's products and
grades as published on krinicrude.com (`site.work[].spec`: Hydraulic 32 · 46 · 68,
Gear 90 to 320, Engine 15W40 · 20W40 · 5W30; Krini and Repel shuttering greases;
Lock Bond 400 ml, silicone-free anti-spatter). On the first screen, under the
motto, three pills (Lubricants, Greases, Aerosols) jump to their parts of the
film (`data-sh-jump`; without JavaScript or with reduced motion they open the
line's page). Right after the hero, the home page shows the three again as cards
(`src/components/Range.tsx`, `site.pages.home.range`), each opening on a still
from its moment in the film (`public/images/range-oil.webp`, `range-grease.webp`,
`range-spray.webp`: cut from `film-src/hero/rust-to-radiance.mp4` at 1.3 s, 4.0 s
and 5.3 s, Flow's mark stamped in the corner; the spray is cropped so the can's
lettering is out of frame). On larger screens a rail on the right names the
steps (Krini Crude, Lubricants, Greases, Aerosols, Get started); each is a
button that scrolls to its step, and *Skip intro* goes to the next section. A
thin bar along the foot fills as the film plays.

### How it plays

- **By scrolling, both ways.** The frames come in 20 sheets of ten (each
  sheet one image, the frames stacked top to bottom), loaded coarse to fine
  (every 8th sheet first, then every 4th, …), so any part of the film soon has
  a frame near it; until its own sheet is in, the nearest loaded frame shows.
  Between two frames the canvas blends them, so the film runs smoothly
  however slowly the visitor scrolls.
- **On a screen narrower than the film** (phones, tablets held upright) the
  crop follows the action (`heroSeq.focus`): the oil and the shaft, then the
  spray can on the right, then the gear.
- **Reduced motion, no JavaScript** (and for the moment before the script
  starts): the hero is one screen, the film's last frame (a 4:5 cut on screens
  taller than 4:5), with the name at the top and the promise and the buttons at
  the foot. The two flow one after the other, so on a screen too short for both
  the hero grows taller instead of letting them overlap. Every word is in the
  page either way: the steps are text, not part of the film.
- **The nav stays out of the way** while the film opens: it is hidden for
  the first three steps (the name, Lubricants & oils, Greases) and slides in
  for the last two (Aerosols & sprays, Engineered for Performance), staying
  from there on. Tabbing into it with the keyboard brings it back at any time.
  With reduced motion it is always there.
- **On phones** the quick-contact bar waits until the visitor is past the
  hero (its words sit where the bar would be).

### Files

| Path | What it is |
|------|------------|
| `src/components/ScrollHero.tsx` | Markup: the still, the canvas, the words for each step, the rail, the bar |
| `src/motion/scrollhero.ts` | Loads the sheets, draws the frame for the scroll position, the crop, the steps, the rail, the watermark |
| `src/content/site.ts` (`film`, `work`, `hero.lead`) | The name and its two lines, the promise; the three products and their lines; the figures line |
| `src/content/media.ts` (`heroSeq`) | Frames, frame rate, sheet paths, when each step starts (`beats`, in seconds of the film), how long the first frame holds (`lead`) and from where the last one does (`hold`), the crop's path (`focus`), where the watermark sits |
| `app/globals.css` (`.sh*`) | Layout, type, the shades under the words, the rail, the one-screen version |
| `public/images/hero-seq/s00.webp` … `s19.webp` | The 192 frames (24 a second), 1280 × 720, ten to a sheet: 7 MB in all |
| `public/images/hero-seq/end.webp`, `end-tall.webp` | The last frame, wide and cut 4:5 (with Flow's mark stamped in its corner) |
| `public/images/veo-mark.png` | Flow's watermark, shown by the page when the crop leaves the footage's own out of view |
| `scripts/hero/frames.sh` | Cuts a film into the sheets and the two stills; prints the frame count |

### Watermark

Flow requires its visible watermark: the word "Veo", bottom right of every
frame. It stays in every sheet where Flow put it. On the page the picture
covers the screen, so depending on the screen's shape the crop can leave it
out; then the same mark shows in the stage's corner instead. When the crop
would cut it in half, the picture moves a few pixels so it is either whole or
wholly out of view, so there is always exactly one whole mark on screen.
Without the motion, the still is drawn a little larger than the stage (by 9%,
13% for the tall cut) so the footage's own mark always falls outside it, and
the stage's mark is the one on screen.

### Replacing the film

Any 16:9 film of about 8 seconds works; real footage of Krini Crude's own
products in use would be the best upgrade.

```bash
bash scripts/hero/frames.sh film.mp4 24 0.5   # frames a second; where the subject of the last frame sits (0 left, 1 right)
```

Then set, in `heroSeq`: `frames` from what it prints, `beats` (the second at
which each step's part of the film starts), `focus` (where the subject sits as
it plays, for narrow screens); the words for each step are in
`site.work`. For footage without a watermark, set `heroSeq.mark` so the page
never shows one (for example, `width: 0`) and drop the stamp in `frames.sh`.
Change `seqVersion` in `src/content/media.ts` too: it is added to the frames'
addresses, and the frames are served as unchanging for a year, so without a
new version browsers keep showing the old film from their cache.

Before this film the hero was a 16-second film that played by itself (from
crude oil to the drum, made from the How it's made clips); it is in the
repository's history (October 2026).

## The showroom

After the welcome, the showroom is the live site's "Our Product Range", in
pictures:

- **The heading**: "Our Product Range" over **Complete Industrial Solutions**
  (an h2); its three words light up one by one with the three plinths.
- **Three cards** under it, side by side, one per product line. Each shows
  its picture in a square studio frame, lit by its own lamp: oil drum,
  grease pail, tin and bottle for Lubricants & Greases; jerrycans, drum, a
  pail of release compound, formwork and rebar for Construction Chemicals;
  spray cans for Aerosols. The square is cut from the top of the 3:4
  picture, so the products fill the frame and the bottom edge, with Flow's
  mark, stays whole; the studio's black is lifted to the card's deep navy (a
  navy layer in screen mode). Under the picture, on deep navy: its number and
  the live site's name (Lubricants, Construction, Aerosols), the live site's
  description, then, under a rule, its products as listed on the live site,
  as a list with yellow squares (two columns where the names fit, one on
  phones), and "View lubricants" (and so on) in yellow at the foot. The lists
  start at the same height across the row. The whole card is the link.
- **Beside the heading:** a short paragraph with the published figures (70+
  products, 1000+ clients, across India, own factory in Chennai, private
  label) and the two buttons, View products and Get a quote.
- **Under the plinths:** "AI-generated product visualisations (Google Flow),
  not Krini Crude packaging".

**On phones** (and portrait screens under 900px) the cards become a row to
swipe, under the heading, with dots below; then the buttons and the
paragraph. From 900px the three cards stand side by side, equal in height.

### What makes it feel premium

- **The lights come on.** When the showroom scrolls into view the room is
  dark. The heading rises line by line, then the lamps come on one card at a time, left to right,
  with a short flicker as each lamp strikes, and each card's word in the
  heading turns the brand yellow as its lamp comes on; once all three are lit, the words
  settle back to white. A band of light then sweeps across the three pictures.
  The whole entrance is CSS and lasts about 3.5 s. It plays when the
  showroom comes into view, once the three pictures are in (at most 2.5 s),
  so it never lights empty frames.
- **Choosing a card.** Pointing at a card (or tabbing to it) lifts it with a
  yellow edge, softens the other two, brightens its lamp, sends a band of
  light across it and turns its word in the heading yellow; a soft light
  follows the pointer over it.
- **One studio.** The pictures are never faded, and their crop keeps the
  bottom edge, so Flow's watermark stays in each corner. They were graded to
  match (same depth of the back wall, the same warm highlights), and the
  navy layer gives the three the same ground as the cards.
- **On phones,** the word in the heading follows the card in view once the
  visitor has swiped, and each card's light sweeps across it the first time it
  comes into view.
- **Leaving the showroom,** the words drift up and the cards sink and dim.

### Layout

| Screen | Layout |
|--------|--------|
| Landscape from 900×540 | Heading and paragraph side by side, the cards below, equal in height: each picture square, then the words. The name of each line fits on one line where it can. |
| Portrait from 900px wide | Same; the height follows the content. |
| Under 900px, or portrait | Heading, then the cards (78% of the width, up to 420px; up to 70% of the height on phones held sideways), dots, buttons, paragraph. |

### Files

| Path | What it is |
|------|------------|
| `src/components/Showroom.tsx` | Markup: heading, paragraph and buttons, the plinths, dots, credit; the inline script that starts the entrance once the showroom is in view |
| `src/motion/showroom.ts` | Pointer light, swipe and dots, scroll exit, a late fallback start |
| `src/content/site.ts` (`hero`) | Kicker, heading (the words in [brackets] are the product lines), paragraph, what each line covers |
| `src/content/site.ts` (`products`) | The plinths' numbers, names and links |
| `src/content/media.ts` (`heroMedia`) | Picture paths and descriptions, the credit |
| `app/globals.css` (`.hs*`) | Layout, fades, lights, hover and focus, phone cards, the entrance |
| `public/images/showroom-*.webp` | The pictures: 1200×1600 (larger screens), `-sm` 720×960 (phones) |
| `scripts/showroom.py` | Grades the three Flow downloads to match and exports the WebP files |

### The pictures

Generated with Google Flow (image, Nano Banana Pro, 3:4, two outputs per
prompt, no credits), downloaded at 2K ("2K Upscaled", 1792×2400) and graded
with `scripts/showroom.py`. Every prompt asks for plain, unbranded
containers, so no picture shows a product or brand that does not exist.

**Lubricants & Greases.** *Premium studio product photograph, photorealistic,
3:4 portrait. A tidy group of unbranded industrial lubricant packaging
standing on a glossy black cube plinth under a soft spotlight from above,
against a dark charcoal seamless backdrop: a steel oil drum painted deep
graphite with two raised rolling hoops, a black 20-litre pail with its lid
leaning against it showing smooth glossy amber grease inside, a rectangular
metal 5-litre oil can and a clear bottle of golden oil catching the light.
Warm amber rim light from behind, faint haze in the spotlight, crisp
reflections on the plinth top, deep blacks, high-end commercial look. Plain
containers with blank surfaces: absolutely no text, no letters, no numbers,
no logos, no labels, no brand names.*

**Construction Chemicals.** *Premium studio product photograph, photorealistic, 3:4
portrait, on a glossy black reflective plinth against a dark charcoal
seamless backdrop. A tidy group of unbranded construction chemical packaging:
two matte black 20-litre jerrycans of mold release oil, a steel 50-litre drum
and an open pail of thick amber shuttering grease, with a small panel of steel
concrete formwork and a few rebar rods standing behind them, fine concrete
dust hanging in the light. Warm amber rim light from behind, soft top key
light, crisp reflections on the plinth, deep blacks, high-end commercial look.
Plain containers with blank surfaces: absolutely no text, no letters, no
numbers, no logos, no labels, no brand names.*

**Aerosols.** *Premium studio product photograph, photorealistic, 3:4
portrait, on a glossy black reflective plinth against a dark charcoal
seamless backdrop. A tidy group of five unbranded industrial aerosol spray
cans of different heights, in brushed aluminium and matte black finishes with
amber and black caps; the front can releases a fine glowing mist that catches
the backlight. Warm amber rim light from behind, soft top key light, crisp
reflections on the plinth, deep blacks, high-end commercial look. Plain cans
with blank surfaces: absolutely no text, no letters, no numbers, no logos, no
labels, no brand names.*

**Watermark:** Flow requires its visible watermark (a small sparkle, bottom
right) in this region. The page never crops the pictures, and the fade at
their edges leaves a small area around the mark untouched, so the mark stays
whole on every screen. The plinth's words keep clear of that corner.

### Replacing a picture

Real photographs of Krini Crude's own products are the best upgrade: the
pictures are labelled as AI-generated because they are not.

1. Use a 3:4 picture (1200×1600 or larger) with the products standing in the
   lower two thirds and some dark space above them: the name sits at the top
   and the plinth's words at the bottom. A dark background fades into the page
   best.
2. For Flow downloads: put them in `flow-src/` (git-ignored) as
   `lubricants.jpg`, `construction.jpg` and `aerosols.jpg`, measure how bright
   each picture's back wall is (0 to 255) and set `WALL` in
   `scripts/showroom.py`, then run `python3 scripts/showroom.py`. For your own
   photographs, export `showroom-<line>.webp` (1200×1600) and
   `showroom-<line>-sm.webp` (720×960) to `public/images/` directly.
3. Update the picture's description (`alt`) in `src/content/media.ts`, and
   the credit line there if the pictures are no longer AI-generated. If your
   pictures carry no watermark, the fade can reach the bottom right corner:
   drop `--hs-keep` from the `.hs-media` mask in `app/globals.css`.

### Behaviour

- **Entrance:** CSS animations, paused until the showroom is in view and its
  three pictures have loaded (at most 2.5 s after it comes into view); the
  inline script at the end of the showroom then adds `.is-go`. If that script
  never runs, `src/motion/showroom.ts` starts it 3 s after the showroom comes
  into view.
- **Reduced motion:** no entrance, no pointer light, no scroll exit; the
  showroom is complete as it comes into view. Choosing a plinth still dims the others.
- **No JavaScript:** the showroom is complete on first paint (a `<noscript>` style
  turns the entrance off); the cards still swipe on phones, the dots are
  hidden.
- **Keyboard:** each plinth is one link ("View lubricants"); focus
  outlines the whole plinth and lights it like the pointer does.

### Share image

`public/images/og.jpg` (1200×630, used when the page is shared) is a capture
of the showroom after its entrance, without the menu and buttons: it says what
Krini Crude makes at a glance, which the film's frames alone do not. Capture it again the
same way if the heading or the pictures change.

## Section stills

The pictures in the sections below the hero (About, the production hall in
Services, Products, the Blog cards, the backdrop of Contact) are frames from
Google Flow footage (Veo 3.1, 16:9, 8 s clips). `python3 scripts/film/stills.py`
cuts them again from `film-src/A-drop.mp4`, `B-gears.mp4`, `C-plant.mp4`,
`D-formwork.mp4`, `E-aerosol.mp4` and `F-aerial.mp4` (or from the folder in
`STILLS_SRC`).

Each frame on the page gets a still cut to exactly its shape, so the page never
crops a picture: where a frame changes shape with the screen there is one still
per shape, picked with `<picture>` (the hall: 4:3, 16:9 and 21:9; the products:
4:5 for the sticky frame and 4:3 on smaller screens; Contact: 4:5, 16:9 and
21:9). Each carries Flow's visible "Veo" mark bottom right
(`scripts/film/veo-watermark.png`, put back where a crop loses the original).
The page keeps it whole: pictures are anchored at that corner, only ever scale
about it (the roller-shutter entrance, the push-in on hover, the slow zoom as
the hall and the Contact backdrop cross the screen), and parallax moves whole
frames, never a picture inside its frame. The Contact backdrop fades into the
page at its edges except around the mark, and ends above the form. The plant
and aerial frames show a generic plant, not the Krini Crude factory. They are
captioned as AI-generated; replace them with real photographs when possible,
cut to the same shapes.

Prompts for those clips:

- **Oil drop** (A-drop). *Extreme macro close-up, photorealistic premium
  industrial commercial. A single thick drop of clear golden-amber lubricant
  oil slowly swells at the tip of a polished stainless-steel nozzle, stretches
  on a thin neck, detaches and falls in slow motion onto a brushed steel
  machine bed, where it merges with a thin film of oil and sends smooth
  concentric ripples outward. Viscous, glossy, physically accurate fluid
  behaviour, no splash. Background: large steel gears, softly out of focus,
  glowing with warm amber back-light. Camera: locked-off macro lens, then a
  slow tilt down that follows the falling drop. Very shallow depth of field,
  crisp specular highlights, dark low-key studio lighting with a cool white
  top light and a warm amber rim light, deep blacks, fine film grain,
  anamorphic cinema look.*
- **Gears** (B-gears). *Slow cinematic orbit around a massive open gear train
  mounted on a dark cast-iron machine housing, photorealistic premium
  industrial commercial. Precision-machined steel spur gears of different
  sizes mesh and rotate steadily. A thin, continuous stream of golden-amber
  lubricant pours from a small copper nozzle onto the point where the gear
  teeth meet and is drawn between the teeth; oil glistens on the machined gear
  faces and drips into a steel tray below. Accurate reflections on brushed
  metal, realistic viscous oil. Shallow depth of field, low-key lighting with a
  cool white top light and warm amber practical light, deep blacks, fine film
  grain, anamorphic 35mm cinema look.*
- **Plant** (C-plant). *Smooth forward dolly shot at head height down the
  central aisle of a clean, modern lubricant blending plant, photorealistic
  premium industrial commercial. Rows of tall brushed stainless-steel process
  tanks on both sides, overhead pipe racks with flanged pipes and valves,
  high-bay lamps casting soft light shafts through faint haze, yellow safety
  lines on a polished dark concrete floor. Precise, orderly, high-end
  manufacturing environment with no people in the foreground. Shallow depth of
  field, low-key lighting with cool white overhead light and warm amber
  practical lights, deep shadows, fine film grain, anamorphic 35mm cinema
  look.*
- **Formwork** (D-formwork). *Slow lateral tracking shot on a construction
  site at dusk, photorealistic premium industrial commercial. A wall of steel
  concrete-formwork panels is sprayed with release oil from a spray lance held
  by a gloved hand at the edge of frame: a fine mist hits the steel and the
  treated panels turn darker and glossy as the wet edge sweeps across them.
  Beside the formwork stands a smooth, freshly cast concrete wall with steel
  rebar rising from its top. Warm amber work lamps against cool blue dusk
  light, realistic mist and wet sheen on metal. Shallow depth of field, deep
  shadows, fine film grain, anamorphic 35mm cinema look.*
- **Spray burst** (E-aerosol). *Bench-level close-up in a dark industrial
  workshop, photorealistic premium industrial commercial. A plain matte
  graphite aerosol can with a thin amber band releases a fine mist across a
  freshly welded steel plate lying on a steel workbench. The atomised spray is
  strongly back-lit and drifts through the air, catching the light, and tiny
  droplets settle on the weld bead. Slow push-in. Very shallow depth of field,
  crisp metal texture, low-key lighting with a strong cool back light and warm
  amber fill, deep blacks, fine film grain, anamorphic 35mm cinema look.*
- **Aerial** (F-aerial). *Aerial drone shot at blue hour, photorealistic
  premium industrial commercial. The camera rises and slowly pulls back to
  reveal a large, modern industrial lubricant manufacturing facility: a long
  production hall with a metal roof, an outdoor tank farm of stainless-steel
  storage tanks, pipe bridges, internal roads and warm sodium lighting against
  a deep blue-grey sky, on the flat outskirts of a South Indian city. Smooth
  crane-up and pull-back, calm and majestic. High dynamic range, deep shadows,
  fine film grain, anamorphic cinema look.*

Tips if you regenerate:

- Ask for "no text, no logos, no labels": Flow otherwise invents brand names
  on cans and containers, and the site must not show products that don't
  exist.
- Leave out "anamorphic" and "film grain" for wide shots: they once made Veo
  frame the aerial as a strip of film with sprocket holes.
