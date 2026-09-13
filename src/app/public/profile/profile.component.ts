import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { ChangeModeComponent } from '@shared/components/change-mode/change-mode.component';
import { CountryPickerComponent } from '@shared/components/country-picker/country-picker.component';
import { DatepickerComponent } from '@shared/components/datepicker/datepicker.component';
import { IconLoadingComponent } from '@shared/components/icons/icon-loading/icon-loading.component';
import { NoPersianDirective } from '@shared/directives/no-persian.directive';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { GENDER_LIST } from '@shared/enums/gender-list';
import { USER_STATUS } from '@shared/enums/user-status';
import { IApiResponse } from '@shared/models/api-response.model';
import { IUserProfile } from '@shared/models/user/user-profile.model';
import { nationalCodeValidator } from '@shared/validators/national-code.validator';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    ButtonComponent,
    FormsModule,
    MatSelectModule,
    NoPersianDirective,
    LucideAngularModule,
    NumericOnlyDirective,
    DatepickerComponent,
    MatCheckboxModule,
    MatStepperModule,
    CountryPickerComponent,
    ChangeModeComponent,
    IconLoadingComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends BaseComponent {
  form!: FormGroup;
  countryError = '';
  canSkipProfile = false;
  open = false;
  genderList = GENDER_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
    this.canSkipProfile =
      localStorage.getItem('statusActivity') == USER_STATUS.SET_PASSWORD;
  }

  ngOnInit(): void {
    this.groupForm({});
    this.getProfile();
  }

  // Close dropdown when clicking outside
  @HostListener('document:click')
  onDocumentClick() {
    this.open = false;
  }

  toggle() {
    if (this.open) {
      this.open = false;
    } else {
      this.open = true;
    }
  }

  getProfile() {
    this.loading = true;
    this.mainService
      .get(ApiEndpoints.user.profile)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: IApiResponse<IUserProfile>) => {
          this.loading = false;
          this.groupForm(response?.result);
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  groupForm(data: Partial<IUserProfile>) {
    this.form = this.formBuilder.group({
      personal: this.formBuilder.group({
        nationalCode: [
          data?.nationalCode,
          [Validators.required, nationalCodeValidator],
        ],
        firstName: [data?.firstName, Validators.required],
        lastName: [data?.lastName, Validators.required],
        father: [data?.father],
        sex: [data?.sex, Validators.required],
        birthDate: [data?.birthDate],
      }),
      contact: this.formBuilder.group({
        iso3: [data?.iso3, Validators.required],
        city: [data?.city],
        address: [data?.address],
      }),
      referral: this.formBuilder.group({
        referralCode: [data?.referralCode, Validators.required],
        infoReferral: [data?.infoReferral ? true : false],
      }),
    });
  }

  submit() {
    this.touchForm();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formLoading = true;
    const payload = {
      ...this.form.value.personal,
      ...this.form.value.contact,
      ...this.form.value.referral,
    };
    payload.nationalCode = payload.nationalCode.toString();
    this.mainService
      .put(ApiEndpoints.user.base, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.formLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.formLoading = false;
        },
      });
  }

  touchForm(step: number = 0) {
    if (step == 2 && !this.form.value.contact.iso3) {
      this.countryError = 'کشور اجباری است';
      return;
    }
    this.form.markAllAsTouched();
  }

  setIsoValue(iso3: string) {
    this.form.get('contact.iso3')?.setValue(iso3); // ⚡️ این مهمه
    this.countryError = '';
  }
}
