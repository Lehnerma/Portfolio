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

/**
 * Leicht geschwungener Strich über die ganze Breite: steigt sanft nach oben
 * und fällt zum Ende wieder ab.
 */
export function createWavePath(): StrokeDrawer {
  const randomize = createRandomizer();
  const startX = Math.max(0, randomize(2, 2));
  const endX = Math.min(100, randomize(98, 2));
  const startY = randomize(28, 3);
  const endY = randomize(31, 4); // endet tiefer als der Start
  const ctrl1 = [randomize(30, 8), randomize(12, 3)];
  const ctrl2 = [randomize(68, 8), randomize(12, 3)];

  return (width, height) => {
    const w = width / 100;
    const u = height / 40;
    return (
      `M ${fmt(startX * w)} ${fmt(startY * u)} ` +
      `C ${fmt(ctrl1[0] * w)} ${fmt(ctrl1[1] * u)} ${fmt(ctrl2[0] * w)} ${fmt(ctrl2[1] * u)} ` +
      `${fmt(endX * w)} ${fmt(endY * u)}`
    );
  };
}

/**
 * Handgezeichnet wirkender Kreis/Ellipse um die gesamte Fläche. Der Strich startet oben links,
 * läuft im Uhrzeigersinn und überlappt am Ende leicht mit dem Anfang (leichte Spirale).
 */
export function createCirclePath(): StrokeDrawer {
  const randomize = createRandomizer();
  const steps = 10;
  const startAngle = (randomize(-125, 25) * Math.PI) / 180;
  const sweep = ((360 + randomize(25, 12)) * Math.PI) / 180;
  const grow = randomize(0.05, 0.03); // Spirale: das Ende liegt etwas weiter außen
  const jitter = Array.from({ length: steps + 1 }, () => randomize(0, 0.03));

  return (width, height) => {
    const cx = width / 2;
    const cy = height / 2;
    const points = jitter.map((offset, i) => {
      const t = i / steps;
      const angle = startAngle + sweep * t;
      const scale = 0.94 + grow * t + offset;
      return [cx + Math.cos(angle) * cx * scale, cy + Math.sin(angle) * cy * scale];
    });

    // Catmull-Rom → kubische Bézier-Segmente für eine weiche Kurve
    let d = `M ${fmt(points[0][0])} ${fmt(points[0][1])} `;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] ?? points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
      d +=
        `C ${fmt(p1[0] + (p2[0] - p0[0]) / 6)} ${fmt(p1[1] + (p2[1] - p0[1]) / 6)} ` +
        `${fmt(p2[0] - (p3[0] - p1[0]) / 6)} ${fmt(p2[1] - (p3[1] - p1[1]) / 6)} ` +
        `${fmt(p2[0])} ${fmt(p2[1])} `;
    }
    return d.trim();
  };
}

/**
 * Zwei Striche übereinander: der zweite ist kürzer und versetzt. Beide liegen als Teilpfade in
 * einem Pfad, mit pathLength=1 werden sie nacheinander gezeichnet.
 */
export function createDoublePath(): StrokeDrawer {
  const randomize = createRandomizer();
  const lines = [
    {
      startX: Math.max(0, randomize(2, 2)),
      endX: Math.min(100, randomize(98, 2)),
      startY: randomize(13, 2),
      endY: randomize(11, 3),
      ctrl1: [randomize(30, 8), randomize(8, 3)],
      ctrl2: [randomize(68, 8), randomize(16, 3)],
    },
    {
      startX: randomize(12, 6),
      endX: randomize(84, 8),
      startY: randomize(31, 2),
      endY: randomize(29, 3),
      ctrl1: [randomize(34, 8), randomize(34, 3)],
      ctrl2: [randomize(64, 8), randomize(27, 3)],
    },
  ];

  return (width, height) => {
    const w = width / 100;
    const u = height / 40;
    return lines
      .map(
        (line) =>
          `M ${fmt(line.startX * w)} ${fmt(line.startY * u)} ` +
          `C ${fmt(line.ctrl1[0] * w)} ${fmt(line.ctrl1[1] * u)} ` +
          `${fmt(line.ctrl2[0] * w)} ${fmt(line.ctrl2[1] * u)} ` +
          `${fmt(line.endX * w)} ${fmt(line.endY * u)}`,
      )
      .join(' ');
  };
}

/**
 * Gleichmäßig wirkende Wellenlinie (Squiggle) über die Breite. Wellenlänge und Amplitude
 * skalieren mit der Höhe, die Anzahl der Wellen ergibt sich aus der Breite.
 */
export function createSquigglePath(): StrokeDrawer {
  const randomize = createRandomizer();
  const maxHalfWaves = 64;
  const startX = Math.max(0, randomize(2, 2));
  const endX = Math.min(100, randomize(98, 2));
  const baseY = randomize(24, 3);
  const drift = randomize(0, 3); // leichtes Gefälle über die Länge
  const wavelength = randomize(26, 5);
  const amplitude = randomize(8, 2);
  const jitter = Array.from({ length: maxHalfWaves }, () => 1 + randomize(0, 0.25));

  return (width, height) => {
    const w = width / 100;
    const u = height / 40;
    const span = (endX - startX) * w;
    const waveLength = Math.max(wavelength * u, 16);
    const peak = Math.min(amplitude * u, waveLength * 0.3);
    const halfWaves = Math.min(maxHalfWaves, Math.max(2, Math.round(span / (waveLength / 2))));
    const step = span / halfWaves;
    const yAt = (t: number): number => (baseY + drift * (t - 0.5)) * u;

    let d = `M ${fmt(startX * w)} ${fmt(yAt(0))}`;
    for (let i = 0; i < halfWaves; i++) {
      const direction = i % 2 === 0 ? -1 : 1;
      const controlX = startX * w + step * (i + 0.5);
      const controlY = yAt((i + 0.5) / halfWaves) + direction * peak * 2 * jitter[i];
      const x = startX * w + step * (i + 1);
      d += ` Q ${fmt(controlX)} ${fmt(controlY)} ${fmt(x)} ${fmt(yAt((i + 1) / halfWaves))}`;
    }
    return d;
  };
}

export type StrokeVariant = 'scribble' | 'wave' | 'circle' | 'double' | 'squiggle';

const strokeFactories: Record<StrokeVariant, () => StrokeDrawer> = {
  scribble: createStrokePath,
  wave: createWavePath,
  circle: createCirclePath,
  double: createDoublePath,
  squiggle: createSquigglePath,
};

/** Erzeugt einen frisch ausgewürfelten Strich der gewünschten Variante. */
export const createStroke = (variant: StrokeVariant): StrokeDrawer => strokeFactories[variant]();
