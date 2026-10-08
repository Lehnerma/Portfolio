import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { createStrokePath, randomBetween } from '../stroke-path';

let nextId = 0;

@Component({
  imports: [],
  selector: 'app-underline-title',
  styleUrl: './underline-title.scss',
  templateUrl: './underline-title.html',
})
export class UnderlineTitle {
  private readonly svg = viewChild<ElementRef<SVGSVGElement>>('stroke');
  private readonly drawer = signal(createStrokePath());
  private readonly size = signal({ width: 0, height: 0 });

  filterId = `stroke-${nextId++}`; // protected readonly
  viewBox = computed(() => `0 0 ${this.size().width} ${this.size().height}`);
  pathData = computed(() => {
    const { width, height } = this.size();
    return width && height ? this.drawer()(width, height) : '';
  });
  strokeWidth = signal(randomBetween(4, 6)); // px (non-scaling-stroke)
  drawDuration = signal(randomBetween(0.35, 0.75));
  seed = signal(1);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const element = this.svg()?.nativeElement;
      if (!element) return;
      const observer = new ResizeObserver(([entry]) =>
        this.size.set({ width: entry.contentRect.width, height: entry.contentRect.height }),
      );
      observer.observe(element);
      onCleanup(() => observer.disconnect());
    });
  }

  /**
   * Randomizes the underline path and its animation properties.
   */
  randomize(): void {
    this.drawer.set(createStrokePath());
    this.strokeWidth.set(randomBetween(4, 6));
    this.drawDuration.set(randomBetween(0.35, 0.55));
    this.seed.set(Math.floor(randomBetween(0, 1000)));
  }
}
