import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import { IAddressWallet } from '@shared/models/address-wallet/address-wallet.model';
import { IApiResponse } from '@shared/models/api-response.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-address-wallet-form',
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
  templateUrl: './address-wallet-form.component.html',
  styleUrl: './address-wallet-form.component.scss',
})
export class AddressWalletFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAddressWallet,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'Address Wallet';
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.addressWalletId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.addressWallet.byId(this.data?.addressWalletId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IAddressWallet>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IAddressWallet>) {
    this.form = this.formBuilder.group({
      evmId: [this.data?.evmId],
      addressWalletId: [this.data?.addressWalletId],
      description: [data?.description],
      isDefault: [data?.isDefault ? true : false],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.addressWalletId) {
        this.mainService
          .put(
            ApiEndpoints.addressWallet.byId(this.form.value?.addressWalletId),
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
          .post(ApiEndpoints.addressWallet.base, this.form.value)
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
