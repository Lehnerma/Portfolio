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

/** Zeichnet den Pfad für eine gemessene Größe (px). */
export type StrokeDrawer = (width: number, height: number) => string;

const fmt = (value: number): string => value.toFixed(1);

/**
 * Würfelt die Form eines Strichs einmal aus und liefert eine Funktion, die ihn für eine
 * gemessene Größe in echten Pixeln zeichnet (viewBox = Pixelmaße, keine Verzerrung).
 *
 * Horizontale Ankerpunkte skalieren mit der Breite, vertikale Werte und der Rücksprung
 * (Schleife) mit der Höhe – so bleibt die Schleife in jedem Seitenverhältnis gleich geformt.
 */
export function createStrokePath(): StrokeDrawer {
  const randomize = createRandomizer();
  // Werte in Einheiten einer 100×40-Fläche, werden unten in Pixel umgerechnet
  const startX = Math.max(0, randomize(4, 4));
  const startY = randomize(24, 4);
  const peakX = randomize(46, 8);
  const peakY = randomize(15, 5);
  const returnY = randomize(34, 4);
  const endX = Math.min(100, randomize(95, 5));
  const endY = randomize(21, 5);
  const firstCtrl = [randomize(23, 9), randomize(19, 5)];
  const hookDx = randomize(-10, 8); // Rücksprung, mit der Höhe skaliert
  const hookCtrl = [randomize(3, 3), randomize(3, 3)];
  const finalCtrl1 = [randomize(20, 10), randomize(3, 3)];
  const finalCtrl2 = [randomize(25, 10), randomize(3, 3)];

  return (width, height) => {
    const w = width / 100; // px pro horizontaler Einheit
    const u = height / 40; // px pro vertikaler Einheit
    const peakPx = peakX * w;
    const returnPx = peakPx + hookDx * u;
    return (
      `M ${fmt(startX * w)} ${fmt(startY * u)} ` +
      `Q ${fmt(firstCtrl[0] * w)} ${fmt(firstCtrl[1] * u)} ${fmt(peakPx)} ${fmt(peakY * u)} ` +
      `Q ${fmt(peakPx + hookCtrl[0] * u)} ${fmt((peakY + hookCtrl[1]) * u)} ${fmt(returnPx)} ${fmt(returnY * u)} ` +
      `C ${fmt(returnPx + finalCtrl1[0] * w)} ${fmt((returnY - finalCtrl1[1]) * u)} ` +
      `${fmt((endX - finalCtrl2[0]) * w)} ${fmt((endY + finalCtrl2[1]) * u)} ${fmt(endX * w)} ${fmt(endY * u)}`
    );
  };
}
