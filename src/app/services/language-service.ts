import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { LANGUAGES, Language, TRANSLATIONS } from '../data/i18n/translations';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Holds the language the visitor sees and the texts that belong to it.
 * Components only read `texts()`, the language switcher calls `setLanguage()`.
 */
@Service()
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly _language = signal<Language>(this.detectLanguage());

  readonly language = this._language.asReadonly();

  /** The texts of the active language. */
  readonly texts = computed(() => TRANSLATIONS[this._language()]);

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this._language();
    });
  }

  /**
   * Switches the language and remembers the choice for the next visit.
   * @param language The language to show from now on.
   */
  setLanguage(language: Language): void {
    this._language.set(language);
    this.store(language);
  }

  /**
   * Picks the start language: the stored choice, else the browser language, else the default.
   * @returns The language to start with.
   */
  private detectLanguage(): Language {
    const stored = this.readStored();
    if (stored) return stored;
    const browser = this.document.defaultView?.navigator.language.toLowerCase() ?? '';
    return LANGUAGES.find((language) => browser.startsWith(language)) ?? DEFAULT_LANGUAGE;
  }

  /**
   * Reads the language the visitor chose earlier.
   * @returns The stored language, or `null` if there is none, it is unknown or storage is blocked.
   */
  private readStored(): Language | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.find((language) => language === value) ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Remembers the language; if storage is blocked (e.g. private window) the choice just isn't kept.
   * @param language The language to store.
   */
  private store(language: Language): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // storage unavailable: the page keeps working, the choice only lasts for this visit
    }
  }
}
