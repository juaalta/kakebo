import { AbstractControl } from '@angular/forms';

export const CustomValidators = {
  password
};

export function password(control: AbstractControl) {
  if (hasNumber(control.value)) {
    return null;
  }
  return {
    validPassword: {
      valid: false,
      message: 'Password without numbers are not allowed'
    }
  };
}
function hasNumber(myString) {
  return /\d/.test(myString);
}
