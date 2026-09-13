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
import { IEvm } from '@shared/models/evm/evm.model';
import { validHttpsUrlOrIpValidator } from '@shared/validators/valid-https-url-or-ip-validator';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-evm-form',
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
  templateUrl: './evm-form.component.html',
  styleUrl: './evm-form.component.scss',
})
export class EvmFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'ماشین مجازی';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public evmId: string
  ) {
    super();
    console.log(evmId);
  }

  ngOnInit(): void {
    this.groupForm({} as IEvm);
    if (this.evmId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.evm.byId(this.evmId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IEvm>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false; // پایان موفق
          },
        });
    }
  }

  groupForm(data: Partial<IEvm>) {
    this.form = this.formBuilder.group({
      evmId: [data?.evmId],
      slug: [data?.slug, Validators.required],
      server: [
        data?.server,
        [Validators.required, validHttpsUrlOrIpValidator()],
      ],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.evmId) {
        this.mainService
          .put(ApiEndpoints.evm.byId(this.form.value?.evmId), this.form.value)
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
          .post(ApiEndpoints.evm.base, this.form.value)
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
