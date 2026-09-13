import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { AsyncSelectComponent } from '@shared/components/async-select/async-select.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { STATUS_LIST } from '@shared/enums/status-list';
import { IApiResponse } from '@shared/models/api-response.model';
import { IArchListData } from '@shared/models/arch/arch-list.model';
import { IArch } from '@shared/models/arch/arch.model';
import { ICrypto } from '@shared/models/crypto/crypto.model';

@Component({
  selector: 'app-crypto-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    NumericOnlyDirective,
    FormContainerComponent,
    FormFooterComponent,
    AsyncSelectComponent,
  ],
  templateUrl: './crypto-form.component.html',
  styleUrl: './crypto-form.component.scss',
})
export class CryptoFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  architectures: IArch[] = [];
  statusList = STATUS_LIST;
  chainPagination = ApiEndpoints.blockchain.pagination;
  data!: ICrypto;
  cryptoId = '';
  loading = false;
  formLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    private route: ActivatedRoute
  ) {
    super();
    this.formTitle = 'کریپتو';
    this.cryptoId = route.snapshot.params['cryptoId'];
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.cryptoId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.crypto.byId(this.cryptoId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<ICrypto>) => {
            this.formLoading = false;
            this.data = response?.result;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<ICrypto>) {
    this.form = this.formBuilder.group({
      assetId: [data?.assetId],
      chainId: [data?.chainId],
      archId: [data?.archId],
      isNative: [data?.isNative ? true : false],
      cryptoId: [this.data?.cryptoId],
      contractId: [data?.contractId, Validators.required],
      contractIdDeposit: [data?.contractIdDeposit, Validators.required],
      contractIdWithdraw: [data?.contractIdWithdraw, Validators.required],
      decimal: [data?.decimal, Validators.required],
      decimalCalc: [data?.decimalCalc, Validators.required],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.cryptoId) {
        this.mainService
          .put(
            ApiEndpoints.crypto.byId(this.form.value?.assetId),
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
          .post(ApiEndpoints.crypto.base, this.form.value)
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

  getArchitectures(chainId: string) {
    const payload = {
      page: 1,
      limit: 10,
      filter: {},
      sort: {
        createdAt: 1,
      },
    };
    this.mainService
      .post(ApiEndpoints.blockchain.architectures(chainId), payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const typedResponse = response as IApiResponse<IArchListData>;
          this.architectures = typedResponse.result.data;
        },
      });
  }
}
