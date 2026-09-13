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
import { FormContainerComponent } from '@private/dashboard/layout/form-container/form-container.component';
import { FormFooterComponent } from '@private/dashboard/layout/form-footer/form-footer.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { IApiResponse } from '@shared/models/api-response.model';
import { IGroupAssetListData } from '@shared/models/group-asset/group-asset-list.model';
import { IGroupAsset } from '@shared/models/group-asset/group-asset.model';
import { ISectionAsset } from '@shared/models/section-asset/section-asset.model';
import { RoleFormComponent } from '../../../roles/role-form/role-form.component';

@Component({
  selector: 'app-section-asset-form',
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
  templateUrl: './section-asset-form.component.html',
  styleUrl: './section-asset-form.component.scss',
})
export class SectionAssetFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  groupSections: IGroupAsset[] = [];
  loading = false;
  formLoading = false;

  constructor(
    private matDialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISectionAsset,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'Section Asset';
    console.log(data);
  }

  ngOnInit(): void {
    this.getGroupSections();
    this.groupForm({});
  }

  getGroupSections() {
    this.formLoading = true;
    const payload = {
      page: 1,
      limit: 10,
      filter: {},
      sort: {
        createdAt: 1,
      },
    };

    this.mainService
      .post(ApiEndpoints.groupAsset.pagination, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.formLoading = false;
          const typedResponse = response as IApiResponse<IGroupAssetListData>;
          this.groupSections = typedResponse.result.data;
        },
        error: () => {
          this.formLoading = false;
        },
      });
  }

  groupForm(data: Partial<ISectionAsset>) {
    this.form = this.formBuilder.group({
      groupSectionId: [data?.groupSectionId],
      assetId: [this.data?.assetId, Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.sectionAssetId) {
        this.mainService
          .put(
            ApiEndpoints.sectionAsset.byId(this.form.value?.groupSectionId),
            this.form.value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false;
            },
            error: () => {
              this.loading = false;
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.sectionAsset.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false;
            },
            error: () => {
              this.loading = false;
            },
          });
      }
    }
  }
}
