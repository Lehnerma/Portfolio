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

let nextId = 0;

@Component({
  imports: [],
  selector: 'app-drag-hint',
  styleUrl: './drag-hint.scss',
  templateUrl: './drag-hint.html',
})
export class DragHint {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly prefix = input('U can');
  readonly suffix = input('us');
  readonly pointerWords = input<readonly string[]>(['hover', 'drag']);
  readonly touchWords = input<readonly string[]>(['touch', 'drag']);
  /** Time in ms between two flips; the arrow is redrawn on every flip. */
  readonly interval = input(3000);
  /** Static text for screen readers, the animated part is hidden from them. */
  readonly label = input('You can drag the project windows');

  private readonly isTouch = mediaQuery('(hover: none)');
  protected readonly reducedMotion = mediaQuery('(prefers-reduced-motion: reduce)');
  protected readonly inView = signal(false);
  protected readonly cycle = signal(0);

  private readonly words = computed(() =>
    this.isTouch() ? this.touchWords() : this.pointerWords(),
  );

  /** The word currently shown; with reduced motion all words at once, e.g. `hover/drag`. */
  protected readonly word = computed(() => {
    const words = this.words();
    return this.reducedMotion() ? words.join('/') : words[this.cycle() % words.length];
  });

  protected readonly filterId = `drag-hint-${nextId++}`;
  protected readonly strokeWidth = randomBetween(3, 4.5);

  constructor() {
    afterNextRender(() => this.observeViewport());
    effect((onCleanup) => {
      if (!this.inView() || this.reducedMotion()) return;
      const timer = setInterval(() => this.cycle.update((cycle) => cycle + 1), this.interval());
      onCleanup(() => clearInterval(timer));
    });
  }

  /** Starts the animation while the hint is visible and pauses it outside the viewport. */
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
