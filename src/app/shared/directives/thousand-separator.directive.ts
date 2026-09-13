import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appThousandSeparator]',
  standalone: true
})
export class ThousandSeparatorDirective {
  @Output() rawValueChange = new EventEmitter<string>();

  constructor(private el: ElementRef<HTMLInputElement>) {
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    const cursorPos = input.selectionStart ?? 0;

    // حذف کاما و کاراکترهای غیر عدد
    const rawValue = input.value.replace(/,/g, '').replace(/\D/g, '');
    this.rawValueChange.emit(rawValue); // برای ارسال مقدار اصلی

    // فرمت سه‌رقمی
    const formattedValue = this.formatWithCommas(rawValue);

    input.value = formattedValue;

    // بازنشانی مکان‌نمای کاربر
    const diff = formattedValue.length - rawValue.length;
    input.setSelectionRange(cursorPos + diff, cursorPos + diff);
  }

  private formatWithCommas(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
