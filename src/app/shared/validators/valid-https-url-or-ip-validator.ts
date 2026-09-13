import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validHttpsUrlOrIpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) return null; // خالی بودن رو required چک می‌کنه

    try {
      // اگر URL معتبره و با https شروع میشه → اوکی
      const url = new URL(value);
      if (url.protocol === 'https:') return null;
    } catch {
      // اگر URL معتبر نبود، ممکنه فقط IP باشه — بررسی با regex
      const httpsIpPattern = /^https:\/\/(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)?$/;
      if (httpsIpPattern.test(value)) return null;
    }

    return { invalidHttpsUrl: true };
  };
}
