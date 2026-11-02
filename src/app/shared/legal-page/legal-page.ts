import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LegalPageTexts } from '../../interfaces/legal-translations';

/** Shared layout of all legal pages: back link, title, intro and the headed sections. */
@Component({
  imports: [RouterLink],
  selector: 'app-legal-page',
  styleUrl: './legal-page.scss',
  templateUrl: './legal-page.html',
})
export class LegalPage {
  readonly content = input.required<LegalPageTexts>();
  readonly backLabel = input.required<string>();
}
