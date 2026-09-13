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
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { STATUS_LIST } from '@shared/enums/status-list';
import { TYPE_ASSET } from '@shared/enums/type-asset';
import { IApiResponse } from '@shared/models/api-response.model';
import { IAsset } from '@shared/models/asset/asset.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-asset-form',
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
  ],
  templateUrl: './asset-form.component.html',
  styleUrl: './asset-form.component.scss',
})
export class AssetFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = 'دارایی (asset)';
  statusList = STATUS_LIST;
  typeAssets = TYPE_ASSET;
  loading = false;
  formLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IAsset,
    public mainService: MainService
  ) {
    super();
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.assetId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.asset.byId(this.data?.assetId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IAsset>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IAsset>) {
    this.form = this.formBuilder.group({
      assetId: [this.data?.assetId],
      slug: [data?.slug, Validators.required],
      decimalDisplay: [data?.decimalDisplay, Validators.required],
      symbol: [data?.symbol, Validators.required],
      typeAsset: [data?.typeAsset, Validators.required],
      status: [data?.status],
      isStableCoin: [data?.isStableCoin ? true : false],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      this.form.patchValue({
        decimalDisplay: +this.form.value.decimalDisplay,
      });
      if (this.form.value?.assetId) {
        this.mainService
          .put(
            ApiEndpoints.asset.byId(this.form.value?.assetId),
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
          .post(ApiEndpoints.asset.base, this.form.value)
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
