import { ColleagueCard } from '../interfaces/colleague-card';

export const CARDS: readonly ColleagueCard[] = [
  {
    id: 'radek',
    name: 'Radek Gnych',
    link: 'https://at.linkedin.com/', // todo add the missin likedin link
    jobtitle: 'Frontend Developer',
    backgroundUrl: '/assets/background/card-bg-frayed-blue.webp',
  },
  {
    id: 'monika',
    name: 'Monika Weikum',
    link: 'https://at.linkedin.com/', // todo add the missing linkedin link
    jobtitle: 'Frontend Developer',
    backgroundUrl: '/assets/background/card-bg-frayed-violet.webp',
  },
  {
    id: 'guenter',
    name: 'Günter Held',
    link: 'www.linkedin.com/in/günter-heldt-892320343',
    jobtitle: 'Fullstack Developer',
    backgroundUrl: '/assets/background/card-bg-smooth-blue.webp',
  },
];
