import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { RoleSettingGridConfig } from '@core/config/grid/role-setting.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { IRoleSetting } from '@shared/models/role-setting/role-setting.model';
import { RoleSettingFormComponent } from './role-setting-form/role-setting-form.component';

@Component({
  selector: 'app-role-setting',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './role-setting.component.html',
  styleUrl: './role-setting.component.scss',
})
export class RoleSettingComponent {
  columns: IGridColumn[] = RoleSettingGridConfig;
  listEndpoint = ApiEndpoints.roleSetting.pagination;
  deleteEndpoint = ApiEndpoints.roleSetting.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    const dialog = this.dialog.open(RoleSettingFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(roleSetting: IRoleSetting) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = roleSetting;
    const dialog = this.dialog.open(RoleSettingFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
