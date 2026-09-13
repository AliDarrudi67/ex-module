import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '@shared/components/base/base.component';
import { LucideAngularModule } from 'lucide-angular';
import { NgOtpInputModule } from 'ng-otp-input';

import { ButtonComponent } from '@shared/components/buttons/button/button.component';

import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { WalletConnectService } from '@core/services/wallet-connect.service';
import { IconIranFlagComponent } from '@shared/components/icons/icon-iran-flag/icon-iran-flag.component';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { NoPersianDirective } from '@shared/directives/no-persian.directive';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { IApiResponse } from '@shared/models/api-response.model';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { ReferralCodeFormComponent } from './referral-code-form/referral-code-form.component';
import { RegisterMethodComponent } from './register-method/register-method.component';

export function strongPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value || '';

  // اگر خالی است، هیچ خطایی نده
  if (!value) return null;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const minLength = value.length >= 8;

  const valid =
    hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && minLength;

  return valid ? null : { strongPassword: true };
}

@Component({
  selector: 'app-register',
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
    NumericOnlyDirective,
    IconIranFlagComponent,
    ButtonComponent,
    RegisterMethodComponent,
    FormsModule,
    NoPersianDirective,
    TooltipComponent,
    LucideAngularModule,
    OtpInputComponent,
    ReferralCodeFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent {
  isMobile: boolean = false;
  mobileForm!: FormGroup;
  passwordForm!: FormGroup;
  hidePassword = true;
  registerMethod = '';
  setPasword = false;
  otpStep = false;
  referralCode = '';
  referralCodeControl = new FormControl(false, Validators.requiredTrue);
  otpVerifiedControl = new FormControl(false, Validators.requiredTrue);
  loading = false;

  @ViewChild('mobileInput') mobileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepper!: MatStepper; // <-- MatStepper

  constructor(
    public walletConnectService: WalletConnectService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    super();
    this.groupForms();
  }

  goNextStep(step: number) {
    if (step == 2) {
      this.submitMobileForm();
    }
    this.stepper.next();
  }

  groupForms() {
    this.mobileForm = this.formBuilder.group({
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^(?:\+98|0)?9\d{9}$/)],
      ],
    });

    this.passwordForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  submitMobileForm() {
    this.otpStep = true;
  }

  submit() {
    sessionStorage.setItem(
      'passwordForm',
      JSON.stringify(this.passwordForm.value)
    );
    if (this.registerMethod === 'wallet') {
      this.walletConnectService.walletLoginRegister(
        this.passwordForm.value.username,
        this.passwordForm.value.password,
        this.passwordForm.value.confirmPassword,
        this.referralCode
      );
    } else if (this.registerMethod == 'google') {
      this.loading = true;
      const data = {
        sourceFront: 'DEVELOPE',
        device: 'WEB',
        referralCode: this.referralCode,
      };
      this.mainService
        .post<IApiResponse<string>>(ApiEndpoints.google.signup, data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            this.loading = false;
            window.open(response?.result);
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }

  setRegisterMethod(method: string) {
    this.registerMethod = method;
    if (this.registerMethod == 'mobile') {
      this.focusMobile();
    } else {
      this.stepper.selectedIndex = 0;
    }
  }

  focusMobile(): void {
    setTimeout(() => {
      const mobileInput: HTMLInputElement | null =
        this.mobileInput?.nativeElement;
      if (mobileInput) {
        mobileInput.focus();
      }
    }, 250);
  }

  checkOtp(otp: string) {
    if (otp.length == 6) {
      this.otpVerifiedControl.setValue(true);
      this.goNextStep(-1);
    }
  }

  setReferralCode(code: string) {
    this.referralCode = code;
    this.referralCodeControl.setValue(true);
    this.stepper.next();
  }
}
