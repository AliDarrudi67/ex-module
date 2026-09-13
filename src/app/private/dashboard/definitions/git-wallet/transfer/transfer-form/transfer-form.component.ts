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
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { AsyncSelectComponent } from '@shared/components/async-select/async-select.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { IApiResponse } from '@shared/models/api-response.model';
import { IGitWalletTransfer } from '@shared/models/git-wallet-transfer/git-wallet-transfer.model';

@Component({
  selector: 'app-transfer-form',
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
    AsyncSelectComponent,
  ],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.scss',
})
export class TransferFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  listEndpoint = ApiEndpoints.gitWallet.pagination;
  loading = false;
  formLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGitWalletTransfer,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'ترنسفر';
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.gitWalletTransferId) {
      this.formLoading = true;
      this.mainService
        .get(
          ApiEndpoints.gitWalletTransfer.byId(this.data?.gitWalletTransferId)
        )
        .subscribe({
          next: (response: IApiResponse<IGitWalletTransfer>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IGitWalletTransfer>) {
    this.form = this.formBuilder.group({
      gitWalletTransferId: [this.data?.gitWalletTransferId],
      fromGitWalletId: [data?.fromGitWalletId, Validators.required],
      toGitWalletId: [data?.toGitWalletId, Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.gitWalletTransferId) {
        this.mainService
          .put(
            ApiEndpoints.gitWalletTransfer.byId(
              this.form.value?.gitWalletTransferId
            ),
            this.form.value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false;
              this.formFooterComponent.closeDialog();
            },
            error: () => {
              this.loading = false;
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.gitWalletTransfer.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false;
              this.formFooterComponent.closeDialog();
            },
            error: () => {
              this.loading = false;
            },
          });
      }
    }
  }

  setFrom($event: string) {
    this.form.patchValue({
      fromGitWalletId: $event,
    });
  }

  setTo($event: string) {
    this.form.patchValue({
      toGitWalletId: $event,
    });
  }
}
