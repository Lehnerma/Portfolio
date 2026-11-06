import { ColleagueCard } from '../interfaces/colleague-card';

export const CARDS: readonly ColleagueCard[] = [
  {
    id: 'radek',
    name: 'Radek Gnych',
    link: 'https://github.com/radek-ops',
    jobtitle: 'Frontend Developer',
    backgroundUrl: '/assets/background/card-bg-frayed-blue.webp',
    socialMediaType: 'github',
    socialLogoPath: '/assets/icons/github.png',
  },
  {
    id: 'monika',
    name: 'Monika Weikum',
    link: 'https://github.com/Monika-W-Dev',
    jobtitle: 'Frontend Developer',
    backgroundUrl: '/assets/background/card-bg-frayed-violet.webp',
    socialMediaType: 'github',
    socialLogoPath: '/assets/icons/github.png',
  },
  {
    id: 'guenter',
    name: 'Günter Held',
    link: 'www.linkedin.com/in/günter-heldt-892320343',
    jobtitle: 'Fullstack Developer',
    backgroundUrl: '/assets/background/card-bg-smooth-blue.webp',
    socialMediaType: 'linkedin',
    socialLogoPath: '/assets/icons/linkedin.png',
  },
];
