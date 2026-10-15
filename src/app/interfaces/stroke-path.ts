/** A 2D coordinate as `[x, y]`. */
export type Point = [number, number];

/** Returns a random value around a center; `spread` is the maximum deviation at intensity 1. */
export type Randomizer = (center: number, spread: number) => number;

/** Draws the SVG path data (`d` attribute) for a measured size in px. */
export type StrokeDrawer = (width: number, height: number) => string;

/** Available stroke styles. */
export type StrokeVariant = 'scribble' | 'wave' | 'circle' | 'double' | 'squiggle';

/** Pixels per unit of the 100×40 design area: `w` horizontally, `u` vertically. */
export interface Scale {
  w: number;
  u: number;
}

/** Start, peak, return and end positions of the scribble, in design units. */
export interface ScribbleAnchors {
  startX: number;
  startY: number;
  peakX: number;
  peakY: number;
  returnY: number;
  endX: number;
  endY: number;
}

/** Control points of the scribble curves, in design units. */
export interface ScribbleControls {
  firstCtrl: Point;
  hookDx: number;
  hookCtrl: Point;
  finalCtrl1: Point;
  finalCtrl2: Point;
}

/** Complete randomized shape of a scribble. */
export type ScribbleShape = ScribbleAnchors & ScribbleControls;

/** Randomized shape of a wave, in design units. */
export interface WaveShape {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  ctrl1: Point;
  ctrl2: Point;
}

/** Randomized shape of a circle. */
export interface CircleShape {
  startAngle: number;
  sweep: number;
  grow: number;
  jitter: number[];
}

/** One cubic Bézier line of the double stroke, in units of a 100×40 area. */
export interface DoubleLine {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  ctrl1: Point;
  ctrl2: Point;
}

/** Randomized shape of a squiggle. */
export interface SquiggleShape {
  startX: number;
  endX: number;
  baseY: number;
  drift: number;
  wavelength: number;
  amplitude: number;
  jitter: number[];
}

/** Squiggle geometry resolved for a measured size, in px. */
export interface SquiggleLayout {
  startPx: number;
  step: number;
  peak: number;
  halfWaves: number;
  yAt: (t: number) => number;
}
