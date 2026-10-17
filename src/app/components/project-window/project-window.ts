import { NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
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

    const update = (isCompact: boolean) => {
      this.isCompact.set(isCompact);
      if (isCompact) this.isFlipped.set(false);
    };
    const onChange = (event: MediaQueryListEvent) => update(event.matches);

    update(query.matches);
    query.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => query.removeEventListener('change', onChange));
  }
}
