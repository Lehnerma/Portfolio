import { Component, computed, inject, input, model } from '@angular/core';
import { PrimaryBtn } from '../../shared/primary-btn/primary-btn';
import { AnimateTitle } from '../../shared/animate-title/animate-title';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { SocialIcons } from '../../shared/social-icons/social-icons';
import { NAV_HEADER_DATA } from '../../data/nav';
import { NavElements } from '../../interfaces/nav-elements';
import { NavElement } from '../../shared/nav-element/nav-element';
import { LanguageService } from '../../services/language-service';
import { LogoLm } from '../../shared/logo-lm/logo-lm';

@Component({
  imports: [PrimaryBtn, AnimateTitle, SecondaryBtn, SocialIcons, NavElement, LogoLm],
  selector: 'app-landing',
  styleUrl: './landing.scss',
  templateUrl: './landing.html',
})
export class Landing {
  readonly navOpen = model<boolean>(false);
  readonly burgerMenu = model<boolean>(true);
  readonly light = input<boolean>(false);

  private readonly texts = inject(LanguageService).texts;

  readonly navElements = computed<NavElements[]>(() =>
    NAV_HEADER_DATA.map((item) => {
      const label = this.texts().nav[item.labelKey];
      console.log(label);

      return {
        label: label,
        link: item.link,
        underlineVariant: item.underlineVariant,
      };
    }),
  );
  /**
   * Toggles the nav menu on the mobile version
   */
  toggleNavMenu(): void {
    this.navOpen.update((value) => !value);
  }
}
