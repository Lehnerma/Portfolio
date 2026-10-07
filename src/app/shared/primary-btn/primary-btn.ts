import { UpperCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  imports: [UpperCasePipe],
  selector: 'app-primary-btn',
  styleUrl: './primary-btn.scss',
  templateUrl: './primary-btn.html',
})
export class PrimaryBtn {
  readonly label = input.required<string>();
  readonly hoverLabel = input<string>();
  readonly type = input.required<'a' | 'button'>();
  readonly autoplay = signal<boolean>(true);

  toggleHello = signal<boolean>(false);

  constructor() {
    this.toggleHelloWorld();
  }

  /**
   * Toggles the Hello World button
   */
  toggleHelloWorld(): void {
    if (!matchMedia('(hover: none)').matches) return;
    if (this.autoplay()) {
      setTimeout(() => {
        this.toggleHello.update((value) => !value);
        this.autoplay.set(false);
        console.log(this.autoplay());
      }, 2000);
    } else {
      this.toggleHello.update((value) => !value);
    }
  }
}
