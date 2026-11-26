import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageService } from '../../services/language-service';
import { LanguageSwitch } from './language-switch';

describe('LanguageSwitch', () => {
  let fixture: ComponentFixture<LanguageSwitch>;
  let service: LanguageService;

  const button = (): HTMLButtonElement => fixture.nativeElement.querySelector('.lang');
  const label = (): string =>
    fixture.nativeElement.querySelector('.lang__label').textContent.trim();

  beforeEach(async () => {
    localStorage.clear();
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US');

    await TestBed.configureTestingModule({ imports: [LanguageSwitch] }).compileComponents();

    service = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(LanguageSwitch);
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.lang = '';
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the active language with the knob on the first side', () => {
    expect(label()).toBe('EN');
    expect(button().dataset['position']).toBe('start');
  });

  it('switches to German, remembers it and moves the knob on click', async () => {
    button().click();
    await fixture.whenStable();

    expect(service.language()).toBe('de');
    expect(localStorage.getItem('language')).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(label()).toBe('DE');
    expect(button().dataset['position']).toBe('end');
  });

  it('switches back to English on a second click', async () => {
    button().click();
    await fixture.whenStable();
    button().click();
    await fixture.whenStable();

    expect(service.language()).toBe('en');
    expect(label()).toBe('EN');
    expect(button().dataset['position']).toBe('start');
  });

  it('starts on the stored language', async () => {
    service.setLanguage('de');
    await fixture.whenStable();

    expect(label()).toBe('DE');
    expect(button().dataset['position']).toBe('end');
  });

  it('names the button after the language it switches to', async () => {
    expect(button().getAttribute('aria-label')).toBe('Switch to German');

    button().click();
    await fixture.whenStable();

    expect(button().getAttribute('aria-label')).toBe('Zu Englisch wechseln');
  });
});
