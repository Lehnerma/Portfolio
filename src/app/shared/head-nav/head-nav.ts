import { Component, computed, inject, input, signal } from '@angular/core';
import { NAV_HEADER_DATA } from '../../data/nav';
import { NavElements } from '../../interfaces/nav-elements';
import { LanguageService } from '../../services/language-service';
import { LogoLm } from '../logo-lm/logo-lm';
import { NavElement } from '../nav-element/nav-element';
import { SocialIcons } from '../social-icons/social-icons';

/** Header navigation: logo, link list and the burger menu overlay on mobile. */
@Component({
  imports: [LogoLm, NavElement, SocialIcons],
  selector: 'app-head-nav',
  styleUrl: './head-nav.scss',
  templateUrl: './head-nav.html',
  host: { '(document:keydown.escape)': 'closeNav()' },
})
export class HeadNav {
  readonly burgerMenu = input<boolean>(true);
  /** Desktop only: inverts the link text against the background (e.g. torn paper next to a dark area). */
  readonly blendLinks = input<boolean>(false);
  readonly navOpen = signal<boolean>(false);

  private readonly texts = inject(LanguageService).texts;

  readonly navElements = computed<NavElements[]>(() =>
    NAV_HEADER_DATA.map((item) => ({
      label: this.texts().nav[item.labelKey],
      link: item.link,
      underlineVariant: item.underlineVariant,
    })),
  );

  /**
   * Toggles the nav menu on the mobile version
   */
  toggleNavMenu(): void {
    this.navOpen.update((value) => !value);
  }

  /**
   * Closes the nav menu (link click, Escape). On desktop the menu is always visible,
   * so changing the flag has no visible effect there.
   */
  closeNav(): void {
    this.navOpen.set(false);
  }
}
