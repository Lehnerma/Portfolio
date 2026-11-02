import { Component, inject } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { RippedPaper } from '../../components/ripped-paper/ripped-paper';
import { LanguageService } from '../../services/language-service';

@Component({
  imports: [UnderlineTitle, SecondaryBtn, RippedPaper],
  selector: 'app-about-me',
  styleUrl: './about-me.scss',
  templateUrl: './about-me.html',
})
export class AboutMe {
  private readonly texts = inject(LanguageService).texts;
}
