import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IconGoogleComponent } from '@shared/components/icons/icon-google/icon-google.component';
import { IconMobileComponent } from '@shared/components/icons/icon-mobile/icon-mobile.component';

@Component({
  selector: 'app-register-method',
  standalone: true,
  imports: [IconGoogleComponent, CommonModule, IconMobileComponent],
  templateUrl: './register-method.component.html',
  styleUrl: './register-method.component.scss',
})
export class RegisterMethodComponent {
  @Output() selectRegisterMethod: EventEmitter<string> =
    new EventEmitter<string>();
  active: string | null = null; // گزینه انتخاب‌شده (با کلیک)
  selectedMethod: string = '';

  buttons = [
    {
      id: 'wallet',
      label: 'ثبت نام با کانکت ولت',
      icon: 'assets/img/icon/walletconnect.png',
    },
    { id: 'google', label: 'ثبت نام با گوگل v3', icon: '' },
    {
      id: 'mobile',
      label: 'ثبت نام با شماره موبایل',
      icon: 'assets/img/icon/mobile.png',
    },
  ];

  isExpanded(id: string): boolean {
    return this.active === id;
  }

  selectMethod(method: string) {
    this.active = method;
    this.selectedMethod = method;
    this.selectRegisterMethod.emit(method);
  }
}
