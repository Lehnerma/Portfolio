import { Component, inject, input } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactResult } from '../../interfaces/contact-request';
import { ContactService } from '../../services/contact-service';
import { LanguageService } from '../../services/language-service';
import { ToastService } from '../../services/toast-service';
import { Checkbox } from '../checkbox/checkbox';
import { SecondaryBtn } from '../secondary-btn/secondary-btn';
import { ArrowHint } from '../arrow-hint/arrow-hint';

@Component({
  imports: [ReactiveFormsModule, Checkbox, SecondaryBtn, ArrowHint],
  selector: 'app-contact-form',
  styleUrl: './contact-form.scss',
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private static nextId = 0;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly texts = inject(LanguageService).texts;
  private readonly contact = inject(ContactService);
  private readonly toast = inject(ToastService);
  /** Start of the current fill-in; bots submit within milliseconds, the server rejects those. */
  private openedAt = performance.now();

  readonly privacyLink = input<string>('/privacy-policy');
  protected readonly sending = this.contact.sending;

  // keep in sync with the limits in public/api/contact.php
  protected readonly maxLength = { name: 100, email: 254, message: 2000 };

  /** Unique prefix so several forms on one page don't share element ids. */
  protected readonly uid = `contact-form-${ContactForm.nextId++}`;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.maxLength.name)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(this.maxLength.email)],
    ],
    message: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxLength.message)],
    ],
    privacy: [false, Validators.requiredTrue],
    /** Honeypot: hidden for humans, bots fill it in. */
    website: [''],
  });

  /**
   * Whether the control's error message should be shown.
   * @param control The control to check.
   * @returns True once the control was touched and is invalid.
   */
  protected showError(control: AbstractControl): boolean {
    return control.touched && control.invalid;
  }

  /**
   * Whether the control should be marked as correctly filled in.
   * @param control The control to check.
   * @returns True once the control was touched and is valid.
   */
  protected showValid(control: AbstractControl): boolean {
    return control.touched && control.valid;
  }

  /**
   * Sends the form if valid, otherwise reveals all validation errors.
   * The form is only cleared after the server confirmed, so a failed send keeps the text.
   */
  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.sending()) return;

    const result = await this.contact.send({
      ...this.form.getRawValue(),
      elapsedMs: Math.round(performance.now() - this.openedAt),
    });
    this.showResult(result);
    if (result === 'success') {
      this.form.reset();
      this.openedAt = performance.now();
    }
  }

  /**
   * Tells the visitor how it went.
   * @param result Outcome of the send.
   */
  private showResult(result: ContactResult): void {
    const toast = this.texts().form.toast;
    if (result === 'success') this.toast.show('success', toast.success);
    else if (result === 'rate-limited') this.toast.show('error', toast.tooManyRequests);
    else this.toast.show('error', toast.error);
  }
}
