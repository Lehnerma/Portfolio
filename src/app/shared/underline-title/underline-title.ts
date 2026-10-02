import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { createStrokePath, randomBetween } from '../stroke-path';

let nextId = 0;

@Component({
  imports: [RouterLink],
  selector: 'app-underline-title',
  styleUrl: './underline-title.scss',
  templateUrl: './underline-title.html',
})
export class UnderlineTitle {
  readonly label = input.required<string>();
  readonly link = input.required<string | unknown[]>();

  filterId = `stroke-${nextId++}`; // protected readonly
  pathData = signal(createStrokePath());
  strokeWidth = signal(randomBetween(4, 6)); // px (non-scaling-stroke)
  drawDuration = signal(randomBetween(0.35, 0.75));
  seed = signal(1);

  /**
   * Randomizes the underline path and its animation properties.
   */
  randomize(): void {
    this.pathData.set(createStrokePath());
    this.strokeWidth.set(randomBetween(4, 6));
    this.drawDuration.set(randomBetween(0.35, 0.55));
    this.seed.set(Math.floor(randomBetween(0, 1000)));
  }
}
