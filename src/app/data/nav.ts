import { NavItem, HeaderKey } from '../interfaces/nav-elements';
import { FooterTexts } from '../interfaces/translations';

export const NAV_HEADER_DATA: NavItem<HeaderKey>[] = [
  {
    labelKey: 'about',
    link: '#about',
    underlineVariant: 'scribble',
  },
  {
    labelKey: 'skills',
    link: '#skills',
    underlineVariant: 'wave',
  },
  {
    labelKey: 'projects',
    link: '#projects',
    underlineVariant: 'circle',
  },
  {
    labelKey: 'contact',
    link: '#contact',
    underlineVariant: 'squiggle',
  },
];

export const NAV_FOOTER_DATA: NavItem<keyof FooterTexts>[] = [
  {
    labelKey: 'legalNotice',
    link: '', // todo add missing link
    underlineVariant: 'scribble',
  },
  {
    labelKey: 'github',
    link: 'https://github.com/Lehnerma',
    underlineVariant: 'wave',
  },
  {
    labelKey: 'linkedin',
    link: 'https://www.linkedin.com/in/maximilian-lehner-7744a2276/',
    underlineVariant: 'scribble',
  },
  {
    labelKey: 'email',
    link: 'mailto:info@max-lehner.at',
    underlineVariant: 'double',
  },
];
