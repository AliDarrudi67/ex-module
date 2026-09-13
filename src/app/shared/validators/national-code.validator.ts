import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nationalCodeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = (control.value || '').toString();

  if (!/^\d{10}$/.test(value)) {
    return { nationalCodeInvalid: true };
  }

  const check = +value[9];
  const sum =
    [...value]
      .slice(0, 9)
      .reduce((acc, digit, index) => acc + +digit * (10 - index), 0) % 11;

  const valid = (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);

  return valid ? null : { nationalCodeInvalid: true };
}
