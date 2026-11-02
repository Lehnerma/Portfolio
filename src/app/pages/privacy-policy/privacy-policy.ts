import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { LegalPage } from '../../shared/legal-page/legal-page';

@Component({
  imports: [LegalPage],
  selector: 'app-privacy-policy',
  template: `<app-legal-page
    [content]="legal().privacy"
    [backLabel]="legal().common.backToHome"
  />`,
})
export class PrivacyPolicy {
  protected readonly legal = inject(LanguageService).legalTexts;
}
