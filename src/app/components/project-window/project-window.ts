import { NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';

let nextWindowInstanceId = 0;

@Component({
  imports: [NgTemplateOutlet, RouterLink, SecondaryBtn],
  selector: 'app-project-window',
  styleUrl: './project-window.scss',
  templateUrl: './project-window.html',
})
export class ProjectWindow {
  readonly title = input<string>(); // *required
  readonly screenshotSrc = input<string>(); // *required
  readonly screenshotAlt = input<string>(); // *required
  readonly detailsLink = input<string>(); // *required
  readonly wobbleSeed = input(1);

  protected readonly isMinimized = signal(false);
  protected readonly isShaking = signal(false);
  protected readonly isFlipped = signal(false);
  protected readonly isCompact = signal(false);
  protected readonly offset = signal({ x: 0, y: 0 });
  protected readonly translateValue = computed(() => `${this.offset().x}px ${this.offset().y}px`);
  protected readonly isDragging = signal<boolean>(false);

  protected grabOrigin = { x: 0, y: 0 };

  private readonly instanceId = nextWindowInstanceId++;
  protected readonly frameFilterId = `window-frame-filter-${this.instanceId}`;
  protected readonly controlFilterId = `window-control-filter-${this.instanceId}`;

  constructor() {
    this.watchCompactBreakpoint();
  }

  protected toggleMinimized(): void {
    this.isMinimized.update((isMinimized) => !isMinimized);
  }

  protected shakeWindow(): void {
    if (this.isDragging()) return;
    this.isShaking.set(true);
  }

  protected onShakeEnd(): void {
    this.isShaking.set(false);
  }

  protected toggleFlipped(event: MouseEvent): void {
    if ((event.target as Element).closest('a, button:not(.project-window__flip)')) return;
    this.isFlipped.update((isFlipped) => !isFlipped);
  }

  /**
   * Mirrors the `md` breakpoint (768px): below it the caption is rendered under the window.
   */
  private watchCompactBreakpoint(): void {
    const query = inject(DOCUMENT).defaultView?.matchMedia?.('(max-width: 767.98px)');
    if (!query) return;

    this.observeCompactBreakpoint(query);
  }

  /** Registers the breakpoint listener and synchronizes its initial state. */
  private observeCompactBreakpoint(query: MediaQueryList): void {
    const onChange = (event: MediaQueryListEvent): void => this.updateCompactState(event.matches);

    this.updateCompactState(query.matches);
    query.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => query.removeEventListener('change', onChange));
  }

  /** Updates compact layout state and clears the flipped state in compact mode. */
  private updateCompactState(isCompact: boolean): void {
    this.isCompact.set(isCompact);
    if (isCompact) this.isFlipped.set(false);
    this.offset.set({ x: 0, y: 0 });
  }

  protected pointerDown(event: PointerEvent): void {
    if (this.isCompact()) return;
    if ((event.currentTarget as Element).closest('button, a')) return;
    this.grabOrigin = {
      x: event.clientX - this.offset().x,
      y: event.clientY - this.offset().y,
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.isDragging.set(true);
  }

  protected pointerMove(event: PointerEvent): void {
    if (!this.isDragging()) return;
    const newOffset = {
      x: event.clientX - this.grabOrigin.x,
      y: event.clientY - this.grabOrigin.y,
    };
    this.offset.set(newOffset);
    console.log(this.offset());
  }

  /**
   * Sets the signal for dragging to false
   */
  protected cancelDragging(): void {
    this.isDragging.set(false);
  }
}
