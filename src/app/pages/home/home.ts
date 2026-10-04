import { Component, model } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';

@Component({
  imports: [UnderlineTitle, SocialIcons],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  navOpen = model<boolean>(false);
  burgerMenu = model<boolean>(true);

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
