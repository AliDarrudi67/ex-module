import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouteGridConfig } from '@core/config/grid/route.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { RouteFormComponent } from './route-form/route-form.component';

@Component({
  selector: 'app-route-manager',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './route-manager.component.html',
  styleUrl: './route-manager.component.scss',
})
export class RouteManagerComponent {
  columns: IGridColumn[] = RouteGridConfig;

  data = [
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

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(RouteFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(RouteFormComponent, dialogConfig);
  }
}
