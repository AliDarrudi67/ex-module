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
import { IRole } from '@shared/models/role/role.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-role-form',
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
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
})
export class RoleFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public roleId: string,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'نقش';
    console.log(roleId);
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.roleId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.role.byId(this.roleId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IRole>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false; // پایان موفق
          },
        });
    }
  }

  groupForm(data: Partial<IRole>) {
    this.form = this.formBuilder.group({
      roleId: [data?.roleId],
      slug: [data?.slug, Validators.required],
      description: [data?.description],
      isDefault: [data?.isDefault ? true : false],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true; // ⬅️ دکمه لودینگ شود
      if (this.form.value?.roleId) {
        this.mainService
          .put(ApiEndpoints.role.byId(this.form.value?.roleId), this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false; // پایان موفق
              this.formFooterComponent.closeDialog();
            },
            error: () => {
              this.loading = false; // پایان موفق
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.role.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loading = false; // پایان موفق
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
