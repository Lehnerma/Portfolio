import { Component, computed, inject } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { ContactForm } from '../../shared/contact-form/contact-form';
import { NavElement } from '../../shared/nav-element/nav-element';
import { LanguageService } from '../../services/language-service';
import { NavElements } from '../../interfaces/nav-elements';
import { NAV_FOOTER_DATA } from '../../data/nav';
@Component({
  imports: [UnderlineTitle, ContactForm, NavElement],
  selector: 'app-main-footer',
  styleUrl: './main-footer.scss',
  templateUrl: './main-footer.html',
})
export class MainFooter {
  private readonly texts = inject(LanguageService).texts;

  readonly navElements = computed<NavElements[]>(() =>
    NAV_FOOTER_DATA.map((item) => {
      const label = this.texts().footer[item.labelKey];
      return {
        label: label,
        link: item.link,
        underlineVariant: item.underlineVariant,
      };
    }),
  );
}
