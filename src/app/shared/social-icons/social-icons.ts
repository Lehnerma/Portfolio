import { Component, input } from '@angular/core';

type Orientation = 'row' | 'column';
@Component({
  imports: [],
  selector: 'app-social-icons',
  styleUrl: './social-icons.scss',
  templateUrl: './social-icons.html',
})
export class SocialIcons {
  readonly orientation = input<Orientation>('row');
}
