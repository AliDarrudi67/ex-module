import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { LucideIconPickerComponent } from '@shared/components/lucide-icon-picker/lucide-icon-picker.component';
import { STATUS_LIST } from '@shared/enums/status-list';
import { LucideAngularModule } from 'lucide-angular';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { FormFooterComponent } from '../../../layout/form-footer/form-footer.component';
@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    LucideAngularModule,
    FormContainerComponent,
    FormFooterComponent,
    ButtonComponent,
  ],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss',
})
export class MenuFormComponent {
  form!: FormGroup;
  formTitle = 'منو';
  statusList = STATUS_LIST;

  routes = [
    {
      slug: '/api/users',
      description: 'دریافت لیست کاربران',
      status: 'ACTIVE',
      method: 'GET',
      createdAt: '1403/07/10',
    },
    {
      slug: '/api/users/:id',
      description: 'دریافت اطلاعات کاربر بر اساس شناسه',
      status: 'ACTIVE',
      method: 'GET',
      createdAt: '1403/07/12',
    },
    {
      slug: '/api/users/create',
      description: 'ایجاد کاربر جدید در سیستم',
      status: 'ACTIVE',
      method: 'POST',
      createdAt: '1403/07/13',
    },
    {
      slug: '/api/payments',
      description: 'پردازش تراکنش‌های مالی',
      status: 'SUSPENDED',
      method: 'POST',
      createdAt: '1403/07/15',
    },
    {
      slug: '/api/reports',
      description: 'گزارش‌گیری سیستم و خروجی فایل‌ها',
      status: 'DEACTIVE',
      method: 'GET',
      createdAt: '1403/07/18',
    },
    {
      slug: '/api/settings',
      description: 'مدیریت تنظیمات کلی سیستم',
      status: 'ACTIVE',
      method: 'GET',
      createdAt: '1403/07/19',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mainService: MainService,
    private dialog: MatDialog
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      slug: ['', Validators.required],
      route: [''],
      icon: ['', Validators.required],
      status: [''],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      // اینجا می‌تونی داده‌ها رو به سرور بفرستی
    } else {
      console.log('Form is invalid');
    }
  }

  openIconPicker() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.autoFocus = true;
    const dialog = this.dialog.open(LucideIconPickerComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: any) => {
        this.form.patchValue({
          icon: response,
        });
      },
    });
  }
}
