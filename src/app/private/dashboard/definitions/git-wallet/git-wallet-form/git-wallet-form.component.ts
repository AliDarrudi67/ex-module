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
import { TYPE_GIT_LIST } from '@shared/enums/type-git-wallet';
import { IApiResponse } from '@shared/models/api-response.model';
import { IGitWallet } from '@shared/models/git-wallet/git-wallet.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-git-wallet-form',
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
  templateUrl: './git-wallet-form.component.html',
  styleUrl: './git-wallet-form.component.scss',
})
export class GitWalletFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  typeGitList = TYPE_GIT_LIST;
  formLoading = false;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGitWallet,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'مخزن حساب';
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.gitWalletId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.gitWallet.byId(this.data?.gitWalletId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IGitWallet>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IGitWallet>) {
    this.form = this.formBuilder.group({
      gitWalletId: [this.data?.gitWalletId],
      slug: [data?.slug, Validators.required],
      typeGitWallet: [data?.typeGitWallet, Validators.required],
      symbol: [data?.symbol, Validators.required],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.gitWalletId) {
        this.mainService
          .put(
            ApiEndpoints.gitWallet.byId(this.form.value?.gitWalletId),
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
          .post(ApiEndpoints.gitWallet.base, this.form.value)
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
}
