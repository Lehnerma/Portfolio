import { Component, computed, input } from '@angular/core';
import { LetterUppercase } from '../../interfaces/letter-uppercase';

@Component({
  imports: [],
  selector: 'app-animate-title',
  styleUrl: './animate-title.scss',
  templateUrl: './animate-title.html',
})
export class AnimateTitle {
  readonly text = input.required<string>();

  protected readonly letters = computed<LetterUppercase[]>(() =>
    Array.from(this.text()).map((char) => ({
      char,
      isUpperCase: char !== char.toLowerCase() && char === char.toUpperCase(),
    })),
  );
}
