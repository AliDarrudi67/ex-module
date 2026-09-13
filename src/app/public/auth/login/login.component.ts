import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '@shared/components/base/base.component';
import { LucideAngularModule } from 'lucide-angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { ButtonComponent } from '@shared/components/buttons/button/button.component';

import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { WalletConnectService } from '@core/services/wallet-connect.service';
import { IApiResponse } from '@shared/models/api-response.model';
import { OtpInputComponent } from '../otp-input/otp-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ɵInternalFormsSharedModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
    NgOtpInputModule,
    OtpInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent implements OnInit {
  hide = true;
  form!: FormGroup;
  captchaResolved = false;
  captchaToken: string | null = null;
  userIp = '';
  loginType = 'password';
  loading = false;
  googleLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router,
    public walletConnectService: WalletConnectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.groupForm();
    this.getUserIp();
  }

  getUserIp() {
    this.mainService
      .get(ApiEndpoints.developer.ip)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: IApiResponse<string>) => {
          this.userIp = response?.result;
        },
      });
  }

  groupForm() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
    });
  }

  submitForm() {
    console.log(this.form.value);

    if (!this.captchaResolved) {
      this.mainService.errorToast('لطفاً کپچا را فعال کنید.');
      return;
    }

    if (this.form.valid) {
      this.loading = true;
      this.mainService
        .post(ApiEndpoints.user.web2Authenticate, this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/auth/set-role']);
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }

  onCaptchaResolved(token: string | null) {
    if (token) {
      this.captchaResolved = true;
      this.captchaToken = token;
      this.form.patchValue({
        captcha: this.captchaToken,
      });
    } else {
      this.captchaResolved = false;
      this.captchaToken = null;
    }
  }

  connectWallet() {
    this.walletConnectService.walletLoginRegister('', '', '', '', 'irn');
  }

  changeLoginType() {
    const iranMobilePattern = /^(?:\+98|0)?9\d{9}$/;
    if (this.loginType == 'password' && !this.form.value.userName) {
      this.mainService.errorToast('لطفا شماره همراه خود را وارد کنید');
      return;
    }
    if (
      this.loginType == 'password' &&
      !iranMobilePattern.test(this.form.value.userName)
    ) {
      this.mainService.errorToast('شماره همراه وارد شده معتبر نیست.');
      return;
    }
    this.loginType = this.loginType == 'password' ? 'otp' : 'password';
  }

  loginByGoogle() {
    this.googleLoading = true;
    const data = {
      sourceFront: 'DEVELOPE',
      device: 'WEB',
    };

    this.mainService
      .post<IApiResponse<string>>(ApiEndpoints.google.signin, data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.googleLoading = false;
          window.open(response?.result);
        },
        error: () => {
          this.googleLoading = false;
        },
      });
  }
}
