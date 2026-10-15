import {
  CircleShape,
  DoubleLine,
  Point,
  Randomizer,
  Scale,
  ScribbleAnchors,
  ScribbleControls,
  ScribbleShape,
  SquiggleLayout,
  SquiggleShape,
  StrokeDrawer,
  StrokeVariant,
  WaveShape,
} from '../../interfaces/stroke-path';

/** Number of segments the circle is divided into. */
const CIRCLE_STEPS = 10;

/** Upper limit of half waves in a squiggle, which also sizes its jitter table. */
const MAX_HALF_WAVES = 64;

/**
 * Returns a random number within a range.
 * @param min Lower bound (inclusive).
 * @param max Upper bound (exclusive).
 * @returns A random number between `min` and `max`.
 */
export const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);

/**
 * Returns a random value around a center, with the spread scaled by the intensity.
 * @param center The value to vary around.
 * @param spread Maximum deviation from the center at intensity 1.
 * @param intensity Scale factor applied to the spread.
 * @returns A random value within `center ± spread * intensity`.
 */
const randomAround = (center: number, spread: number, intensity: number): number =>
  center + (Math.random() * 2 - 1) * spread * intensity;

/**
 * Creates a randomizer with a fixed intensity for a single stroke.
 * @returns A function that varies a value around a center using this stroke's intensity.
 */
const createRandomizer = (): Randomizer => {
  const intensity = randomBetween(0.3, 2); // 0.3 = nearly identical, 2 = very different
  return (center: number, spread: number): number => randomAround(center, spread, intensity);
};

/**
 * Formats a number to one decimal place for SVG path data.
 * @param value The number to format.
 * @returns The number as a string with one decimal place.
 */
const fmt = (value: number): string => value.toFixed(1);

/**
 * Converts degrees to radians.
 * @param degrees Angle in degrees.
 * @returns The angle in radians.
 */
const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/**
 * Computes the pixel scale of the 100×40 design area for a measured size.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns Pixels per horizontal (`w`) and vertical (`u`) unit.
 */
const scaleFor = (width: number, height: number): Scale => ({ w: width / 100, u: height / 40 });

/**
 * Rolls the anchor positions of a scribble.
 * @param randomize The randomizer of the current stroke.
 * @returns The anchors in units of a 100×40 area.
 */
function rollScribbleAnchors(randomize: Randomizer): ScribbleAnchors {
  return {
    startX: Math.max(0, randomize(4, 4)),
    startY: randomize(24, 4),
    peakX: randomize(46, 8),
    peakY: randomize(15, 5),
    returnY: randomize(34, 4),
    endX: Math.min(100, randomize(95, 5)),
    endY: randomize(21, 5),
  };
}

/**
 * Rolls the control points of a scribble.
 * @param randomize The randomizer of the current stroke.
 * @returns The control points in units of a 100×40 area.
 */
function rollScribbleControls(randomize: Randomizer): ScribbleControls {
  return {
    firstCtrl: [randomize(23, 9), randomize(19, 5)],
    hookDx: randomize(-10, 8), // return hook, scaled with the height
    hookCtrl: [randomize(3, 3), randomize(3, 3)],
    finalCtrl1: [randomize(20, 10), randomize(3, 3)],
    finalCtrl2: [randomize(25, 10), randomize(3, 3)],
  };
}

/**
 * Builds the scribble path data for a measured size.
 * @param s The randomized scribble shape.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns SVG path data of the scribble stroke.
 */
function buildScribblePath(s: ScribbleShape, width: number, height: number): string {
  const { w, u } = scaleFor(width, height);
  const peakPx = s.peakX * w;
  const returnPx = peakPx + s.hookDx * u;
  return (
    `M ${fmt(s.startX * w)} ${fmt(s.startY * u)} ` +
    `Q ${fmt(s.firstCtrl[0] * w)} ${fmt(s.firstCtrl[1] * u)} ${fmt(peakPx)} ${fmt(s.peakY * u)} ` +
    `Q ${fmt(peakPx + s.hookCtrl[0] * u)} ${fmt((s.peakY + s.hookCtrl[1]) * u)} ` +
    `${fmt(returnPx)} ${fmt(s.returnY * u)} ` +
    `C ${fmt(returnPx + s.finalCtrl1[0] * w)} ${fmt((s.returnY - s.finalCtrl1[1]) * u)} ` +
    `${fmt((s.endX - s.finalCtrl2[0]) * w)} ${fmt((s.endY + s.finalCtrl2[1]) * u)} ` +
    `${fmt(s.endX * w)} ${fmt(s.endY * u)}`
  );
}

/**
 * Rolls the shape of a scribble stroke once and returns a function that draws it for a measured
 * size in real pixels (viewBox = pixel dimensions, no distortion).
 *
 * Horizontal anchor points scale with the width, vertical values and the return hook (loop)
 * scale with the height, so the loop keeps the same shape in every aspect ratio.
 * @returns A drawer that builds the path data for a given width and height.
 */
export function createStrokePath(): StrokeDrawer {
  const randomize = createRandomizer();
  const shape: ScribbleShape = {
    ...rollScribbleAnchors(randomize),
    ...rollScribbleControls(randomize),
  };
  /** Draws the rolled scribble for the given size. */
  return (width: number, height: number): string => buildScribblePath(shape, width, height);
}

/**
 * Rolls the shape of a wave.
 * @returns The wave shape in units of a 100×40 area.
 */
function rollWaveShape(): WaveShape {
  const randomize = createRandomizer();
  return {
    startX: Math.max(0, randomize(2, 2)),
    endX: Math.min(100, randomize(98, 2)),
    startY: randomize(28, 3),
    endY: randomize(31, 4), // ends lower than the start
    ctrl1: [randomize(30, 8), randomize(12, 3)],
    ctrl2: [randomize(68, 8), randomize(12, 3)],
  };
}

/**
 * Builds the wave path data for a measured size.
 * @param s The randomized wave shape.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns SVG path data of the wave stroke.
 */
function buildWavePath(s: WaveShape, width: number, height: number): string {
  const { w, u } = scaleFor(width, height);
  return (
    `M ${fmt(s.startX * w)} ${fmt(s.startY * u)} ` +
    `C ${fmt(s.ctrl1[0] * w)} ${fmt(s.ctrl1[1] * u)} ${fmt(s.ctrl2[0] * w)} ${fmt(s.ctrl2[1] * u)} ` +
    `${fmt(s.endX * w)} ${fmt(s.endY * u)}`
  );
}

/**
 * Slightly curved stroke across the full width: rises gently and falls again towards the end.
 * @returns A drawer that builds the path data for a given width and height.
 */
export function createWavePath(): StrokeDrawer {
  const shape = rollWaveShape();
  /** Draws the rolled wave for the given size. */
  return (width: number, height: number): string => buildWavePath(shape, width, height);
}

/**
 * Rolls the shape of a circle.
 * @returns Start angle and sweep in radians, spiral growth and per-point radius jitter.
 */
function rollCircleShape(): CircleShape {
  const randomize = createRandomizer();
  return {
    startAngle: toRadians(randomize(-125, 25)),
    sweep: toRadians(360 + randomize(25, 12)),
    grow: randomize(0.05, 0.03), // spiral: the end lies slightly further out
    jitter: Array.from({ length: CIRCLE_STEPS + 1 }, (): number => randomize(0, 0.03)),
  };
}

/**
 * Computes the points on the circle for a measured size.
 * @param shape The randomized circle shape.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns The points in px, from the start to the slightly overlapping end.
 */
function circlePoints(shape: CircleShape, width: number, height: number): Point[] {
  const cx = width / 2;
  const cy = height / 2;
  return shape.jitter.map((offset: number, i: number): Point => {
    const t = i / CIRCLE_STEPS;
    const angle = shape.startAngle + shape.sweep * t;
    const scale = 0.94 + shape.grow * t + offset;
    return [cx + Math.cos(angle) * cx * scale, cy + Math.sin(angle) * cy * scale];
  });
}

/**
 * Builds the cubic Bézier segment between two neighbouring points (Catmull-Rom → Bézier).
 * @param points All points of the curve.
 * @param i Index of the segment's first point.
 * @returns The `C` command for the segment, followed by a space.
 */
function smoothSegment(points: Point[], i: number): string {
  const p0 = points[i - 1] ?? points[i];
  const p1 = points[i];
  const p2 = points[i + 1];
  const p3 = points[i + 2] ?? p2;
  return (
    `C ${fmt(p1[0] + (p2[0] - p0[0]) / 6)} ${fmt(p1[1] + (p2[1] - p0[1]) / 6)} ` +
    `${fmt(p2[0] - (p3[0] - p1[0]) / 6)} ${fmt(p2[1] - (p3[1] - p1[1]) / 6)} ` +
    `${fmt(p2[0])} ${fmt(p2[1])} `
  );
}

/**
 * Connects points to a soft curve.
 * @param points The points to connect, at least two.
 * @returns SVG path data running through all points.
 */
function smoothPath(points: Point[]): string {
  const [x, y] = points[0];
  const segments = points.slice(0, -1).map((_: Point, i: number) => smoothSegment(points, i));
  return `M ${fmt(x)} ${fmt(y)} ${segments.join('')}`.trim();
}

/**
 * Hand-drawn looking circle/ellipse around the whole area. The stroke starts at the top left,
 * runs clockwise and slightly overlaps its start at the end (a gentle spiral).
 * @returns A drawer that builds the path data for a given width and height.
 */
export function createCirclePath(): StrokeDrawer {
  const shape = rollCircleShape();
  /** Draws the rolled circle for the given size. */
  return (width: number, height: number): string => smoothPath(circlePoints(shape, width, height));
}

/**
 * Rolls the long upper line of the double stroke.
 * @param randomize The randomizer of the current stroke.
 * @returns The upper line in units of a 100×40 area.
 */
function rollOuterLine(randomize: Randomizer): DoubleLine {
  return {
    startX: Math.max(0, randomize(2, 2)),
    endX: Math.min(100, randomize(98, 2)),
    startY: randomize(13, 2),
    endY: randomize(11, 3),
    ctrl1: [randomize(30, 8), randomize(8, 3)],
    ctrl2: [randomize(68, 8), randomize(16, 3)],
  };
}

/**
 * Rolls the shorter, offset lower line of the double stroke.
 * @param randomize The randomizer of the current stroke.
 * @returns The lower line in units of a 100×40 area.
 */
function rollInnerLine(randomize: Randomizer): DoubleLine {
  return {
    startX: randomize(12, 6),
    endX: randomize(84, 8),
    startY: randomize(31, 2),
    endY: randomize(29, 3),
    ctrl1: [randomize(34, 8), randomize(34, 3)],
    ctrl2: [randomize(64, 8), randomize(27, 3)],
  };
}

/**
 * Builds the sub-path of a single line of the double stroke.
 * @param line The line in design units.
 * @param scale Pixels per design unit.
 * @returns SVG path data of the line.
 */
function buildDoubleLine(line: DoubleLine, { w, u }: Scale): string {
  return (
    `M ${fmt(line.startX * w)} ${fmt(line.startY * u)} ` +
    `C ${fmt(line.ctrl1[0] * w)} ${fmt(line.ctrl1[1] * u)} ` +
    `${fmt(line.ctrl2[0] * w)} ${fmt(line.ctrl2[1] * u)} ` +
    `${fmt(line.endX * w)} ${fmt(line.endY * u)}`
  );
}

/**
 * Two strokes on top of each other: the second one is shorter and offset. Both are sub-paths
 * of a single path; with pathLength=1 they are drawn one after the other.
 * @returns A drawer that builds the path data for a given width and height.
 */
export function createDoublePath(): StrokeDrawer {
  const randomize = createRandomizer();
  const lines: DoubleLine[] = [rollOuterLine(randomize), rollInnerLine(randomize)];
  /** Draws both rolled lines for the given size. */
  return (width: number, height: number): string => {
    const scale = scaleFor(width, height);
    return lines.map((line: DoubleLine): string => buildDoubleLine(line, scale)).join(' ');
  };
}

/**
 * Rolls the shape of a squiggle.
 * @returns The squiggle shape in units of a 100×40 area.
 */
function rollSquiggleShape(): SquiggleShape {
  const randomize = createRandomizer();
  return {
    startX: Math.max(0, randomize(2, 2)),
    endX: Math.min(100, randomize(98, 2)),
    baseY: randomize(24, 3),
    drift: randomize(0, 3), // slight slope along the length
    wavelength: randomize(26, 5),
    amplitude: randomize(8, 2),
    jitter: Array.from({ length: MAX_HALF_WAVES }, (): number => 1 + randomize(0, 0.25)),
  };
}

/**
 * Resolves wavelength, amplitude and wave count for a measured size. Wavelength and amplitude
 * scale with the height, the number of waves follows from the width.
 * @param shape The randomized squiggle shape.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns The layout in px, including a baseline function `yAt(t)` for `t` in 0…1.
 */
function layoutSquiggle(shape: SquiggleShape, width: number, height: number): SquiggleLayout {
  const { w, u } = scaleFor(width, height);
  const span = (shape.endX - shape.startX) * w;
  const waveLength = Math.max(shape.wavelength * u, 16);
  const peak = Math.min(shape.amplitude * u, waveLength * 0.3);
  const count = Math.round(span / (waveLength / 2));
  const halfWaves = Math.min(MAX_HALF_WAVES, Math.max(2, count));
  const yAt = (t: number): number => (shape.baseY + shape.drift * (t - 0.5)) * u;
  return { startPx: shape.startX * w, step: span / halfWaves, peak, halfWaves, yAt };
}

/**
 * Builds one half wave of the squiggle as a quadratic Bézier segment.
 * @param jitter Per-wave amplitude factors.
 * @param layout The squiggle layout in px.
 * @param i Index of the half wave; even waves bend upwards, odd waves downwards.
 * @returns The `Q` command for the half wave, preceded by a space.
 */
function squiggleSegment(jitter: number[], layout: SquiggleLayout, i: number): string {
  const { startPx, step, peak, halfWaves, yAt } = layout;
  const direction = i % 2 === 0 ? -1 : 1;
  const controlX = startPx + step * (i + 0.5);
  const controlY = yAt((i + 0.5) / halfWaves) + direction * peak * 2 * jitter[i];
  const endY = yAt((i + 1) / halfWaves);
  return ` Q ${fmt(controlX)} ${fmt(controlY)} ${fmt(startPx + step * (i + 1))} ${fmt(endY)}`;
}

/**
 * Builds the squiggle path data for a measured size.
 * @param shape The randomized squiggle shape.
 * @param width Measured width in px.
 * @param height Measured height in px.
 * @returns SVG path data of the squiggle stroke.
 */
function buildSquigglePath(shape: SquiggleShape, width: number, height: number): string {
  const layout = layoutSquiggle(shape, width, height);
  const start = `M ${fmt(layout.startPx)} ${fmt(layout.yAt(0))}`;
  const segments = Array.from({ length: layout.halfWaves }, (_: unknown, i: number): string =>
    squiggleSegment(shape.jitter, layout, i),
  );
  return start + segments.join('');
}

/**
 * Evenly looking wavy line (squiggle) across the width. Wavelength and amplitude scale with
 * the height; the number of waves follows from the width.
 * @returns A drawer that builds the path data for a given width and height.
 */
export function createSquigglePath(): StrokeDrawer {
  const shape = rollSquiggleShape();
  /** Draws the rolled squiggle for the given size. */
  return (width: number, height: number): string => buildSquigglePath(shape, width, height);
}

/** Maps each stroke variant to the factory that creates its drawer. */
const strokeFactories: Record<StrokeVariant, () => StrokeDrawer> = {
  scribble: createStrokePath,
  wave: createWavePath,
  circle: createCirclePath,
  double: createDoublePath,
  squiggle: createSquigglePath,
};

/**
 * Creates a freshly randomized stroke of the requested variant.
 * @param variant The stroke style to create.
 * @returns A drawer that builds the path data for a given width and height.
 */
export const createStroke = (variant: StrokeVariant): StrokeDrawer => strokeFactories[variant]();
