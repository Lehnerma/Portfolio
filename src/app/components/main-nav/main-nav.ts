import { Component, signal } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';

@Component({
  imports: [UnderlineTitle, SocialIcons],
  selector: 'app-main-nav',
  styleUrl: './main-nav.scss',
  templateUrl: './main-nav.html',
})
export class MainNav {
  navOpen = signal<boolean>(false);

  /**
   * Toggles the nav menu on the mobile version
   */
  toggleNavMenu(): void {
    this.navOpen.update((value) => !value);
    console.log(this.navOpen());
  }

  backdropClick(event: MouseEvent): void {
    if (this.navOpen()) return;
    console.log(event);
  }
}
