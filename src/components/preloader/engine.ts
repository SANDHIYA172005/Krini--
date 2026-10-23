/**
 * The loading screen's emblem: a three-cylinder engine, cut away so its
 * insides show. The cylinder head with its spark plugs on top, the finned
 * block, three pistons on connecting rods, the crankshaft with its webs and
 * counterweights, the flywheel on the left, the timing pulley on the right and
 * the oil sump underneath.
 *
 * This file draws everything that stands still and leaves the moving parts in
 * place at top dead centre, each marked with a data attribute; boot.ts turns
 * the crank (as the page loads it revs up) and works out, for each cylinder,
 * where the crank pin is, where the piston sits on its rod (slider-crank:
 * y = c − (r cos θ + √(l² − r² sin² θ))) and when the charge fires.
 */

export type EngineGeometry = {
  /** The cylinders' centre lines. */
  cx: number[];
  /** Height of the crankshaft's axis. */
  cy: number;
  /** Crank throw (radius) and connecting-rod length. */
  r: number;
  l: number;
  /** Each cylinder's crank angle offset, radians (firing order 1-3-2, 120° apart). */
  phase: number[];
  /** Flywheel and pulley centres, turning with the crank. */
  wheels: { x: number; y: number }[];
};

export const engineGeometry: EngineGeometry = {
  cx: [86, 136, 186],
  cy: 150,
  r: 13,
  l: 46,
  phase: [0, (4 * Math.PI) / 3, (2 * Math.PI) / 3],
  wheels: [
    { x: 30, y: 150 },
    { x: 238, y: 150 },
  ],
};

const n = (v: number) => String(Math.round(v * 100) / 100);

/** The engine as SVG markup, moving parts at rest (top dead centre for cylinder 1). */
export function engineSvg(g: EngineGeometry = engineGeometry): string {
  const { cx, cy, r, l, wheels } = g;
  const left = 58;
  const right = 214;
  const headTop = 44;
  const deck = 64; // where the head meets the block
  const blockBottom = 128;
  const bore = 34;

  // ---- static: the block, its cylinders and fins
  const fins = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => {
      const y = deck + 8 + i * 8;
      return `<path d="M${left - 9} ${y}H${left}M${right} ${y}H${right + 9}"/>`;
    })
    .join("");
  const bores = cx
    .map((x) => `<rect class="kc-e-bore" x="${x - bore / 2}" y="${deck}" width="${bore}" height="${blockBottom - deck - 2}" rx="2"/>`)
    .join("");
  const plugs = cx
    .map(
      (x) =>
        `<g class="kc-e-plug"><rect x="${x - 4}" y="${headTop - 14}" width="8" height="10" rx="1.5"/><path d="M${x} ${headTop - 4}V${deck + 1}"/><rect x="${x - 2.5}" y="${headTop - 20}" width="5" height="6" rx="1"/></g>`,
    )
    .join("");
  const head =
    `<path class="kc-e-head" d="M${left - 4} ${deck}V${headTop + 6}Q${left - 4} ${headTop} ${left + 2} ${headTop}H${right - 2}Q${right + 4} ${headTop} ${right + 4} ${headTop + 6}V${deck}Z"/>` +
    // the cam cover's ribs
    [0.25, 0.5, 0.75].map((f) => `<path class="kc-e-rib" d="M${n(left + (right - left) * f)} ${headTop + 5}V${deck - 5}"/>`).join("");
  // the combustion glow in each chamber (opacity set by boot.ts)
  const glows = cx
    .map((x) => `<ellipse class="kc-e-fire" data-e-fire cx="${x}" cy="${deck + 7}" rx="${bore / 2 - 3}" ry="7" opacity="0"/>`)
    .join("");

  // ---- the crankcase and sump, with a little oil
  const caseD =
    `M${left} ${blockBottom}H${right}V${cy + 18}Q${right} ${cy + 26} ${right - 8} ${cy + 26}` +
    `H${left + 8}Q${left} ${cy + 26} ${left} ${cy + 18}Z`;
  const sump = `M${left + 18} ${cy + 26}H${right - 18}L${right - 26} ${cy + 40}H${left + 26}Z`;
  const oil = `<path class="kc-e-oil" data-e-oil d="M${left + 22} ${cy + 33}Q${(left + right) / 2} ${cy + 30} ${right - 22} ${cy + 33}L${right - 26} ${cy + 40}H${left + 26}Z"/>`;

  // ---- moving: crank throws (webs, counterweights, pins) turning about the axis
  const throws = cx
    .map(
      (x) =>
        `<g class="kc-e-throw" data-e-throw transform="rotate(0 ${x} ${cy})">` +
        // counterweight, opposite the pin
        `<path class="kc-e-cw" d="M${x - 15} ${cy + 2}A15 15 0 0 0 ${x + 15} ${cy + 2}Q${x} ${cy + 8} ${x - 15} ${cy + 2}Z"/>` +
        // web from the axis up to the pin
        `<path class="kc-e-web" d="M${x - 6} ${cy}L${x - 4} ${cy - r}A4 4 0 0 1 ${x + 4} ${cy - r}L${x + 6} ${cy}A6 6 0 0 1 ${x - 6} ${cy}Z"/>` +
        `<circle class="kc-e-pin" cx="${x}" cy="${cy - r}" r="3.4"/>` +
        `</g>`,
    )
    .join("");
  const shaft = `<path class="kc-e-shaft" d="M${wheels[0].x} ${cy}H${wheels[1].x}"/>` + cx.map((x) => `<circle class="kc-e-main" cx="${x - 25}" cy="${cy}" r="4"/>`).join("") + `<circle class="kc-e-main" cx="${cx[cx.length - 1] + 25}" cy="${cy}" r="4"/>`;

  // rods and pistons at top dead centre (boot.ts moves them)
  const rods = cx
    .map((x) => `<line class="kc-e-rod" data-e-rod x1="${x}" y1="${cy - r}" x2="${x}" y2="${cy - r - l}"/>`)
    .join("");
  const pistons = cx
    .map(
      (x) =>
        `<g class="kc-e-piston" data-e-piston transform="translate(${x} ${cy - r - l})">` +
        `<rect x="${-bore / 2 + 2}" y="-9" width="${bore - 4}" height="22" rx="2"/>` +
        `<path d="M${-bore / 2 + 2} -5H${bore / 2 - 2}M${-bore / 2 + 2} -1.5H${bore / 2 - 2}M${-bore / 2 + 2} 2H${bore / 2 - 2}"/>` +
        `<circle r="3"/>` +
        `</g>`,
    )
    .join("");

  // flywheel (ring gear teeth, spokes) and the timing pulley
  const fw = wheels[0];
  const teeth = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * 2 * Math.PI;
    return `M${n(fw.x + 22 * Math.cos(a))} ${n(fw.y + 22 * Math.sin(a))}L${n(fw.x + 25.5 * Math.cos(a))} ${n(fw.y + 25.5 * Math.sin(a))}`;
  }).join("");
  const flywheel =
    `<g class="kc-e-wheel" data-e-wheel transform="rotate(0 ${fw.x} ${fw.y})">` +
    `<circle cx="${fw.x}" cy="${fw.y}" r="22"/><path class="kc-e-teeth" d="${teeth}"/>` +
    `<circle cx="${fw.x}" cy="${fw.y}" r="6"/>` +
    [0, 1, 2, 3].map((i) => {
      const a = (i / 4) * 2 * Math.PI + Math.PI / 4;
      return `<circle class="kc-e-hole" cx="${n(fw.x + 14 * Math.cos(a))}" cy="${n(fw.y + 14 * Math.sin(a))}" r="3.6"/>`;
    }).join("") +
    `</g>`;
  const pw = wheels[1];
  const pulley =
    `<g class="kc-e-wheel" data-e-wheel transform="rotate(0 ${pw.x} ${pw.y})">` +
    `<circle cx="${pw.x}" cy="${pw.y}" r="14"/><circle cx="${pw.x}" cy="${pw.y}" r="10"/>` +
    `<path d="M${pw.x} ${pw.y - 10}V${pw.y + 10}M${pw.x - 10} ${pw.y}H${pw.x + 10}"/>` +
    `<circle cx="${pw.x}" cy="${pw.y}" r="3"/>` +
    `</g>`;

  return (
    `<svg class="kc-engine" viewBox="0 8 270 190" aria-hidden="true" focusable="false">` +
    `<g class="kc-e-static">` +
    `<path class="kc-e-case" d="${caseD}"/>` +
    `<path class="kc-e-sump" d="${sump}"/>` +
    oil +
    `<rect class="kc-e-block" x="${left}" y="${deck}" width="${right - left}" height="${blockBottom - deck}" rx="3"/>` +
    `<g class="kc-e-fins">${fins}</g>` +
    bores +
    `</g>` +
    glows +
    shaft +
    throws +
    rods +
    pistons +
    flywheel +
    pulley +
    `<g class="kc-e-static">${head}${plugs}</g>` +
    `<g class="kc-e-sparks">${cx.map((x) => `<circle data-e-spark cx="${x}" cy="${deck + 2}" r="2.6" opacity="0"/>`).join("")}</g>` +
    `</svg>`
  );
}
