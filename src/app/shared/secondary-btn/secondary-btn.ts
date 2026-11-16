import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-secondary-btn',
  styleUrl: './secondary-btn.scss',
  templateUrl: './secondary-btn.html',
})
export class SecondaryBtn {
  label = input.required<string>();
  btnTheme = input<'white' | 'black'>('white');
  btnType = input<'button' | 'submit'>('button');
  link = input<string>();
  openInNewTab = input<boolean>(false);
  /** Only applies to the button, e.g. while a form is being sent. */
  disabled = input<boolean>(false);
}
