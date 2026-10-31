import { Component, signal } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { CARDS } from '../../data/colleagues.data';
import { CommentCard } from '../../components/comment-card/comment-card';
import { MainFooter } from '../../sections/main-footer/main-footer';
import { Landing } from '../../sections/landing/landing';
import { AboutMe } from '../../sections/about-me/about-me';
import { Skills } from '../../sections/skills/skills';
import { Projects } from '../../sections/projects/projects';

@Component({
  imports: [UnderlineTitle, CommentCard, MainFooter, Landing, AboutMe, Skills, Projects],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  protected readonly comments = CARDS;
  /** Index of the comment card raised by touch; mouse users get the CSS `:hover` instead. */
  protected readonly activeComment = signal<number | null>(null);

  /**
   * Raises a comment card to the front when it is touched.
   * @param event The pointer event from the card.
   * @param index Index of the touched card.
   */
  protected onCommentPointerDown(event: PointerEvent, index: number): void {
    if (event.pointerType !== 'touch') return;
    this.activeComment.set(index);
  }
}
