import { Component, input } from '@angular/core';
import { StrokeVariant } from '../../interfaces/stroke-path';
import { UnderlineTitle } from '../underline-title/underline-title';

@Component({
  imports: [UnderlineTitle],
  selector: 'app-nav-element',
  styleUrl: './nav-element.scss',
  templateUrl: './nav-element.html',
})
export class NavElement {
  readonly label = input.required<string>();
  readonly link = input<string>();
  readonly underlineVariation = input<StrokeVariant>('scribble');
}
