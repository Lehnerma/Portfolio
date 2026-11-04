import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-logo-lm',
  styleUrl: './logo-lm.scss',
  templateUrl: './logo-lm.html',
})
export class LogoLm {
  readonly link = input<string>('');
}
