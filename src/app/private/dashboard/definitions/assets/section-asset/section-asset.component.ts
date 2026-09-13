import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { SectionAssetGridConfig } from '@core/config/grid/section-asset.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { SectionAssetFormComponent } from './section-asset-form/section-asset-form.component';

@Component({
  selector: 'app-section-asset',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './section-asset.component.html',
  styleUrl: './section-asset.component.scss',
})
export class SectionAssetComponent {
  columns: IGridColumn[] = SectionAssetGridConfig;
  listEndpoint = '';
  deleteEndpoint = ApiEndpoints.sectionAsset.base;
  assetId = '';
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private mainService: MainService
  ) {
    this.assetId = route.snapshot.params['id'];
    this.listEndpoint = ApiEndpoints.asset.sectionAssets(this.assetId);
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data.assetId = this.assetId;
    const dialog = this.dialog.open(SectionAssetFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
