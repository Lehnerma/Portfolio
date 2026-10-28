import { Component, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactFormValue } from '../../interfaces/contact-form-value';
import { Checkbox } from '../checkbox/checkbox';
import { SecondaryBtn } from '../secondary-btn/secondary-btn';

@Component({
  imports: [ReactiveFormsModule, Checkbox, SecondaryBtn],
  selector: 'app-contact-form',
  styleUrl: './contact-form.scss',
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private static nextId = 0;

  private readonly fb = inject(NonNullableFormBuilder);

  readonly privacyLink = input<string>('#');
  readonly submitted = output<ContactFormValue>();

  /** Unique prefix so several forms on one page don't share element ids. */
  protected readonly uid = `contact-form-${ContactForm.nextId++}`;

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue],
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
   * Emits the form value if valid, otherwise reveals all validation errors.
   */
  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
    this.form.reset();
  }
}
