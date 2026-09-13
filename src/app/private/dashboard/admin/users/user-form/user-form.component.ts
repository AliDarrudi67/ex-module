import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { MainService } from '@core/services/main.service';
import { AsyncSelectComponent } from '@shared/components/async-select/async-select.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { LucideAngularModule } from 'lucide-angular';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-user-form',
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
    AsyncSelectComponent,
    LucideAngularModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  accountLevelPagination = ''; // اندپوینت سطوح کاربری رو ندریم فعلا
  form!: FormGroup;
  formTitle = 'کاربر';
  statusList = STATUS_LIST;
  hidePassword = true;
  destroyRef = inject(DestroyRef);

  // ساخت لیست سطح کاربری (می‌تونی تغییر بدی)
  accountLevelList = [
    { value: 1, text: 'سطح ۱' },
    { value: 2, text: 'سطح ۲' },
    { value: 3, text: 'سطح ۳' },
  ];

  constructor(
    private matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public mainService: MainService
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.groupForm(this.data);

    if (this.data?.userId) {
      this.mainService
        .get(ApiEndpoints.user.byId(this.data?.userId))
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
      userId: [data?.userId],
      fullName: [data?.fullName, Validators.required],
      username: [data?.username, Validators.required],
      password: [data?.password, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      status: [data?.status],
      accountLevel: [data?.accountLevel, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value?.userId) {
        this.mainService
          .put(ApiEndpoints.user.byId(this.form.value?.userId), this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      } else {
        this.mainService
          .post(ApiEndpoints.user.base, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
    }
  }
}
