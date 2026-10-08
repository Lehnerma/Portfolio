import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ripped-paper',
  styleUrl: './ripped-paper.scss',
  templateUrl: './ripped-paper.html',
})
export class RippedPaper {
  rippedPapers = [
    {
      color: 'blue',
      mobile: '/assets/img/ripped-papper/mob/paper-blue.webp',
      desktop: '/assets/img/ripped-papper/paper-blue.webp',
      icon: '/assets/icons/location.png',
      text: 'Based in Grafenegg',
    },
    {
      color: 'coral',
      mobile: '/assets/img/ripped-papper/mob/paper-coral.webp',
      desktop: '/assets/img/ripped-papper/paper-coral.webp',
      icon: '/assets/icons/commute.png',
      text: 'Flexible with longer commute',
    },
    {
      color: 'purple',
      mobile: '/assets/img/ripped-papper/mob/paper-purple.webp',
      desktop: '/assets/img/ripped-papper/paper-purple.webp',
      icon: '/assets/icons/homework.png',
      text: 'Open to work remote',
    },
  ];
}
