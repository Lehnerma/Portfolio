import { LegalTranslations } from '../../../interfaces/legal-translations';
import { Language } from '../translations';
import { LEGAL_DE } from './legal-de';
import { LEGAL_EN } from './legal-en';

/** Legal page texts per language. Uses the same language keys as `TRANSLATIONS`. */
export const LEGAL_TRANSLATIONS = {
  en: LEGAL_EN,
  de: LEGAL_DE,
} satisfies Record<Language, LegalTranslations>;
