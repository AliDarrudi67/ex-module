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
import { AsyncSelectComponent } from '@shared/components/async-select/async-select.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { ROLE_TYPE } from '@shared/enums/role-type';
import { IApiResponse } from '@shared/models/api-response.model';
import { IRoleSetting } from '@shared/models/role-setting/role-setting.model';
import { RoleFormComponent } from '../../../definitions/roles/role-form/role-form.component';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';

@Component({
  selector: 'app-role-setting-form',
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
  templateUrl: './role-setting-form.component.html',
  styleUrl: './role-setting-form.component.scss',
})
export class RoleSettingFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  roleTypes = ROLE_TYPE;
  rolesPagination = ApiEndpoints.role.pagination;
  loading = false;
  formLoading = false;

  constructor(
    private matDialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRoleSetting,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'تنظیمات نقش';
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.data?.roleSettingId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.roleSetting.byId(this.data?.roleSettingId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IRoleSetting>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false;
          },
        });
    }
  }

  groupForm(data: Partial<IRoleSetting>) {
    this.form = this.formBuilder.group({
      roleSettingId: [this.data?.roleSettingId],
      roleType: [data?.roleType, Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value?.roleSettingId) {
        this.mainService
          .put(
            ApiEndpoints.roleSetting.byId(this.form.value?.roleSettingId),
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
          .post(ApiEndpoints.roleSetting.base, this.form.value)
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
