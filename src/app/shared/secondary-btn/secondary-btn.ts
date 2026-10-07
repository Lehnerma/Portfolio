import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-secondary-btn',
  styleUrl: './secondary-btn.scss',
  templateUrl: './secondary-btn.html',
})
export class SecondaryBtn {
  label = input.required<string>();
  btnTheme = input<'transparent' | 'black'>('transparent');
}
