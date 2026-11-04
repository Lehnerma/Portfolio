import { Component, computed, inject, input } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { ContactForm } from '../../shared/contact-form/contact-form';
import { NavElement } from '../../shared/nav-element/nav-element';
import { LanguageService } from '../../services/language-service';
import { NavElements } from '../../interfaces/nav-elements';
import { NAV_FOOTER_DATA } from '../../data/nav';
import { LogoLm } from '../../shared/logo-lm/logo-lm';
@Component({
  imports: [UnderlineTitle, ContactForm, NavElement, LogoLm],
  selector: 'app-main-footer',
  styleUrl: './main-footer.scss',
  templateUrl: './main-footer.html',
})
export class MainFooter {
  private readonly texts = inject(LanguageService).texts;

  readonly lightFooter = input<boolean>(false);

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
