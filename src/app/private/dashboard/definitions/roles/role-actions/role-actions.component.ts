import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { RoleActionGridConfig } from '@core/config/grid/role-actions.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { RoleActionFormComponent } from './role-action-form/role-action-form.component';

@Component({
  selector: 'app-role-actions',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './role-actions.component.html',
  styleUrl: './role-actions.component.scss',
})
export class RoleActionsComponent {
  columns: IGridColumn[] = RoleActionGridConfig;
  listEndpoint = ApiEndpoints.roleAction.pagination;
  deleteEndpoint = ApiEndpoints.roleAction.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = '';
    const dialog = this.dialog.open(RoleActionFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(roleAction: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = roleAction;
    const dialog = this.dialog.open(RoleActionFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
