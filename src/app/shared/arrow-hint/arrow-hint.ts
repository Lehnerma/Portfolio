import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { randomBetween } from '../underline-title/stroke-path';
import { mediaQuery } from '../utils/media-query';

/** One continuous pen stroke: a gentle wave to the tip, then the arrow head in the same line. */
const DEFAULT_PATH = 'M 4 30 C 50 8 96 40 150 24 S 232 12 268 21 L 246 7 L 268 21 L 248 37';

@Component({
  imports: [],
  selector: 'app-arrow-hint',
  styleUrl: './arrow-hint.scss',
  templateUrl: './arrow-hint.html',
  host: { '[style.aspect-ratio]': 'aspectRatio()' },
})
export class ArrowHint {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Centerline of the arrow as SVG path data; it is drawn as a stroke, not as a filled shape. */
  readonly path = input(DEFAULT_PATH);
  readonly viewBox = input('0 0 280 44');
  /** Range in ms for the pause between two drawings; a random value is picked each time. */
  readonly interval = input<readonly [number, number]>([5000, 7000]);
  /** Range in s for the duration of one drawing; a random value is picked each time. */
  readonly drawTime = input<readonly [number, number]>([1, 1.5]);

  protected readonly reducedMotion = mediaQuery('(prefers-reduced-motion: reduce)');
  protected readonly inView = signal(false);
  protected readonly cycle = signal(0);

  protected readonly aspectRatio = computed(() => {
    const [, , width, height] = this.viewBox().split(/\s+/);
    return `${width} / ${height}`;
  });
  protected readonly drawDuration = computed(() => {
    this.cycle();
    return randomBetween(...this.drawTime());
  });

  constructor() {
    afterNextRender(() => this.observeViewport());
    effect((onCleanup) => {
      if (!this.inView() || this.reducedMotion()) return;
      let timer: ReturnType<typeof setTimeout>;
      const schedule = (): void => {
        const [min, max] = this.interval();
        timer = setTimeout(
          () => {
            this.cycle.update((cycle) => cycle + 1);
            schedule();
          },
          randomBetween(min, max),
        );
      };
      schedule();
      onCleanup(() => clearTimeout(timer));
    });
  }

  /** Draws the arrow only while it is visible, so nothing runs on the initial page load. */
  private observeViewport(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.inView.set(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => this.inView.set(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
