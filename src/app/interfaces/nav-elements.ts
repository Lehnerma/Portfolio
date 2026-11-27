import { StrokeVariant } from './stroke-path';

export type HeaderKey = 'about' | 'skills' | 'projects' | 'contact';

export interface NavItem<K extends string> {
  labelKey: K;
  link: string;
  underlineVariant: StrokeVariant;
}

export interface NavElements {
  label: string;
  link: string;
  underlineVariant: StrokeVariant;
}
