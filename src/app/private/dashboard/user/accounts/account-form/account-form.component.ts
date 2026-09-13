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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { AsyncSelectComponent } from '../../../../../components/async-select/async-select.component';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';

@Component({
  selector: 'app-account-form',
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
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  gitWallets: any[] = [];
  listEndpoint = ApiEndpoints.gitWallet.pagination;

  constructor(
    private matDialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'اکانت';
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm(this.data);
    if (this.data?.gitWalletTransferId) {
      this.mainService
        .get(
          ApiEndpoints.gitWalletTransfer.byId(this.data?.gitWalletTransferId)
        )
        .subscribe({
          next: (response: any) => {
            this.groupForm(response?.result);
          },
        });
    }
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      gitWalletTransferId: [data?.gitWalletTransferId],
      fromGitWalletId: [data?.fromGitWalletId, Validators.required],
      toGitWalletId: [data?.toGitWalletId, Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
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
              this.formFooterComponent.closeDialog();
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.gitWalletTransfer.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.formFooterComponent.closeDialog();
            },
          });
      }
    }
  }

  setFrom($event: any) {
    this.form.patchValue({
      fromGitWalletId: $event,
    });
  }

  setTo($event: any) {
    this.form.patchValue({
      toGitWalletId: $event,
    });
  }
}
