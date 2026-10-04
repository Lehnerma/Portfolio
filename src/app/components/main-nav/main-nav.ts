import { Component } from '@angular/core';
import { UnderlineTitle } from '../../shared/underline-title/underline-title';
import { SocialIcons } from '../../shared/social-icons/social-icons';

@Component({
  imports: [UnderlineTitle, SocialIcons],
  selector: 'app-main-nav',
  styleUrl: './main-nav.scss',
  templateUrl: './main-nav.html',
})
export class MainNav {}
