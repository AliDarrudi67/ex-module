import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { SpeedGridConfig } from '@core/config/grid/speed.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { ISpeed } from '@shared/models/speed/speed.model';
import { CryptoSpeedFormComponent } from './crypto-speed-form/crypto-speed-form.component';

@Component({
  selector: 'app-crypto-speed',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './crypto-speed.component.html',
  styleUrl: './crypto-speed.component.scss',
})
export class CryptoSpeedComponent {
  columns: IGridColumn[] = SpeedGridConfig;
  listEndpoint = ApiEndpoints.speed.pagination;
  deleteEndpoint = ApiEndpoints.speed.base;
  assetId = '';
  cryptoId = '';
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private dialog: MatDialog,
    public mainService: MainService,
    private route: ActivatedRoute
  ) {
    this.assetId = route.snapshot.params['id'];
    this.cryptoId = route.snapshot.params['cryptoId'];
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = '';
    const dialog = this.dialog.open(CryptoSpeedFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(speed: ISpeed) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = speed?.speedId;
    const dialog = this.dialog.open(CryptoSpeedFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
