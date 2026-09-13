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
import { IActionRole } from '@shared/models/actionRole/action-role.model';
import { IApiResponse } from '@shared/models/api-response.model';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-action-role-form',
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
  templateUrl: './action-role-form.component.html',
  styleUrl: './action-role-form.component.scss',
})
export class ActionRoleFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  loading = false;
  formLoading = false;

  constructor(
    private matDialogRef: MatDialogRef<ActionRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public actionRoleId: string,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    console.log(actionRoleId);

    this.formTitle = 'نقش عملیاتی';
  }

  ngOnInit(): void {
    this.groupForm({});
    if (this.actionRoleId) {
      this.formLoading = true;
      this.mainService
        .get(ApiEndpoints.actionRole.byId(this.actionRoleId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: IApiResponse<IActionRole>) => {
            this.formLoading = false;
            this.groupForm(response?.result);
          },
          error: () => {
            this.formLoading = false; // پایان موفق
          },
        });
    }
  }

  groupForm(data: Partial<IActionRole>) {
    this.form = this.formBuilder.group({
      actionRoleId: [data?.actionRoleId],
      slug: [data?.slug, Validators.required],
      description: [data?.description],
      symbol: [data?.symbol],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      this.loading = true; // ⬅️ دکمه لودینگ شود
      if (this.form.value?.actionRoleId) {
        this.mainService
          .put(
            ApiEndpoints.actionRole.byId(this.form.value?.actionRoleId),
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
          .post(ApiEndpoints.actionRole.base, this.form.value)
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
