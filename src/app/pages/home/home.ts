import { Component, model } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';
import { AnimateTitle } from '../../shared/animate-title/animate-title';
import { PrimaryBtn } from '../../shared/primary-btn/primary-btn';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { RippedPaper } from '../../components/ripped-paper/ripped-paper';

@Component({
  imports: [UnderlineTitle, SocialIcons, AnimateTitle, PrimaryBtn, SecondaryBtn, RippedPaper],
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
  }

  // todo the funciton is not used maybe can be deleted
  /**
   * Handles clicks on the navigation backdrop.
   * @param event The mouse event from the backdrop click.
   */
  backdropClick(event: MouseEvent): void {
    if (this.navOpen()) return;
    console.log(event);
  }
}
