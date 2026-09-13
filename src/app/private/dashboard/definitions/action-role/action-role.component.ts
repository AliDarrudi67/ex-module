import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { ActionRoleGridConfig } from '@core/config/grid/action-roles.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IActionRole } from '@shared/models/actionRole/action-role.model';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { ActionRoleFormComponent } from './action-role-form/action-role-form.component';

@Component({
  selector: 'app-action-role',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './action-role.component.html',
  styleUrl: './action-role.component.scss',
})
export class ActionRoleComponent {
  columns: IGridColumn[] = ActionRoleGridConfig;
  listEndpoint = ApiEndpoints.actionRole.pagination;
  deleteEndpoint = ApiEndpoints.actionRole.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = '';
    const dialog = this.dialog.open(ActionRoleFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(actionRole: IActionRole) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = actionRole?.actionRoleId;
    const dialog = this.dialog.open(ActionRoleFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
