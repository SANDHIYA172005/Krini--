/**
 * The loading screen's emblem: two spur gears in mesh, with a drop of oil
 * forming where the teeth meet and falling away ("lubrication at the mesh
 * point"). Built once on the server, as SVG markup, and handed to boot.ts.
 *
 * Both gears share a module (tooth size), so their teeth fit: the big one has
 * 18 teeth, the small one 10, and their centres sit a pitch radius apart. The
 * CSS turns them at the same 18:10 ratio (12s and 6.667s a turn, opposite
 * ways), which keeps the teeth in mesh for as long as they spin.
 */

const MODULE = 5;
const BIG = 18;
const SMALL = 10;

/** Centre to centre: the two pitch circles touch. */
const CENTRES = ((BIG + SMALL) * MODULE) / 2;

/** The pair is tipped this far, small gear raised, so it reads as machinery rather than a diagram. */
const TILT = -10;

const n = (v: number) => {
  const r = Math.round(v * 100) / 100;
  return Object.is(r, -0) ? "0" : String(r);
};

/**
 * One gear's outline, centred on 0,0: `teeth` straight-flanked teeth of module
 * `m`. `phase` (radians) turns it so a tooth or a gap faces its partner.
 */
export function gearPath(teeth: number, m: number, phase = 0): string {
  const pitch = (teeth * m) / 2;
  const tip = pitch + m;
  const root = pitch - 1.25 * m;
  const step = (2 * Math.PI) / teeth;
  const at = (r: number, a: number) => `${n(r * Math.cos(a))} ${n(r * Math.sin(a))}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const c = phase + i * step;
    if (i === 0) d += `M${at(root, c - step * 0.28)}`;
    d +=
      `L${at(tip, c - step * 0.15)}` +
      `A${n(tip)} ${n(tip)} 0 0 1 ${at(tip, c + step * 0.15)}` +
      `L${at(root, c + step * 0.28)}` +
      `A${n(root)} ${n(root)} 0 0 1 ${at(root, c + step * 0.72)}`;
  }
  return `${d}Z`;
}

const ring = (count: number, radius: number, r: number, offset: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = offset + (i * 2 * Math.PI) / count;
    return `<circle cx="${n(radius * Math.cos(a))}" cy="${n(radius * Math.sin(a))}" r="${r}"/>`;
  }).join("");

// Where the teeth meet, on the line of centres, after the tilt: the drop forms here.
const meshAngle = (TILT * Math.PI) / 180;
const meshX = n(((BIG * MODULE) / 2) * Math.cos(meshAngle));
const meshY = n(((BIG * MODULE) / 2) * Math.sin(meshAngle));

/**
 * The gear pair as SVG markup. The big gear has a tooth facing right and the
 * small gear (turned half a tooth) a gap facing left, so they start in mesh.
 */
export function gearPairSvg(className = "kc-gears"): string {
  return (
    `<svg class="${className}" viewBox="-54 -54 157 108" aria-hidden="true" focusable="false">` +
    `<g transform="rotate(${TILT})">` +
    `<g class="kc-gear kc-gear--big">` +
    `<path pathLength="1" d="${gearPath(BIG, MODULE)}"/>` +
    `<circle r="13"/><circle r="5.5"/>${ring(6, 25.5, 5.5, Math.PI / 6)}` +
    `</g>` +
    `<g transform="translate(${CENTRES} 0)">` +
    `<g class="kc-gear kc-gear--small">` +
    `<path pathLength="1" d="${gearPath(SMALL, MODULE, Math.PI / SMALL)}"/>` +
    `<circle r="8"/><circle r="3.2"/>${ring(4, 13, 2.6, Math.PI / 4)}` +
    `</g>` +
    `</g>` +
    `</g>` +
    `<g transform="translate(${meshX} ${meshY})">` +
    `<path class="kc-drop" d="M0 -4.6C1.6 -2.2 3.2 -0.2 3.2 1.6A3.2 3.2 0 0 1 -3.2 1.6C-3.2 -0.2 -1.6 -2.2 0 -4.6Z"/>` +
    `</g>` +
    `</svg>`
  );
}
