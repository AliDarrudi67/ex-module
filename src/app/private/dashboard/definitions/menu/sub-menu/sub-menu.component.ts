import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MenuGridConfig } from '@core/config/grid/menu.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { SubMenuFormComponent } from './sub-menu-form/sub-menu-form.component';

@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss',
})
export class SubMenuComponent {
  columns: IGridColumn[] = MenuGridConfig;

  data = [
    {
      id: 1,
      slug: 'داشبورد',
      route: '/setting/edit',
      icon: 'dashboard',
      status: 'ACTIVE',
    },
    {
      id: 2,
      slug: 'مدیریت کاربران',
      route: '/setting/edit',
      icon: 'group',
      status: 'ACTIVE',
    },
    {
      id: 3,
      slug: 'افزودن کاربر جدید',
      route: '/setting/edit',
      icon: 'person_add',
      status: 'ACTIVE',
    },
    {
      id: 4,
      slug: 'تنظیمات',
      route: '/setting/edit',
      icon: 'settings',
      status: 'DEACTIVE',
    },
    {
      id: 5,
      slug: 'گزارش‌ها',
      route: '/setting/edit',
      icon: 'bar_chart',
      status: 'SUSPENDED',
    },
    {
      id: 6,
      slug: 'اعلان‌ها',
      route: '/setting/edit',
      icon: 'notifications',
      status: 'ACTIVE',
    },
    {
      id: 7,
      slug: 'نقش‌ها و سطح دسترسی',
      route: '/setting/edit',
      icon: 'security',
      status: 'ACTIVE',
    },
    {
      id: 8,
      slug: 'پشتیبانی',
      route: '/setting/edit',
      icon: 'support_agent',
      status: 'DEACTIVE',
    },
    {
      id: 9,
      slug: 'گزارش فعالیت‌ها',
      route: '/setting/edit',
      icon: 'list_alt',
      status: 'ACTIVE',
    },
    {
      id: 10,
      slug: 'صورتحساب‌ها',
      route: '/setting/edit',
      icon: 'account_balance_wallet',
      status: 'SUSPENDED',
    },
  ];

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(SubMenuFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(SubMenuFormComponent, dialogConfig);
  }
}
