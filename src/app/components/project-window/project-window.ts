import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

let nextWindowInstanceId = 0;

@Component({
  imports: [RouterLink],
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

  private readonly instanceId = nextWindowInstanceId++;
  protected readonly frameFilterId = `window-frame-filter-${this.instanceId}`;
  protected readonly controlFilterId = `window-control-filter-${this.instanceId}`;

  protected toggleMinimized(): void {
    this.isMinimized.update((isMinimized) => !isMinimized);
  }

  protected shakeWindow(): void {
    this.isShaking.set(true);
  }

  protected onShakeEnd(): void {
    this.isShaking.set(false);
  }
}
