import { StrokeVariant } from './stroke-path';

export type HeaderKey = 'about' | 'skills' | 'projects' | 'contact';

export interface NavItem<K extends string> {
  //this is a generic with placeholder values (params)
  labelKey: K; // K stands for the key - this can be everything we declare it.
  link: string;
  underlineVariant: StrokeVariant;
}

export interface NavElements {
  label: string;
  link: string;
  underlineVariant: StrokeVariant;
}
