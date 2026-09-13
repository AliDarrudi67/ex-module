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
import { AsyncSelectComponent } from '@shared/components/async-select/async-select.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { RoleFormComponent } from '../../role-form/role-form.component';

@Component({
  selector: 'app-role-action-form',
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
  templateUrl: './role-action-form.component.html',
  styleUrl: './role-action-form.component.scss',
})
export class RoleActionFormComponent extends BaseComponent {
  form!: FormGroup;
  formTitle = '';
  statusList = STATUS_LIST;
  actionRolesPagination = ApiEndpoints.actionRole.pagination;

  constructor(
    private matDialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public roleActionId: string,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    super();
    this.formTitle = 'نقش عملیاتی';
    console.log(roleActionId);
  }

  ngOnInit(): void {
    this.groupForm(this.roleActionId);
    if (this.roleActionId) {
      this.mainService
        .get(ApiEndpoints.roleAction.byId(this.roleActionId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: any) => {
            this.groupForm(response?.result);
          },
        });
    }
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      roleId: [data?.roleId],
      actionRoleId: [data?.actionRoleId, Validators.required],
      roleActionId: [data?.roleActionId],
      status: [data?.status],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      if (this.form.value?.roleActionId) {
        this.mainService
          .put(
            ApiEndpoints.roleAction.byId(this.form.value?.roleId),
            this.form.value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.formFooterComponent.closeDialog();
            },
          });
      } else {
        this.mainService
          .post(ApiEndpoints.roleAction.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.formFooterComponent.closeDialog();
            },
          });
      }
    }
  }
}
