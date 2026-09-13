import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { RolesGridConfig } from '@core/config/grid/roles.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { IRole } from '@shared/models/role/role.model';
import { RoleFormComponent } from './role-form/role-form.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  columns: IGridColumn[] = RolesGridConfig;
  listEndpoint = ApiEndpoints.role.pagination;
  deleteEndpoint = ApiEndpoints.role.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = '';
    const dialog = this.dialog.open(RoleFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(role: IRole) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = role?.roleId;
    const dialog = this.dialog.open(RoleFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
