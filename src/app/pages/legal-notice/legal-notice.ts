import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { LegalPage } from '../../shared/legal-page/legal-page';

@Component({
  imports: [LegalPage],
  selector: 'app-legal-notice',
  template: `<app-legal-page
    [content]="legal().legalNotice"
    [backLabel]="legal().common.backToHome"
  />`,
})
export class LegalNotice {
  protected readonly legal = inject(LanguageService).legalTexts;
}
