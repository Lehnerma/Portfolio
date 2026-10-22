import { Component, input } from '@angular/core';
import { ColleagueCard } from '../../interfaces/colleague-card';

@Component({
  imports: [],
  selector: 'app-comment-card',
  styleUrl: './comment-card.scss',
  templateUrl: './comment-card.html',
})
export class CommentCard {
  readonly name = input<ColleagueCard['name']>();
  readonly link = input<ColleagueCard['link']>();
  readonly jobtitle = input<ColleagueCard['jobtitle']>();
  readonly comment = input<ColleagueCard['comment_en' | 'comment_de']>();
  readonly backgroundUrl = input<ColleagueCard['backgroundUrl']>();
}
