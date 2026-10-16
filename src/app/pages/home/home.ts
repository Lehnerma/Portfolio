import { Component, model } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';
import { AnimateTitle } from '../../shared/animate-title/animate-title';
import { PrimaryBtn } from '../../shared/primary-btn/primary-btn';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { RippedPaper } from '../../components/ripped-paper/ripped-paper';
import { SkillIcon } from '../../interfaces/skills-icons';
import { TitleCasePipe } from '@angular/common';
import { Sticker } from '../../components/sticker/sticker';
import {ProjectWindow} from '../../components/project-window/project-window';

@Component({
  imports: [
    UnderlineTitle,
    SocialIcons,
    AnimateTitle,
    PrimaryBtn,
    SecondaryBtn,
    RippedPaper,
    TitleCasePipe,
    Sticker,
    ProjectWindow
  ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  navOpen = model<boolean>(false);
  burgerMenu = model<boolean>(true);

  skillsIcons: SkillIcon[] = [
    { name: 'angular', path: 'assets/icons/skills/angular.svg' },
    { name: 'TypeScript', path: 'assets/icons/skills/typescript.svg' },
    { name: 'HTML', path: 'assets/icons/skills/html5.svg' },
    { name: 'CSS', path: 'assets/icons/skills/css.svg' },
    { name: 'SASS', path: 'assets/icons/skills/sass.svg' },
    { name: 'Firebase', path: 'assets/icons/skills/firebase.svg' },
    { name: 'Supabase', path: 'assets/icons/skills/supabase.svg' },
    { name: 'Git', path: 'assets/icons/skills/git.svg' },
    { name: 'scrum', path: 'assets/icons/skills/scrum.svg' },
    { name: 'claude', path: 'assets/icons/skills/claude.svg' },
    { name: 'linux', path: 'assets/icons/skills/linux.svg' },
  ];

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
