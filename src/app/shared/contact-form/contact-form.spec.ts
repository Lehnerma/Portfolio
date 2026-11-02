import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { ContactFormValue } from '../../interfaces/contact-form-value';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let host: HTMLElement;
  let emitted: ContactFormValue[];

  const fill = (selector: string, value: string): void => {
    const el = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
    el.value = value;
    el.dispatchEvent(new Event('input'));
  };

  const submit = (): void => {
    host.querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    host = fixture.nativeElement;
    emitted = [];
    component.submitted.subscribe((value) => emitted.push(value));
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows all errors and does not emit when submitted empty', () => {
    submit();

    expect(emitted).toEqual([]);
    const messages = [...host.querySelectorAll('.contact-form__error')].map((error) =>
      error.textContent?.trim(),
    );
    expect(messages.filter(Boolean).length).toBe(4);
  });

  it('emits the value when all fields are valid', () => {
    fill('input[type="text"]', 'Max');
    fill('input[type="email"]', 'max@example.com');
    fill('textarea', 'Let us build something great.');
    host.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
    submit();

    expect(emitted).toEqual([
      {
        name: 'Max',
        email: 'max@example.com',
        message: 'Let us build something great.',
        privacy: true,
      },
    ]);
  });

  it('rejects an invalid email address', () => {
    fill('input[type="text"]', 'Max');
    fill('input[type="email"]', 'not-an-email');
    fill('textarea', 'Let us build something great.');
    host.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
    submit();

    expect(emitted).toEqual([]);
    expect(host.querySelector('[id$="-email-error"]')?.textContent).toContain('valid email');
  });

  it('marks touched, correctly filled fields as valid and keeps the error slots in the DOM', () => {
    expect(host.querySelectorAll('.contact-form__error').length).toBe(4);

    fill('input[type="text"]', 'Max');
    host.querySelector('input[type="text"]')!.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.querySelectorAll('.contact-form__field--valid').length).toBe(1);
    expect(host.querySelectorAll('.contact-form__error').length).toBe(4);
  });
});
