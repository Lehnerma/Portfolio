import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { LegalPage } from '../../shared/legal-page/legal-page';

@Component({
  imports: [LegalPage],
  selector: 'app-imprint',
  template: `<app-legal-page
    [content]="legal().imprint"
    [backLabel]="legal().common.backToHome"
  />`,
})
export class Imprint {
  protected readonly legal = inject(LanguageService).legalTexts;
}
