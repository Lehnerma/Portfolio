export const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);

/** Zufallswert um einen Mittelpunkt, Streuung wird mit der Intensität skaliert. */
const randomAround = (center: number, spread: number, intensity: number): number =>
  center + (Math.random() * 2 - 1) * spread * intensity;

/** Liefert eine Zufallsfunktion mit fester Intensität für einen Strich. */
const createRandomizer = () => {
  const intensity = randomBetween(0.3, 2); // 0.3 = fast gleich, 2 = sehr verschieden
  return (center: number, spread: number): number => randomAround(center, spread, intensity);
};

type Randomizer = (center: number, spread: number) => number;

const createFirstCurve = (
  randomize: Randomizer,
  startX: number,
  startY: number,
  peakX: number,
  peakY: number,
): string => `M ${startX} ${startY} Q ${randomize(23, 9)} ${randomize(19, 5)} ${peakX} ${peakY} `;

const createSecondCurve = (
  randomize: Randomizer,
  peakX: number,
  peakY: number,
  returnX: number,
  returnY: number,
): string => `Q ${peakX + randomize(3, 3)} ${peakY + randomize(3, 3)} ${returnX} ${returnY} `;

const createFinalCurve = (
  randomize: Randomizer,
  returnX: number,
  returnY: number,
  endX: number,
  endY: number,
): string =>
  `C ${returnX + randomize(20, 10)} ${returnY - randomize(3, 3)} ` +
  `${endX - randomize(25, 10)} ${endY + randomize(3, 3)} ${endX} ${endY}`;

/** Erzeugt das SVG-Pfad-Attribut (viewBox 0 0 100 40) für einen leicht variierenden Strich. */
export function createStrokePath(): string {
  const randomize = createRandomizer();
  const startX = Math.max(0, randomize(4, 4));
  const startY = randomize(24, 4);
  const peakX = randomize(46, 8);
  const peakY = randomize(15, 5);
  const returnX = randomize(36, 8);
  const returnY = randomize(34, 4);
  const endX = Math.min(100, randomize(95, 5));
  const endY = randomize(21, 5);
  return (
    createFirstCurve(randomize, startX, startY, peakX, peakY) +
    createSecondCurve(randomize, peakX, peakY, returnX, returnY) +
    createFinalCurve(randomize, returnX, returnY, endX, endY)
  );
}
