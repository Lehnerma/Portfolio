import { Component, computed, inject } from '@angular/core';
import { IMPRINT_DE } from '../../data/i18n/legal/imprint-de';
import { IMPRINT_EN } from '../../data/i18n/legal/imprint-en';
import { Language } from '../../data/i18n/translations';
import { LegalPageTexts } from '../../interfaces/legal-translations';
import { LanguageService } from '../../services/language-service';
import { LegalPage } from '../../shared/legal-page/legal-page';

/** Imported here (not in a service) so the texts are only part of this lazy route chunk. */
const IMPRINT_TEXTS = { de: IMPRINT_DE, en: IMPRINT_EN } satisfies Record<Language, LegalPageTexts>;

@Component({
  imports: [LegalPage],
  selector: 'app-imprint',
  template: `<app-legal-page [content]="content()" />`,
})
export class Imprint {
  private readonly language = inject(LanguageService).language;
  protected readonly content = computed(() => IMPRINT_TEXTS[this.language()]);
}
