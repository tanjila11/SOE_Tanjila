import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationServiceComponent } from './validationServiceComponent';

@Component({
  selector: 'control-messages',
  template: `
    <div *ngIf="errorMessage !== null" style="color:red; font-weight: 800;">{{ errorMessage }}</div>
  `
})
export class ControlMessagesComponent {
  @Input() control: FormControl | null = null;

  constructor() {}

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return null;
    }

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return ValidationServiceComponent.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
