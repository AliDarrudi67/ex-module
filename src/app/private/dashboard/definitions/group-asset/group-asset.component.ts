import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { GroupAssetGridConfig } from '@core/config/grid/group-asset.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { IGroupAsset } from '@shared/models/group-asset/group-asset.model';
import { GroupAssetFormComponent } from './group-asset-form/group-asset-form.component';

@Component({
  selector: 'app-group-asset',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './group-asset.component.html',
  styleUrl: './group-asset.component.scss',
})
export class GroupAssetComponent {
  columns: IGridColumn[] = GroupAssetGridConfig;
  listEndpoint = ApiEndpoints.groupAsset.pagination;
  deleteEndpoint = ApiEndpoints.groupAsset.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    const dialog = this.dialog.open(GroupAssetFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(groupAsset: IGroupAsset) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = groupAsset;
    const dialog = this.dialog.open(GroupAssetFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
