import { NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
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
  /** Emits once per drag, on the first pointer move after grabbing the titlebar. */
  readonly dragStarted = output<void>();

  protected readonly isMinimized = signal(false);
  protected readonly isShaking = signal(false);
  protected readonly isFlipped = signal(false);
  protected readonly isCompact = signal(false);
  protected readonly offset = signal({ x: 0, y: 0 });
  protected readonly translateValue = computed(() => `${this.offset().x}px ${this.offset().y}px`);
  protected readonly isDragging = signal<boolean>(false);

  protected grabOrigin = { x: 0, y: 0 };
  private hasMoved = false;
  private bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };

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
    if ((event.target as Element).closest('button, a')) return;
    this.grabOrigin = {
      x: event.clientX - this.offset().x,
      y: event.clientY - this.offset().y,
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.updateBounds(event.currentTarget as Element);
    this.isDragging.set(true);
  }

  /**
   * Sets the translate values that the user can move window
   * @param event grapping the window and move ist
   */
  protected pointerMove(event: PointerEvent): void {
    if (!this.isDragging()) return;
    if (!this.hasMoved) {
      this.hasMoved = true;
      this.dragStarted.emit();
    }
    const newOffset = {
      x: event.clientX - this.grabOrigin.x,
      y: event.clientY - this.grabOrigin.y,
    };
    this.offset.set(this.clampOffset(newOffset));
  }

  /**
   * Limits an offset to the bounds measured on pointerdown. Axes are clamped independently,
   * so the window can slide along an edge while dragging diagonally.
   */
  private clampOffset(offset: { x: number; y: number }): { x: number; y: number } {
    const { minX, maxX, minY, maxY } = this.bounds;
    return {
      x: Math.min(Math.max(offset.x, minX), maxX),
      y: Math.min(Math.max(offset.y, minY), maxY),
    };
  }

  /**
   * Sets the signal for dragging to false
   */
  protected cancelDragging(): void {
    this.isDragging.set(false);
    this.hasMoved = false;
  }

  /**
   * Updates the bounds for the grapped window
   * @param element The element whitch one is grapping
   */
  private updateBounds(element: Element): void {
    const sectionRec = element.closest('#projects')?.getBoundingClientRect();
    const windowRec = element.closest('.project-window')?.getBoundingClientRect();
    if (!sectionRec || !windowRec) return;
    this.bounds = {
      minX: sectionRec.left - windowRec.left + this.offset().x,
      maxX: sectionRec.right - windowRec.right + this.offset().x,
      minY: sectionRec.top - windowRec.top + this.offset().y,
      maxY: sectionRec.bottom - windowRec.bottom + this.offset().y,
    };
  }
}
