import { Component, computed, inject, signal } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { CommentCard } from '../../components/comment-card/comment-card';
import { CARDS } from '../../data/colleagues.data';
import { LanguageService } from '../../services/language-service';

@Component({
  imports: [UnderlineTitle, CommentCard],
  selector: 'app-comments',
  styleUrl: './comments.scss',
  templateUrl: './comments.html',
})
export class Comments {
  private readonly texts = inject(LanguageService).texts;

  protected readonly comments = computed(() =>
    CARDS.map((card) => ({
      ...card,
      ...this.texts().comments.items[card.id],
    })),
  );
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
