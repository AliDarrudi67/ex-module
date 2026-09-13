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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { IApiResponse } from '@shared/models/api-response.model';
import { IEmailDeclare } from '@shared/models/email-declare/email-declare.model';

@Component({
  selector: 'app-email-declare-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormContainerComponent,
    FormFooterComponent,
    MatSelectModule,
  ],
  templateUrl: './email-declare-form.component.html',
  styleUrl: './email-declare-form.component.scss',
})
export class EmailDeclareFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'ماشین مجازی';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public data: IEmailDeclare
  ) {
    super();
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.smtpCenterId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.emailDeclare.byId(this.data?.smtpCenterId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IEmailDeclare>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false; // پایان موفق
          },
        });
    }
  }

  groupForm(data: Partial<IEmailDeclare>) {
    this.form = this.formBuilder.group({
      smtpCenterId: [this.data?.smtpCenterId],
      email: [data?.email, [Validators.required, Validators.email]],
      clientId: [data?.clientId],
      clientSecret: [data?.clientSecret],
      redirectUrl: [data?.redirectUrl],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.smtpCenterId) {
        this.mainService
          .put(
            ApiEndpoints.emailDeclare.byId(this.form.value?.smtpCenterId),
            this.form.value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false;
              this.formFooterComponent.closeDialog();
            },
            error: () => {
              this.loading = false; // پایان موفق
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.emailDeclare.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false;
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
