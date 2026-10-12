import { FoldSticker } from '../../interfaces/fold-sticker';
import { PointSticker } from '../../interfaces/point-sticker';

/**
 * Creates the four corners of a rectangle anchored at the origin.
 */
export function createRectangleCorners(width: number, height: number): PointSticker[] {
  return [
    { positionX: 0, positionY: 0 },
    { positionX: width, positionY: 0 },
    { positionX: width, positionY: height },
    { positionX: 0, positionY: height },
  ];
}

/**
 * Creates the fold line as the perpendicular bisector between the top-right
 * corner (the peel start) and the pointer. Returns null if there is no usable pointer position.
 */
export function createFold(width: number, pointer: PointSticker | null): FoldSticker | null {
  if (!pointer) {
    return null;
  }
  const deltaX = width - pointer.positionX;
  const deltaY = -pointer.positionY;
  const length = Math.hypot(deltaX, deltaY);
  if (length < 1) {
    return null;
  }
  const normalX = deltaX / length;
  const normalY = deltaY / length;
  const centerX = (width + pointer.positionX) / 2;
  const centerY = pointer.positionY / 2;
  return { normalX, normalY, offset: centerX * normalX + centerY * normalY };
}

/**
 * Creates a virtual pointer on the diagonal from the top-right corner towards
 * the bottom-left corner. Progress 1 is far enough to peel the sticker completely.
 */
export function createGuidePoint(width: number, height: number, progress: number): PointSticker {
  return {
    positionX: width - 2 * progress * width,
    positionY: 2 * progress * height,
  };
}

const KEY_STEPS: Record<string, number> = {
  ArrowRight: 0.1,
  ArrowUp: 0.1,
  ArrowLeft: -0.1,
  ArrowDown: -0.1,
};

/**
 * Maps a pressed key to the new keyboard peel progress (0 to 1).
 * Returns null for keys that do not change the progress.
 */
export function nextProgress(key: string, current: number): number | null {
  if (key === 'Home') {
    return 0;
  }
  if (key === 'End') {
    return 1;
  }
  const step = KEY_STEPS[key];
  return step === undefined ? null : Math.min(1, Math.max(0, current + step));
}

/**
 * Returns the signed distance of a point to the fold line.
 * The result is positive on the side selected by `side`.
 */
export function signedDistance(point: PointSticker, fold: FoldSticker, side: 1 | -1): number {
  return side * (point.positionX * fold.normalX + point.positionY * fold.normalY - fold.offset);
}

/**
 * Interpolates linearly between two points.
 */
export function interpolatePoint(
  from: PointSticker,
  to: PointSticker,
  ratio: number,
): PointSticker {
  return {
    positionX: from.positionX + (to.positionX - from.positionX) * ratio,
    positionY: from.positionY + (to.positionY - from.positionY) * ratio,
  };
}

/**
 * Clips a single polygon edge against the fold line and returns the points to keep.
 */
export function clipEdge(
  current: PointSticker,
  next: PointSticker,
  fold: FoldSticker,
  side: 1 | -1,
): PointSticker[] {
  const currentDistance = signedDistance(current, fold, side);
  const nextDistance = signedDistance(next, fold, side);
  const result: PointSticker[] = [];
  if (currentDistance >= 0) {
    result.push(current);
  }
  if (currentDistance * nextDistance < 0) {
    result.push(
      interpolatePoint(current, next, currentDistance / (currentDistance - nextDistance)),
    );
  }
  return result;
}

/**
 * Clips a polygon against the fold line and returns the part on the selected side.
 */
export function clipRectangle(
  corners: PointSticker[],
  fold: FoldSticker,
  side: 1 | -1,
): PointSticker[] {
  return corners.flatMap((current, index) =>
    clipEdge(current, corners[(index + 1) % corners.length], fold, side),
  );
}

/**
 * Calculates the cross product term of two consecutive polygon points (shoelace formula).
 */
export function crossTerm(current: PointSticker, next: PointSticker): number {
  return current.positionX * next.positionY - next.positionX * current.positionY;
}

/**
 * Calculates the area of a polygon.
 */
export function polygonArea(points: PointSticker[]): number {
  const sum = points.reduce(
    (total, current, index) => total + crossTerm(current, points[(index + 1) % points.length]),
    0,
  );
  return Math.abs(sum) / 2;
}

/**
 * Converts polygon points into a CSS `clip-path` value.
 * Fewer than three points result in a fully hidden clip path.
 */
export function toClipPath(points: PointSticker[]): string {
  if (points.length < 3) {
    return 'inset(100%)';
  }
  const list = points.map((point) => `${point.positionX}px ${point.positionY}px`).join(',');
  return `polygon(${list})`;
}

/**
 * Creates the CSS matrix that mirrors the sticker back side across the fold line.
 */
export function toReflectionMatrix(fold: FoldSticker): string {
  const { normalX, normalY, offset } = fold;
  const matrixA = 1 - 2 * normalX ** 2;
  const matrixB = -2 * normalX * normalY;
  const matrixD = 1 - 2 * normalY ** 2;
  const translateX = 2 * offset * normalX;
  const translateY = 2 * offset * normalY;
  return `matrix(${matrixA}, ${matrixB}, ${matrixB}, ${matrixD}, ${translateX}, ${translateY})`;
}

/**
 * Calculates which share (0 to 1) of the rectangle is folded away.
 */
export function calcClippedAmount(
  corners: PointSticker[],
  fold: FoldSticker,
  width: number,
  height: number,
): number {
  const topArea = polygonArea(clipRectangle(corners, fold, -1));
  return 1 - topArea / (width * height);
}

/**
 * Calculates the opacity that fades out once the clipped amount exceeds the threshold.
 * The threshold must be smaller than 1.
 */
export function calcFadeOpacity(amount: number, threshold: number): number {
  return amount > threshold ? Math.max(0, (1 - amount) / (1 - threshold)) : 1;
}

/**
 * Converts a pointer event into coordinates relative to the given bounds.
 */
export function toLocalPoint(event: PointerEvent, bounds: DOMRect): PointSticker {
  return {
    positionX: event.clientX - bounds.left,
    positionY: event.clientY - bounds.top,
  };
}
