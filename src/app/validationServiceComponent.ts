import { AbstractControl } from '@angular/forms';

interface ConfigType {
    [key: string]: string;
  }
  
  export class ValidationServiceComponent {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      const config: ConfigType = {
        required: 'Required Field',
        invalidCreditCard: 'Is invalid credit card number',
        invalidEmailAddress: 'Invalid email address',
        invalidPassword:
          'Password must be at least 8 characters long, containing a Number (0-9), an Uppercase character (A-Z),a Lowercase character (a-z), a Non Alphanumeric character (!@#)',
        minlength: `Minimum length ${validatorValue?.requiredLength}`,
        maxlength: `Maximum length ${validatorValue?.requiredLength}`,
        decimalTwo: 'Only numbers with up to 2 decimal places are allowed',
        dateFormat: 'Invalid date format. Please use dd/MM/yyyy',
        banglaOnly: 'Only Bangla Allowed',
        //noSpace: 'No Space [ ] is allowed',
      };
  
      return config.hasOwnProperty(validatorName) ? config[validatorName] : 'Invalid value';
    }

  static creditCardValidator(control: AbstractControl) {
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static emailValidator(control: AbstractControl) {
    if (
      control.value.match(
        // RFC 2822 compliant regex
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control: AbstractControl) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static minlengthValidator(control: AbstractControl, validatorValue: any) {
    if (control.value.length >= validatorValue?.requiredLength) {
      return null;
    } else {
      return { minlength: true };
    }
  }

  static noSpaceValidator(control: AbstractControl) {
    if (control.value && /\s/.test(control.value)) {
      return { noSpace: true };
    }
    return null;
  }

  static maxlengthValidator(control: AbstractControl, validatorValue: any) {
    if (control.value.length >= validatorValue?.maxLength) {
      return null;
    } else {
      return { maxlength: true };
    }
  }

  static decimalTwoValidator(control: AbstractControl) {
    if (
      control.value.match(/^\d+(\.\d{1,2})?$/)
    ) {
      return null;
    } else {
      return { decimalTwo: true };
    }
  }

  static banglaOnlyValidator(control: AbstractControl) {
    const banglaRegex = /^[\u0980-\u09FF\s]+$/; // Regular expression for Bangla characters

    if (control.value && !banglaRegex.test(control.value)) {
      return { banglaOnly: true };
    }
    return null;
  }

  static dateValidator(control: AbstractControl) {
    if (
      control.value &&
      !/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(control.value) // dd/MM/yyyy format check
    ) {
      return { dateFormat: true };
    }

    const parts = control.value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    // Checking for valid day and month ranges
    if (
      (month === 4 || month === 6 || month === 9 || month === 11) && day > 30 ||
      (month === 2 && day > 29) || // Allowing up to 29 days for February for simplicity
      (month === 2 && day > 28 && !((parts[2] % 4 === 0 && parts[2] % 100 !== 0) || parts[2] % 400 === 0)) ||
      day < 1 || month < 1 || month > 12
    ) {
      return { dateFormat: true };
    }

    return null;
  }
  
}
