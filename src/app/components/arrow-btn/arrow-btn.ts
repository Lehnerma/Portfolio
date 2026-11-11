import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-arrow-btn',
  styleUrl: './arrow-btn.scss',
  templateUrl: './arrow-btn.html',
})
export class ArrowBtn {
  readonly label = input<string>();
  readonly direction = input<'previous' | 'next'>();
}
