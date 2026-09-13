import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { IApiResponse } from '@shared/models/api-response.model';
import { ISmtp } from '@shared/models/smtp/smtp.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';

@Component({
  selector: 'app-smtp-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormContainerComponent,
    FormFooterComponent,
  ],
  templateUrl: './smtp-form.component.html',
  styleUrl: './smtp-form.component.scss',
})
export class SmtpFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'smtp';
  loading = false;
  formLoading = false;
  statusList = STATUS_LIST;

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public data: ISmtp
  ) {
    super();
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.smtpCenterId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.smtp.byId(this.data?.smtpCenterId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<ISmtp>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false; // پایان موفق
          },
        });
    }
  }

  groupForm(data: Partial<ISmtp>) {
    this.form = this.formBuilder.group({
      smtpCenterId: [this.data?.smtpCenterId],
      email: [data?.email, [Validators.required, this.gmailValidator()]],
      status: [data?.status],
    });
  }

  gmailValidator(): Validators {
    return (control: any) => {
      const value = control.value || '';
      // خالی بودن را Angular خودش با required چک می‌کند
      const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
      return gmailPattern.test(value) ? null : { gmailInvalid: true };
    };
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true; // ⬅️ دکمه لودینگ شود
      if (this.form.value?.smtpCenterId) {
        this.mainService
          .put(
            ApiEndpoints.smtp.byId(this.form.value?.smtpCenterId),
            this.form.value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false; // پایان موفق
              this.formFooterComponent.closeDialog();
            },
            error: () => {
              this.loading = false; // پایان موفق
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.smtp.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false; // پایان موفق
              this.formFooterComponent.closeDialog();
            },
            error: () => {
              this.loading = false; // پایان موفق
            },
          });
      }
    }
  }
}
