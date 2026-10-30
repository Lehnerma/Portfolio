import { NavElements } from '../interfaces/nav-elements';

export const NAV_HEADER_DATA: NavElements[] = [
  {
    label: 'About me',
    link: '#about',
    underlineVariant: 'scribble',
  },
  {
    label: 'Skills',
    link: '#skills',
    underlineVariant: 'wave',
  },
  {
    label: 'Projects',
    link: '#projects',
    underlineVariant: 'circle',
  },
  {
    label: 'Contact',
    link: '#contact',
    underlineVariant: 'squiggle',
  },
];

export const NAV_FOOTER_DATA: NavElements[] = [
  {
    label: 'Legal Notice',
    link: '', // todo add missing link
    underlineVariant: 'scribble',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/Lehnerma',
    underlineVariant: 'wave',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/maximilian-lehner-7744a2276/',
    underlineVariant: 'scribble',
  },
  {
    label: 'Email',
    link: 'mailto:info@max-lehner.at',
    underlineVariant: 'double',
  },
];
