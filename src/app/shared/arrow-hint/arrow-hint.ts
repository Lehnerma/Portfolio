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
import { buildArrowPath, rollArrowJitter } from './arrow-path';

/** One continuous pen stroke: a squiggle to the tip, then the arrow head in the same line. */
@Component({
  imports: [],
  selector: 'app-arrow-hint',
  styleUrl: './arrow-hint.scss',
  templateUrl: './arrow-hint.html',
})
export class ArrowHint {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly jitter = rollArrowJitter();

  /** Range in ms for the pause between two drawings; a random value is picked each time. */
  readonly interval = input<readonly [number, number]>([5000, 7000]);
  /** Range in s for the duration of one drawing; a random value is picked each time. */
  readonly drawTime = input<readonly [number, number]>([1, 1.5]);

  protected readonly reducedMotion = mediaQuery('(prefers-reduced-motion: reduce)');
  protected readonly inView = signal(false);
  protected readonly cycle = signal(0);

  /** Size of the host in px, as given by the surrounding layout. */
  private readonly size = signal({ width: 0, height: 0 });

  protected readonly viewBox = computed(() => `0 0 ${this.size().width} ${this.size().height}`);
  protected readonly path = computed(() => {
    const { width, height } = this.size();
    return width && height ? buildArrowPath(this.jitter, width, height) : '';
  });
  protected readonly drawDuration = computed(() => {
    this.cycle();
    return randomBetween(...this.drawTime());
  });

  constructor() {
    afterNextRender(() => {
      this.observeSize();
      this.observeViewport();
    });
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

  /** Redraws the path in real pixels whenever the layout changes the width of the arrow. */
  private observeSize(): void {
    const observer = new ResizeObserver(([entry]) =>
      this.size.set({ width: entry.contentRect.width, height: entry.contentRect.height }),
    );
    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
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
