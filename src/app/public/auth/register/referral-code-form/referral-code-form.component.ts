import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { WalletConnectService } from '@core/services/wallet-connect.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { IApiResponse } from '@shared/models/api-response.model';
import { IReferal } from '@shared/models/user/referal.model';
import { LucideAngularModule } from 'lucide-angular';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-referral-code-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatCheckboxModule,
    NgOtpInputModule,
    MatTooltipModule,
    FormsModule,
    ButtonComponent,
    LucideAngularModule,
  ],
  templateUrl: './referral-code-form.component.html',
  styleUrl: './referral-code-form.component.scss',
})
export class ReferralCodeFormComponent {
  @Input() registerMethod = '';
  @Output() referralCode = new EventEmitter<string>();

  nonce = '';
  walletNonceId = '';
  referralCodeForm!: FormGroup;
  verifyReferralCode = false;

  constructor(
    public mainService: MainService,
    private formBuilder: FormBuilder,
    public walletConnectService: WalletConnectService
  ) {
    this.groupForm();
  }

  submitReferralCodeForm() {
    this.checkReferralCode();
  }

  pasteReferralCode() {}

  checkReferralCode() {
    if (this.referralCodeForm.value.referralCode) {
      this.mainService
        .get<IApiResponse<IReferal>>(
          ApiEndpoints.user.checkReferal(
            this.referralCodeForm.value.referralCode
          )
        )
        .subscribe({
          next: (response) => {
            if (response?.result?.httpCode == 200) {
              this.verifyReferralCode = true;
              this.checkRules();
            } else {
              this.mainService.errorToast('کد دعوت وارد شده معتبر نیست');
            }
          },
        });
    } else {
      this.checkRules();
    }
  }

  checkRules() {
    if (!this.referralCodeForm.value.acceptTerms) {
      this.mainService.errorToast(
        'لطفا شرایط و قوانین را مطالعه و تایید نمایید'
      );
      return;
    }
    this.referralCode.emit(this.referralCodeForm.value.referralCode);
  }

  groupForm() {
    this.referralCodeForm = this.formBuilder.group({
      referralCode: [''],
      acceptTerms: ['', Validators.required],
    });
  }
}
