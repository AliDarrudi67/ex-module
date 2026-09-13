import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numericOnly]',
  standalone: true,
})
export class NumericOnlyDirective {
  constructor(private ngControl: NgControl) {}

  // محدود کردن ورودی کاربر
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const input = this.ngControl.control?.value || '';
    const key = event.key;
    if (key === 'Enter') {
      return; // اجازه عبور
    }
    // فقط اعداد و یک ممیز مجاز هستند
    const allowed = /[0-9.]/;

    if (!allowed.test(key)) {
      event.preventDefault();
      return;
    }

    // جلوگیری از وارد کردن بیش از یک ممیز
    if (key === '.' && input.includes('.')) {
      event.preventDefault();
    }
  }

  // جلوگیری از paste غیرمجاز
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData?.getData('text') || '';
    if (!/^\d*\.?\d*$/.test(pastedInput)) {
      event.preventDefault();
    }
  }

  // تبدیل خودکار مقدار فرم به number هنگام تغییر
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const numericValue = value !== '' ? parseFloat(value) : null;
    this.ngControl.control?.setValue(numericValue, { emitEvent: false });
  }
}
