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
import { IChain } from '@shared/models/chain/chain.model';

@Component({
  selector: 'app-blockchain-form',
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
  ],
  templateUrl: './blockchain-form.component.html',
  styleUrl: './blockchain-form.component.scss',
})
export class BlockchainFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'بلاکچین';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IChain,
    public mainService: MainService
  ) {
    super();
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.chainId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.blockchain.byId(this.data?.chainId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IChain>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IChain>) {
    this.form = this.formBuilder.group({
      chainId: [data?.chainId],
      evmId: [this.data?.evmId],
      slug: [data?.slug, Validators.required],
      symbol: [data?.symbol, Validators.required],
      status: [data?.status],
      description: [data?.description],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true; // ⬅️ دکمه لودینگ شود
      console.log('Form submitted:', this.form.value);
      if (this.form.valid) {
        if (this.form.value?.chainId) {
          this.mainService
            .put(
              ApiEndpoints.blockchain.byId(this.form.value?.chainId),
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
            .post(ApiEndpoints.blockchain.base, this.form.value)
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
}
