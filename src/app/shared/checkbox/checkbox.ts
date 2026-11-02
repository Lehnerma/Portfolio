import { Component, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createTick } from './tick-path';

let nextId = 0;

@Component({
  imports: [],
  selector: 'app-checkbox',
  styleUrl: './checkbox.scss',
  templateUrl: './checkbox.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Checkbox), multi: true }],
})
export class Checkbox implements ControlValueAccessor {
  /** Id of the native input, so an external `<label for>` can point to it. */
  readonly inputId = input<string>();
  readonly describedBy = input<string | null>(null);
  readonly invalid = input<boolean>(false);
  readonly checked = model<boolean>(false);

  protected readonly disabled = signal(false);
  protected readonly filterId = `checkbox-tick-${nextId++}`;
  protected readonly tickPath = signal(createTick());

  private onChange: (checked: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Syncs the checked state from the native input and notifies the form.
   * Every check re-rolls the tick so it is hand-drawn differently each time.
   * @param event The change event of the native input.
   */
  protected toggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) this.tickPath.set(createTick());
    this.checked.set(checked);
    this.onChange(checked);
  }

  protected touch(): void {
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(fn: (checked: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
