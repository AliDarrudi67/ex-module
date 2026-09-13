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
import { STATUS_LIST } from '@shared/enums/status-list';
import { IApiResponse } from '@shared/models/api-response.model';
import { IGroupAsset } from '@shared/models/group-asset/group-asset.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-group-asset-form',
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
  templateUrl: './group-asset-form.component.html',
  styleUrl: './group-asset-form.component.scss',
})
export class GroupAssetFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private matDialogRef: MatDialogRef<GroupAssetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGroupAsset,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'گروه دارایی';
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.groupAssetId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.groupAsset.byId(this.data?.groupAssetId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IGroupAsset>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IGroupAsset>) {
    this.form = this.formBuilder.group({
      groupAssetId: [this.data?.groupAssetId],
      slug: [data?.slug, Validators.required],
      isDefault: [data?.isDefault ? true : false],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.groupAssetId) {
        this.mainService
          .put(
            ApiEndpoints.groupAsset.byId(this.form.value?.groupAssetId),
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
          .post(ApiEndpoints.groupAsset.base, this.form.value)
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
