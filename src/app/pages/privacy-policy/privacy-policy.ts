import { Component, computed, inject } from '@angular/core';
import { PRIVACY_DE } from '../../data/i18n/legal/privacy-de';
import { PRIVACY_EN } from '../../data/i18n/legal/privacy-en';
import { Language } from '../../data/i18n/translations';
import { LegalPageTexts } from '../../interfaces/legal-translations';
import { LanguageService } from '../../services/language-service';
import { LegalPage } from '../../shared/legal-page/legal-page';

/** Imported here (not in a service) so the texts are only part of this lazy route chunk. */
const PRIVACY_TEXTS = { de: PRIVACY_DE, en: PRIVACY_EN } satisfies Record<Language, LegalPageTexts>;

@Component({
  imports: [LegalPage],
  selector: 'app-privacy-policy',
  template: `<app-legal-page [content]="content()" />`,
})
export class PrivacyPolicy {
  private readonly language = inject(LanguageService).language;
  protected readonly content = computed(() => PRIVACY_TEXTS[this.language()]);
}
