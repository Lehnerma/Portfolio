import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { createStroke, randomBetween, StrokeVariant } from './stroke-path';

let nextId = 0;

@Component({
  imports: [],
  selector: 'app-underline-title',
  styleUrl: './underline-title.scss',
  templateUrl: './underline-title.html',
})
export class UnderlineTitle {
  private readonly svg = viewChild<ElementRef<SVGSVGElement>>('stroke');
  readonly variant = input<StrokeVariant>('scribble');

  private readonly rerolls = signal(0);
  private readonly drawer = computed(() => {
    this.rerolls();
    return createStroke(this.variant());
  });
  private readonly size = signal({ width: 0, height: 0 });

  filterId = `stroke-${nextId++}`;
  viewBox = computed(() => `0 0 ${this.size().width} ${this.size().height}`);
  pathData = computed(() => {
    const { width, height } = this.size();
    return width && height ? this.drawer()(width, height) : '';
  });
  strokeWidth = signal(randomBetween(4, 6));
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
}
