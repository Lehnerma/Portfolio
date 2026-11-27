import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from '../../services/toast-service';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let host: HTMLElement;
  let http: HttpTestingController;
  let toast: ToastService;

  const fill = (selector: string, value: string): void => {
    const el = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
    el.value = value;
    el.dispatchEvent(new Event('input'));
  };

  const fillValid = (): void => {
    fill('input[type="text"]:not([tabindex])', 'Max');
    fill('input[type="email"]', 'max@example.com');
    fill('textarea', 'Let us build something great.');
    host.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
  };

  const submit = async (): Promise<void> => {
    host.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    host = fixture.nativeElement;
    http = TestBed.inject(HttpTestingController);
    toast = TestBed.inject(ToastService);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows all errors and sends nothing when submitted empty', async () => {
    await submit();

    http.expectNone('/api/contact.php');
    const messages = [...host.querySelectorAll('.contact-form__error')].map((error) =>
      error.textContent?.trim(),
    );
    expect(messages.filter(Boolean).length).toBe(4);
  });

  it('posts the form and the spam-protection fields, then clears the form and shows a success toast', async () => {
    fillValid();
    const done = submit();

    const request = http.expectOne('/api/contact.php');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      name: 'Max',
      email: 'max@example.com',
      message: 'Let us build something great.',
      privacy: true,
      website: '',
      elapsedMs: expect.any(Number),
    });
    request.flush({ ok: true });
    await done;

    expect(toast.toast()?.type).toBe('success');
    expect(host.querySelector<HTMLInputElement>('input[type="email"]')!.value).toBe('');
  });

  it('keeps the text and shows an error toast when sending fails', async () => {
    fillValid();
    const done = submit();

    http
      .expectOne('/api/contact.php')
      .flush({ ok: false }, { status: 502, statusText: 'Bad Gateway' });
    await done;

    expect(toast.toast()?.type).toBe('error');
    expect(host.querySelector<HTMLInputElement>('input[type="email"]')!.value).toBe(
      'max@example.com',
    );
  });

  it('shows the "too many requests" text on status 429', async () => {
    fillValid();
    const done = submit();

    http
      .expectOne('/api/contact.php')
      .flush({ ok: false }, { status: 429, statusText: 'Too Many' });
    await done;

    expect(toast.toast()?.type).toBe('error');
    expect(toast.toast()?.text).toMatch(/few messages|viele Nachrichten/);
  });

  it('rejects an invalid email address', async () => {
    fill('input[type="text"]:not([tabindex])', 'Max');
    fill('input[type="email"]', 'not-an-email');
    fill('textarea', 'Let us build something great.');
    host.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
    await submit();

    http.expectNone('/api/contact.php');
    expect(host.querySelector('[id$="-email-error"]')?.textContent).toContain('valid email');
  });

  it('accepts everyday punctuation that the old regex rejected', async () => {
    fillValid();
    fill('textarea', 'Hi! I need a dev (m/w/d): https://example.com – "ASAP", 5 €.');
    const done = submit();

    http.expectOne('/api/contact.php').flush({ ok: true });
    await done;

    expect(toast.toast()?.type).toBe('success');
  });

  it('keeps the send button disabled until the form is filled in correctly', async () => {
    const button = host.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    expect(button.disabled).toBe(true);

    fillValid();
    await fixture.whenStable();
    expect(button.disabled).toBe(false);

    // the server rejects a domain without a dot, so the form has to reject it too
    fill('input[type="email"]', 'max@example');
    await fixture.whenStable();
    expect(button.disabled).toBe(true);
  });

  it('limits the length of the fields', () => {
    expect(host.querySelector('input[type="email"]')!.getAttribute('maxlength')).toBe('254');
    expect(host.querySelector('textarea')!.getAttribute('maxlength')).toBe('2000');
  });

  it('marks touched, correctly filled fields as valid and keeps the error slots in the DOM', () => {
    expect(host.querySelectorAll('.contact-form__error').length).toBe(4);

    fill('input[type="text"]:not([tabindex])', 'Max');
    host.querySelector('input[type="text"]')!.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.querySelectorAll('.contact-form__field--valid').length).toBe(1);
    expect(host.querySelectorAll('.contact-form__error').length).toBe(4);
  });
});
