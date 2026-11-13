import { Component, inject, input } from '@angular/core';
import { PrimaryBtn } from '../../shared/primary-btn/primary-btn';
import { AnimateTitle } from '../../shared/animate-title/animate-title';
import { SecondaryBtn } from '../../shared/secondary-btn/secondary-btn';
import { SocialIcons } from '../../shared/social-icons/social-icons';
import { LanguageService } from '../../services/language-service';
import { HeadNav } from '../../shared/head-nav/head-nav';

@Component({
  imports: [PrimaryBtn, AnimateTitle, SecondaryBtn, SocialIcons, HeadNav],
  selector: 'app-landing',
  styleUrl: './landing.scss',
  templateUrl: './landing.html',
})
export class Landing {
  readonly light = input<boolean>(false);

  private readonly texts = inject(LanguageService).texts;
}
