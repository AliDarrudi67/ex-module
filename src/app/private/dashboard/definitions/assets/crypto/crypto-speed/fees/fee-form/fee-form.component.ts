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
import { GITS_FEE_LIST } from '@shared/enums/gits-fee';
import { TYPE_CALC_WITHDRAW_LIST } from '@shared/enums/type-calc-withdraw';
import { IApiResponse } from '@shared/models/api-response.model';
import { IFeeWithdraw } from '@shared/models/fee/fee.model';
import { FormContainerComponent } from 'src/app/private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from 'src/app/private/dashboard/layout/form-footer/form-footer.component';

@Component({
  selector: 'app-fee-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormContainerComponent,
    FormFooterComponent,
    MatCheckboxModule,
  ],
  templateUrl: './fee-form.component.html',
  styleUrl: './fee-form.component.scss',
})
export class FeeFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'کارمزد سرعت';
  loading = false;
  formLoading = false;
  typeCalcList = TYPE_CALC_WITHDRAW_LIST;
  gitsFeeList = GITS_FEE_LIST;

  constructor(
    private matDialogRef: MatDialogRef<FeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFeeWithdraw,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
  }

  ngOnInit(): void {
    this.groupForm({});

    if (this.data?.feeId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.fee.byId(this.data?.feeId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IFeeWithdraw>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IFeeWithdraw>) {
    this.form = this.formBuilder.group({
      cryptoId: [this.data?.cryptoId, Validators.required],
      speedId: [this.data?.speedId, Validators.required],
      typeCalcWithdraw: [data?.typeCalcWithdraw, Validators.required],
      gas: [data?.gas, Validators.required],
      maxGasFee: [data?.maxGasFee, Validators.required],
      disCountInternalTransfer: [data?.disCountInternalTransfer],
      gitsFee: [data?.gitsFee],
      useRatio: [data?.useRatio ? true : false],
    });
  }

  onSubmit() {
    this.form.patchValue({
      disCountInternalTransfer: +this.form.value.disCountInternalTransfer,
      gas: +this.form.value.gas,
      maxGasFee: +this.form.value.maxGasFee,
    });
    console.log(this.form.value);

    if (!this.form.valid) return;
    this.loading = true;
    if (this.data?.feeId) {
      this.mainService
        .put(ApiEndpoints.fee.byId(this.data?.feeId), this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false; // پایان موفق
            this.formFooterComponent.closeDialog();
          },
          error: () => {
            this.loading = false;
          },
        });
    } else {
      this.mainService
        .post(ApiEndpoints.fee.base, this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false; // پایان موفق
            this.formFooterComponent.closeDialog();
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }
}
