import { randomBetween } from '../underline-title/stroke-path';

/** Upper limit of half waves, which also sizes the jitter table. */
const MAX_HALF_WAVES = 64;

/** Target length of one half wave in px; the number of waves follows from the width. */
const HALF_WAVE_LENGTH = 16;

/** Distance to the edges, so the round line caps are not clipped. */
const EDGE = 3;

/** Angle between the shaft and each wing of the arrow head. */
const HEAD_ANGLE = (30 * Math.PI) / 180;

/**
 * Formats a number to one decimal place for SVG path data.
 * @param value The number to format.
 * @returns The number as a string with one decimal place.
 */
const fmt = (value: number): string => value.toFixed(1);

/**
 * Rolls a per-wave amplitude factor once, so the squiggle looks hand drawn but stays stable
 * while the arrow is resized or redrawn.
 * @returns One factor per possible half wave.
 */
export const rollArrowJitter = (): number[] =>
  Array.from({ length: MAX_HALF_WAVES }, (): number => randomBetween(0.8, 1.2));

/**
 * Builds one half wave of the shaft as a quadratic Bézier segment. Even waves bend upwards,
 * odd waves downwards; the last waves shrink so the shaft runs out almost straight into the tip.
 * @param jitter Per-wave amplitude factors.
 * @param i Index of the half wave.
 * @param halfWaves Total number of half waves.
 * @param step Width of one half wave in px.
 * @param midY Baseline of the squiggle in px.
 * @param peak Maximum deviation from the baseline in px.
 * @returns The `Q` command for the half wave, preceded by a space.
 */
function halfWave(
  jitter: number[],
  i: number,
  halfWaves: number,
  step: number,
  midY: number,
  peak: number,
): string {
  const taper = Math.min(1, 0.3 + 0.35 * (halfWaves - 1 - i));
  const direction = i % 2 === 0 ? -1 : 1;
  const controlX = EDGE + step * (i + 0.5);
  const controlY = midY + direction * peak * 2 * jitter[i] * taper;
  return ` Q ${fmt(controlX)} ${fmt(controlY)} ${fmt(EDGE + step * (i + 1))} ${fmt(midY)}`;
}

/**
 * Builds the arrow head as the two wings around the tip, drawn in the same line as the shaft.
 * @param tipX Horizontal position of the tip in px.
 * @param tipY Vertical position of the tip in px.
 * @param length Length of one wing in px.
 * @returns The `L` commands wing → tip → wing, preceded by a space.
 */
function arrowHead(tipX: number, tipY: number, length: number): string {
  const dx = Math.cos(HEAD_ANGLE) * length;
  const dy = Math.sin(HEAD_ANGLE) * length;
  return (
    ` L ${fmt(tipX - dx)} ${fmt(tipY - dy)}` +
    ` L ${fmt(tipX)} ${fmt(tipY)}` +
    ` L ${fmt(tipX - dx)} ${fmt(tipY + dy)}`
  );
}

/**
 * Builds the path of the squiggle arrow for a measured size in real pixels (viewBox = pixel
 * dimensions, no distortion). The wave length stays the same in every width, so a wider arrow
 * gets more waves instead of stretched ones; amplitude and head scale with the height.
 * @param jitter Per-wave amplitude factors from `rollArrowJitter`.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns SVG path data of the arrow stroke.
 */
export function buildArrowPath(jitter: number[], width: number, height: number): string {
  const midY = height / 2;
  const tipX = width - EDGE;
  const span = tipX - EDGE;
  const halfWaves = Math.min(MAX_HALF_WAVES, Math.max(2, Math.round(span / HALF_WAVE_LENGTH)));
  const step = span / halfWaves;
  const peak = height * 0.2;
  const waves = Array.from({ length: halfWaves }, (_: unknown, i: number): string =>
    halfWave(jitter, i, halfWaves, step, midY, peak),
  );
  return `M ${fmt(EDGE)} ${fmt(midY)}${waves.join('')}${arrowHead(tipX, midY, height * 0.4)}`;
}
