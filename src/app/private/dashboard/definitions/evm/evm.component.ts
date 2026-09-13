import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { EvmGridConfig } from '@core/config/grid/evm.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IEvm } from '@shared/models/evm/evm.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { EvmFormComponent } from './evm-form/evm-form.component';
@Component({
  selector: 'app-evm',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './evm.component.html',
  styleUrl: './evm.component.scss',
})
export class EvmComponent {
  columns: IGridColumn[] = EvmGridConfig;
  listEndpoint = ApiEndpoints.evm.pagination;
  deleteEndpoint = ApiEndpoints.evm.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private mainService: MainService
  ) {}

  ngOnInit(): void {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = '';
    const dialog = this.dialog.open(EvmFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(evm: IEvm) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = evm?.evmId;
    const dialog = this.dialog.open(EvmFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
