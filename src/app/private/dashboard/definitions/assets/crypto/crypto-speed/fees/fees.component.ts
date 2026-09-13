import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { FeesGridConfig } from '@core/config/grid/fees.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { FeeFormComponent } from './fee-form/fee-form.component';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss',
})
export class FeesComponent {
  columns: IGridColumn[] = FeesGridConfig;
  listEndpoint = '';
  deleteEndpoint = ApiEndpoints.fee.base;
  cryptoId = '';
  speedId = '';
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute
  ) {
    this.cryptoId = route.snapshot.params['cryptoId'];
    this.speedId = route.snapshot.params['speedId'];
    this.listEndpoint = ApiEndpoints.crypto.fees(this.cryptoId, this.speedId);
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {
      speedId: this.speedId,
      cryptoId: this.cryptoId,
    };
    const dialog = this.dialog.open(FeeFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(fee: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = fee?.feeId;
    const dialog = this.dialog.open(FeeFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload)
          if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
