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
import { BaseComponent } from '@shared/components/base/base.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { IApiResponse } from '@shared/models/api-response.model';
import { IArch } from '@shared/models/arch/arch.model';

@Component({
  selector: 'app-architecture-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormFooterComponent,
    FormContainerComponent,
  ],
  templateUrl: './architecture-form.component.html',
  styleUrl: './architecture-form.component.scss',
})
export class ArchitectureFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'معماری';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IArch,
    public mainService: MainService
  ) {
    super();
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.archId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.architecture.byId(this.data?.archId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IArch>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IArch>) {
    this.form = this.formBuilder.group({
      archId: [data?.archId],
      chainId: [this.data?.chainId],
      slug: [data?.slug, Validators.required],
      symbol: [data?.symbol, Validators.required],
      status: [data?.status],
      description: [data?.description],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      if (this.form.valid) {
        this.loading = true;
        if (this.form.value?.archId) {
          this.mainService
            .put(
              ApiEndpoints.architecture.byId(this.form.value?.archId),
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
            .post(ApiEndpoints.architecture.base, this.form.value)
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
}
