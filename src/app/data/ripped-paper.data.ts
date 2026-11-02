import { RippedPaperInterface } from '../interfaces/ripped-paper-interface';
import { AboutPreferencesTexts } from '../interfaces/translations';

export const RIPPED_PAPERS_DATA: RippedPaperInterface<keyof AboutPreferencesTexts>[] = [
  {
    color: 'blue',
    mobile: '/assets/img/ripped-paper/mob/paper-blue.webp',
    desktop: '/assets/img/ripped-paper/paper-blue.webp',
    icon: '/assets/icons/location.png',
    labelKey: 'location',
  },
  {
    color: 'coral',
    mobile: '/assets/img/ripped-paper/mob/paper-coral.webp',
    desktop: '/assets/img/ripped-paper/paper-coral.webp',
    icon: '/assets/icons/commute.png',
    labelKey: 'commute',
  },
  {
    color: 'purple',
    mobile: '/assets/img/ripped-paper/mob/paper-purple.webp',
    desktop: '/assets/img/ripped-paper/paper-purple.webp',
    icon: '/assets/icons/homework.png',
    labelKey: 'remote',
  },
];
