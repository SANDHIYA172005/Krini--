# How it's made

The page at `/how-its-made` follows the oil from the seabed to the drum, in
ten steps and four places. The home page's hero is a short film of it, one
moment from each place (`docs/HERO.md`), with a link here ("See every step").

| | Place | Step | The clip shows |
| --- | --- | --- | --- |
| 01 | In nature | Formed underground | Plankton drifting down onto the seabed |
| 02 | In nature | Trapped in rock | Crude oil seeping up between sand grains, under a layer of shale |
| 03 | At the oilfield | Found and drilled | A drilling rig lit up at dusk in the desert |
| 04 | At the oilfield | Brought to the surface | A pumpjack rocking at golden hour |
| 05 | At the oilfield | Shipped to a refinery | A crude oil tanker at sea at sunrise |
| 06 | At the refinery | Separated by heat | Distillation columns lit up at night |
| 07 | At the refinery | Split again, under vacuum | A vacuum distillation column and its pipework |
| 08 | At the refinery | Refined into base oil | Base oil poured into a glass beaker |
| 09 | At our plant | Blended to the formulation | Oil swirling in a blending tank as an additive pours in |
| 10 | At our plant | Tested, filled and dispatched | Filling nozzles pouring oil into drums |

## What is Krini Crude's, and what isn't

Steps 1 to 8 describe how the oil industry in general turns crude oil into
base oil: Krini Crude doesn't drill, ship or refine crude. Steps 9 and 10
happen at Krini Crude's factory in Tiruverkadu, Chennai (as the live site
states), and describe in general terms how lubricants are blended and packed.
The page groups the steps by place so this is plain, the lead says "the last
two steps happen at our factory", and in the home page's film the last place
is "At our plant", captioned "Blended & packed in Chennai".

What the live site doesn't say is marked **TBC** on the page, for the team to
confirm (`src/content/process.ts`):

- Step 9: where our base oils come from; our blending process and equipment
- Step 10: the tests run on each batch; pack sizes

The "Product by product" section explains, in general terms, which base oil
and additives each kind of product needs. It makes no claims about Krini
Crude's own formulations.

## The clips

Each step has a short clip made with Google Flow (Veo 3.1 Fast, text to
video, 16:9, 720p, 8 seconds), on the account suvedasathees24, project
"Oct 01 - 18:20". They are illustrations: none of them shows Krini Crude's
plant, products or packaging, and the page says so under the section's
heading ("AI-generated illustrations, not footage of our plant"). Flow's
visible watermark (the sparkle and "Veo", bottom right) stays in every frame:
the clips are never cropped, and the frame keeps their 16:9 shape.

The prompts:

| | Flow title | Prompt |
| --- | --- | --- |
| 01 | Plankton settling on seabed | Underwater documentary macro shot in dim blue-green light: countless tiny plankton and specks of organic matter drift slowly down through the water and settle on a dark, silty seabed. Fine sediment softly rains down, gradually burying them. Slow, steady downward camera drift. Photorealistic, cinematic, shallow depth of field, particles catching faint light from above. No text, no logos. |
| 02 | Crude oil seeping through sandstone | Extreme macro shot inside porous sandstone rock: glistening amber-brown crude oil slowly seeps upward between the rounded sand grains, filling the tiny gaps, and gathers in a pool beneath a dark, dense layer of shale above. Warm side lighting, slow lateral camera move. Photorealistic, cinematic, shallow depth of field. No text, no logos. |
| 03 | Drilling rig operating in desert | Wide shot of a tall steel drilling rig on a flat desert oilfield at dusk, its derrick lit by work lights against a deep blue sky, the drill string slowly turning, a little dust drifting in the air. Slow aerial orbit around the rig. Photorealistic, cinematic, natural motion. No text, no logos, no visible faces. |
| 04 | Pumpjack rocking on oilfield | A pumpjack on an oilfield at golden hour, its head slowly rocking up and down, with pipelines, a separator vessel and storage tanks in the background, warm low sunlight and long shadows. Slow dolly in towards the pumpjack. Photorealistic, cinematic. No text, no logos, no people. |
| 05 | Oil tanker sailing calm sea | One single continuous shot with no cuts and no transitions. A large crude oil tanker sails slowly across a calm open sea at sunrise, filmed from a steady aerial drone that tracks alongside the ship at a constant distance and height, a three-quarter view from behind. Low golden sun near the horizon, a long reflection on the water, a soft white wake behind the ship. The hull is plain dark red and black with no lettering, names or logos anywhere. Photorealistic, natural colours, cinematic documentary look, smooth gentle camera movement. |
| 06 | Oil refinery glowing at night | An oil refinery at night: tall distillation columns, pipe racks and towers glowing with thousands of small lights, a furnace flame flickering, white steam drifting. Slow upward crane shot along a tall distillation column. Photorealistic, cinematic, deep blue night with warm amber lights. No text, no logos. |
| 07 | Vacuum distillation column at re… | A tall vacuum distillation column and its wide, silver-insulated transfer pipes at a clean, well-kept oil refinery at dusk, white steam rising softly, warm work lights coming on against a deep blue sky. Slow upward tilt along the column. Photorealistic, cinematic, natural motion. No leaks, no text, no logos, no people. |
| 08 | Pouring base oil into beaker | A laboratory bench at a refinery: clear, pale golden base oil is poured from a steel jug into a glass beaker, bright light shining through the oil, a row of small glass sample bottles of oil behind it. Slow macro dolly. Photorealistic, cinematic, clean light. No text, no labels, no logos. |
| 09 | Oil mixing in blending tank | Inside a clean lubricant blending plant: looking into an open stainless-steel blending tank where golden oil swirls around a turning agitator while a thin stream of darker additive pours in from a steel nozzle, warm light on brushed steel. Slow push-in. Photorealistic, cinematic. No text, no logos, no people. |
| 10 | Nozzle pouring oil into drum | An industrial filling line: a steel filling nozzle pours golden lubricant oil into a plain dark steel drum, then the camera slides past a neat row of filled drums and pails with blank labels. Warm light, slow tracking shot. Photorealistic, cinematic. No text, no logos, no brand names. |

Two clips were made twice. The first vacuum clip (07, "Oil flowing in
refinery pipe") showed a leaking, rusty pipe, which is the wrong picture for a
well-run refinery. The first tanker clip (05, "Oil tanker sailing open sea")
turned out to be three different shots joined by dissolves. Both first
versions are still in the Flow project; they aren't used.

## Loops and posters

`scripts/film/process.sh` turns each 8-second clip into a seamless loop: from
a start point A it runs for L seconds, and over its last X seconds it
dissolves into the clip's first X seconds after A, so the end leads straight
back into the beginning. The file starts at A + X, a clean frame, which is
also the poster. For each loop it writes:

- `public/video/process/NN-id.mp4`: 1280x720, H.264, no sound
- `public/video/process/NN-id-m.mp4`: the same at 960x540
- `public/images/process/NN-id.webp`: the first frame (the poster)
- and, from step 09's poster frame, `public/images/og-process.jpg`
  (1200x630, the page's share picture; cut from the top of the frame so the
  watermark stays whole)

| | A | L | X | Why |
| --- | --- | --- | --- | --- |
| 01–05, 07, 09, 10 | 0.9 s | 6 s | 1 s | |
| 04 | 0.3 s | 6.6 s | 1 s | starts wider, on the whole pumpjack |
| 06 | 2.3 s | 4.8 s | 0.8 s | leaves out the furnace flame in the clip's first seconds |
| 08 | 0.3 s | 4.8 s | 0.8 s | leaves out the last two seconds (a label appears on the beaker, and the stream goes on with no jug) |

A loop is 0.4 to 1.6 MB at 960 wide and 0.6 to 2.5 MB at 1280; a poster is
30 to 85 KB.

## How the page behaves

`src/components/Process.tsx` (markup), `src/motion/process.ts` (behaviour),
the `.process-*` rules in `app/globals.css` (layout).

- A film frame stays in place while the steps scroll past: on the left from
  1024px wide, at the top on phones and tablets (with the steps scrolling
  under it). The step that crosses the reading line is the one shown (half way
  down the screen from 1024px; on phones and tablets, a third of the way down
  what is left below the frame). Its clip fades in over the last one and
  plays; every other clip is paused.
- The bar under the frame groups the steps by place. Each mark is a link to
  its step (it scrolls there, clear of the frame), the marks fill as the
  journey goes, and the step being read is marked `aria-current="step"`. The
  label in the frame's corner says which step and place it is.
- Loading: nothing loads until the section is within a screen of the
  viewport. Then the step being read and the steps either side of it load
  their clips and posters. The 960 copy is used when the frame is under 1150
  device pixels wide (phones; desktops at 1x), the 1280 copy otherwise. Only
  the first step's poster comes with the page.
- Off screen, the clip pauses. With Save-Data or reduced motion the clips
  never load and each step shows its poster; with reduced motion the bar's
  links jump instead of gliding.
- Without JavaScript every step reads in full and the frame shows the first
  step's poster.

## Replacing a clip

1. Make the new clip (16:9, at least 8 seconds) and save it as
   `film-src/process/NN-id.mp4` (for example `09-blended.mp4`).
2. Look at its frames and set its A, L and X in the table at the top of
   `scripts/film/process.sh` (A + L + X must fit in the clip).
3. Run `bash scripts/film/process.sh 09-blended` (or with no name, for all ten).
4. If the clip now shows something else, update its `alt` in
   `src/content/process.ts`.

Real footage of the plant can replace steps 9 and 10 the same way. Then
change the note under the heading (`processMedia.credit`), since those clips
would no longer be illustrations.

`processMedia.ready` in `src/content/process.ts` switches the clips off
(`false`): each step then shows a title card instead.
