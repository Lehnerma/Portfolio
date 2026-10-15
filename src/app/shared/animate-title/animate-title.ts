import { Component, input } from '@angular/core';
import { LetterUppercase } from '../../interfaces/letter-uppercase';

@Component({
  imports: [],
  selector: 'app-animate-title',
  styleUrl: './animate-title.scss',
  templateUrl: './animate-title.html',
})
export class AnimateTitle {
  readonly text = input.required<string>();
  readonly secondText = input<string>();

  protected getLetters(text: string): LetterUppercase[] {
    return Array.from(text).map((char) => ({
      char,
      isUpperCase: char !== char.toLowerCase() && char === char.toUpperCase(),
    }));
  }

  /**
   * Replaces a regular space with a non-breaking space for display.
   * @param char The character to format.
   * @returns The formatted character.
   */
  getDisplayChar(char: string): string {
    return char === ' ' ? ' ' : char;
  }
}
