import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-primary-btn',
  styleUrl: './primary-btn.scss',
  templateUrl: './primary-btn.html',
})
export class PrimaryBtn {
  readonly label = input.required<string>();
  readonly hoverLabel = input.required<string>();
  readonly type = input.required<'a' | 'button'>();
}
