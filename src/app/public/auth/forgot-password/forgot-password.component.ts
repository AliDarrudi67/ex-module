import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { Subscription, interval } from 'rxjs';

import { IconIranFlagComponent } from '@shared/components/icons/icon-iran-flag/icon-iran-flag.component';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { strongPasswordValidator } from '../register/register.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatCheckboxModule,
    NgOtpInputModule,
    MatTooltipModule,
    NumericOnlyDirective,
    IconIranFlagComponent,
    ButtonComponent,
    FormsModule,
    LucideAngularModule,
    TooltipComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  isMobile: boolean = false;
  referralCodeForm!: FormGroup;
  mobileForm!: FormGroup;
  verifyForm!: FormGroup;
  passwordForm!: FormGroup;
  hidePassword = true;
  timer: number = 60; // زمان تایمر به ثانیه
  timerSub: Subscription | null = null;
  showResend: boolean = false;
  registerMethod = '';

  constructor(private formBuilder: FormBuilder) {
    this.groupForms();
  }

  groupForms() {
    this.referralCodeForm = this.formBuilder.group({
      referralCode: [''],
      acceptTerms: ['', Validators.required],
    });

    this.mobileForm = this.formBuilder.group({
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^(?:\+98|0)?9\d{9}$/)],
      ],
    });

    this.verifyForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
    this.startTimer();

    this.passwordForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  checkMobile(data: string) {}
  checkCode(data: string) {
    this.verifyForm.patchValue({
      code: data,
    });
  }

  submitReferralCodeForm() {
    console.log('referralCode form submit');
  }

  submitMobileForm() {
    console.log('referralCode form submit');
  }

  submit() {}

  startTimer() {
    this.showResend = false;
    this.timer = 60;

    this.timerSub = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.stopTimer();
        this.showResend = true;
      }
    });
  }

  stopTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  resendOtp() {
    // اینجا میتونی تابع ارسال مجدد OTP به سرور بذاری
    console.log('ارسال مجدد OTP');
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  setRegisterMethod(method: string) {
    this.registerMethod = method;
  }

  pasteReferralCode() {
    navigator.clipboard
      .readText()
      .then((text) => {
        this.referralCodeForm.get('referralCode')?.setValue(text);
      })
      .catch((err) => console.error('خطا در خواندن کلیپبرد:', err));
  }

  checkReferralCode() {
    const code = this.referralCodeForm.get('referralCode')?.value;
    if (!code) return;
    // TODO: منطق بررسی کد دعوت
    console.log('بررسی کد دعوت:', code);
  }
}
