import { Point } from '../../interfaces/stroke-path';
import { randomBetween } from '../underline-title/stroke-path';

/** Point at fraction `t` on the line from `from` to `to`; also blends two points. */
const along = (from: Point, to: Point, t: number): Point => [
  from[0] + (to[0] - from[0]) * t,
  from[1] + (to[1] - from[1]) * t,
];

/** Shifts a point by a random amount of up to `by` in both directions. */
const wobble = ([x, y]: Point, by: number): Point => [
  x + randomBetween(-by, by),
  y + randomBetween(-by, by),
];

const format = ([x, y]: Point): string => `${x.toFixed(2)} ${y.toFixed(2)}`;

/**
 * Control points of both curves, blended between two shapes: on the straight lines between
 * the anchors (pointed turn) and with a horizontal tangent at the bend (round bowl, the long
 * stroke swings out before it sweeps up).
 * @param s Start of the short stroke.
 * @param b Lowest point where the tick turns.
 * @param e Tip of the long stroke.
 * @param roundness 0 = pointed with straight strokes, 1 = fully rounded.
 * @returns Two control points for the short stroke, two for the long stroke.
 */
function controlPoints(s: Point, b: Point, e: Point, roundness: number): Point[] {
  const down = along(s, b, 0.7);
  const back = along(b, s, 0.7);
  const out = along(b, e, 0.35);
  const sweep = along(e, b, 0.1);
  const rise = along(e, b, 0.45);
  return [
    along(down, [s[0] - 1.5, down[1]], roundness),
    along(along(b, s, 0.3), [back[0], b[1]], roundness),
    along(along(b, e, 0.3), [out[0], b[1] - 0.5], roundness),
    along(along(b, e, 0.7), [sweep[0], rise[1]], roundness),
  ];
}

/**
 * Draws one pass of the tick through the anchors, each shifted by up to `spread`.
 * @param anchors Start, bend and tip of the tick.
 * @param spread Maximum deviation of every point in design units.
 * @param roundness 0 = pointed, 1 = fully rounded.
 * @returns The SVG path data of the pass.
 */
function drawStroke(anchors: Point[], spread: number, roundness: number): string {
  const [s, b, e] = anchors.map((point) => wobble(point, spread));
  const [c1, c2, c3, c4] = controlPoints(s, b, e, roundness).map((p) => wobble(p, spread * 1.5));
  return `M${format(s)} C${format(c1)} ${format(c2)} ${format(b)} C${format(c3)} ${format(c4)} ${format(e)}`;
}

/**
 * Draws a bold, hand-drawn tick that overshoots a 24×24 box to the top right.
 * It is traced twice with different wobble, like going over it again with a marker, and every
 * tick gets its own roundness from pointed to softly curved.
 * @returns The SVG path data (`d` attribute).
 */
export function createTick(): string {
  const anchors: Point[] = [
    [randomBetween(2.5, 5), randomBetween(10, 13)],
    [randomBetween(8.5, 11), randomBetween(19, 23)],
    [randomBetween(25, 30), randomBetween(-8, -4)],
  ];
  const roundness = randomBetween(0, 1);
  return [0.6, 1.4].map((spread) => drawStroke(anchors, spread, roundness)).join(' ');
}
