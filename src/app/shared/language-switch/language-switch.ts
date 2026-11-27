import { Component, computed, inject } from '@angular/core';
import { LANGUAGES } from '../../data/i18n/translations';
import { LanguageService } from '../../services/language-service';

/**
 * Pill toggle for two languages. The flag knob sits on one side and the code of the active
 * language on the other; a click slides the knob over and switches the language.
 * The choice itself lives in `LanguageService`.
 */
@Component({
  imports: [],
  selector: 'app-language-switch',
  styleUrl: './language-switch.scss',
  templateUrl: './language-switch.html',
})
export class LanguageSwitch {
  private readonly languageService = inject(LanguageService);

  protected readonly language = this.languageService.language;
  protected readonly texts = computed(() => this.languageService.texts().nav);

  /** The language a click switches to (the next one in `LANGUAGES`). */
  protected readonly nextLanguage = computed(
    () => LANGUAGES[(LANGUAGES.indexOf(this.language()) + 1) % LANGUAGES.length],
  );

  /** Which side the knob sits on: the first language on the left, the other on the right. */
  protected readonly position = computed(() =>
    this.language() === LANGUAGES[0] ? 'start' : 'end',
  );

  protected toggle(): void {
    this.languageService.setLanguage(this.nextLanguage());
  }
}
