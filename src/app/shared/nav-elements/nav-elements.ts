import { Component, input } from '@angular/core';
import { StrokeVariant } from '../../interfaces/stroke-path';
import { UnderlineTitle } from '../underline-title/underline-title';

@Component({
  imports: [UnderlineTitle],
  selector: 'app-nav-elements',
  styleUrl: './nav-elements.scss',
  templateUrl: './nav-elements.html',
})
export class NavElements {
  readonly label = input.required<string>();
  readonly link = input<string>();
  readonly underlineVariation = input<StrokeVariant>('scribble');
}
