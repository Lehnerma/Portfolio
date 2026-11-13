import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrokeVariant } from '../../interfaces/stroke-path';
import { UnderlineTitle } from '../underline-title/underline-title';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [UnderlineTitle, TitleCasePipe, RouterLink],
  selector: 'app-nav-element',
  styleUrl: './nav-element.scss',
  templateUrl: './nav-element.html',
})
export class NavElement {
  readonly label = input.required<string>();
  readonly link = input<string>();
  readonly underlineVariation = input<StrokeVariant>('scribble');
  readonly linkClass = input<string>();

  /** Links like `#about` are page anchors: they go through the router so they also work from other pages. */
  readonly fragment = computed<string | undefined>(() => {
    const link = this.link();
    return link?.startsWith('#') ? link.slice(1) : undefined;
  });
}
