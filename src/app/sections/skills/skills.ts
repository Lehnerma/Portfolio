import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { Sticker } from '../../components/sticker/sticker';
import { SKILL_ICONS } from '../../data/skills.data';
import { LanguageService } from '../../services/language-service';

@Component({
  imports: [UnderlineTitle, Sticker, TitleCasePipe],
  selector: 'app-skills',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly skillsIcons = SKILL_ICONS;
  private readonly texts = inject(LanguageService).texts;
}
