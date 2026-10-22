import { Component, computed, model, signal } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';
import { AnimateTitle } from '../../shared/animate-title/animate-title';
import { PrimaryBtn } from '../../shared/primary-btn/primary-btn';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { RippedPaper } from '../../components/ripped-paper/ripped-paper';
import { TitleCasePipe } from '@angular/common';
import { Sticker } from '../../components/sticker/sticker';
import { ProjectWindow } from '../../components/project-window/project-window';
import { SKILL_ICONS } from '../../data/skills.data';
import { PROJECTS } from '../../data/projects.data';
import { CARDS } from '../../data/colleagues.data';
import { DragHint } from '../../shared/drag-hint/drag-hint';
import { mediaQuery } from '../../shared/utils/media-query';
import { CommentCard } from '../../components/comment-card/comment-card';

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
    ProjectWindow,
    DragHint,
    CommentCard,
  ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  navOpen = model<boolean>(false);
  burgerMenu = model<boolean>(true);

  /** Windows are only draggable from `md` (768px) on, so the drag hint is only shown there. */
  private readonly isMdUp = mediaQuery('(min-width: 768px)');
  /** Set once any project window has been dragged; hides the drag hint for good. */
  protected readonly hasDragged = signal(false);
  protected readonly showDragHint = computed(() => this.isMdUp() && !this.hasDragged());

  protected readonly skillsIcons = SKILL_ICONS;
  protected readonly projects = PROJECTS;
  protected readonly comments = CARDS;

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
