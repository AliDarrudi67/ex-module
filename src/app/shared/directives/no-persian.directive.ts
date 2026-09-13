import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoPersian]',
  standalone: true,
})
export class NoPersianDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const pattern = /[^\u0000-\u007F]/; // هر کاراکتر غیر ASCII
    if (pattern.test(event.key)) {
      event.preventDefault(); // جلوگیری از وارد شدن کاراکتر
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /[^\u0000-\u007F]/;
    if (pattern.test(pastedText)) {
      event.preventDefault();
    }
  }
}
