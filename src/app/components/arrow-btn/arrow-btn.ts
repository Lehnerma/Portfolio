import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgTemplateOutlet, RouterLink],
  selector: 'app-arrow-btn',
  styleUrl: './arrow-btn.scss',
  templateUrl: './arrow-btn.html',
})
export class ArrowBtn {
  readonly label = input<string>();
  readonly direction = input<'previous' | 'next'>();
  readonly link = input<string>();
  readonly fragment = input<string>();
}
