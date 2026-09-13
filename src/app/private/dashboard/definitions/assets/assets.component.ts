import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { AssetsGridConfig } from '@core/config/grid/assets.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IAsset } from '@shared/models/asset/asset.model';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { AssetFormComponent } from './asset-form/asset-form.component';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [GridComponent, RouterModule, ButtonComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  columns: IGridColumn[] = AssetsGridConfig;
  listEndpoint = ApiEndpoints.asset.pagination;
  deleteEndpoint = ApiEndpoints.asset.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    const dialog = this.dialog.open(AssetFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(asset: IAsset) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = asset;
    const dialog = this.dialog.open(AssetFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
