import { Translations } from '../../interfaces/translations';
import { DE_TRANSLATIONS } from './de';
import { EN_TRANSLATIONS } from './en';

export const TRANSLATIONS = {
  en: EN_TRANSLATIONS,
  de: DE_TRANSLATIONS,
} satisfies Record<string, Translations>;

export type Language = keyof typeof TRANSLATIONS;

/** All supported languages, e.g. to validate a stored value. */
export const LANGUAGES = Object.keys(TRANSLATIONS) as Language[];
