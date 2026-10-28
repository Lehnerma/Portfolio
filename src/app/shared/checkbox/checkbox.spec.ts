import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from './checkbox';

@Component({
  imports: [ReactiveFormsModule, Checkbox],
  template: `<app-checkbox [formControl]="control" />`,
})
class Host {
  readonly control = new FormControl(false, { nonNullable: true, validators: Validators.requiredTrue });
}

describe('Checkbox', () => {
  let fixture: ComponentFixture<Host>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    input = fixture.nativeElement.querySelector('input');
  });

  it('writes the checked state of the native input to the form control', () => {
    input.click();
    expect(fixture.componentInstance.control.value).toBe(true);
    expect(fixture.componentInstance.control.valid).toBe(true);

    input.click();
    expect(fixture.componentInstance.control.value).toBe(false);
  });

  it('reflects control changes in the native input', async () => {
    fixture.componentInstance.control.setValue(true);
    await fixture.whenStable();
    expect(input.checked).toBe(true);

    fixture.componentInstance.control.reset();
    await fixture.whenStable();
    expect(input.checked).toBe(false);
  });

  it('marks the control as touched on blur', () => {
    input.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.control.touched).toBe(true);
  });

  it('disables the native input when the control is disabled', async () => {
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(input.disabled).toBe(true);
  });
});
