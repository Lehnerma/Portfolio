import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DE_TRANSLATIONS } from '../data/i18n/de';
import { EN_TRANSLATIONS } from '../data/i18n/en';
import { LanguageService } from './language-service';

describe('LanguageService', () => {
  /** The start language is decided when the service is created, so tests create it themselves. */
  const create = (): LanguageService => TestBed.inject(LanguageService);
  const mockBrowserLanguage = (language: string): void => {
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue(language);
  };

  beforeEach(() => {
    localStorage.clear();
    mockBrowserLanguage('en-US');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.lang = '';
  });

  it('should be created', () => {
    expect(create()).toBeTruthy();
  });

  describe('start language', () => {
    it('is the browser language if it is supported', () => {
      mockBrowserLanguage('de-AT');
      expect(create().language()).toBe('de');
    });

    it('falls back to English for an unsupported browser language', () => {
      mockBrowserLanguage('fr-FR');
      expect(create().language()).toBe('en');
    });

    it('prefers the stored choice over the browser language', () => {
      mockBrowserLanguage('de-AT');
      localStorage.setItem('language', 'en');
      expect(create().language()).toBe('en');
    });

    it('ignores an unknown stored value', () => {
      mockBrowserLanguage('de-AT');
      localStorage.setItem('language', 'fr');
      expect(create().language()).toBe('de');
    });

    it('still works if reading the storage fails', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('blocked');
      });
      expect(create().language()).toBe('en');
    });
  });

  describe('setLanguage', () => {
    it('changes the language and the texts', () => {
      const service = create();
      expect(service.texts()).toBe(EN_TRANSLATIONS);

      service.setLanguage('de');

      expect(service.language()).toBe('de');
      expect(service.texts()).toBe(DE_TRANSLATIONS);
    });

    it('remembers the choice', () => {
      create().setLanguage('de');
      expect(localStorage.getItem('language')).toBe('de');
    });

    it('still switches if writing the storage fails', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('blocked');
      });
      const service = create();

      service.setLanguage('de');

      expect(service.language()).toBe('de');
    });
  });

  describe('html lang attribute', () => {
    it('matches the start language', () => {
      mockBrowserLanguage('de-AT');
      create();
      TestBed.tick();
      expect(document.documentElement.lang).toBe('de');
    });

    it('follows the language switch', () => {
      const service = create();
      TestBed.tick();
      expect(document.documentElement.lang).toBe('en');

      service.setLanguage('de');
      TestBed.tick();

      expect(document.documentElement.lang).toBe('de');
    });
  });
});
