import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { GitWalletTransferGridConfig } from '@core/config/grid/git-wallet-transfer.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IDialog } from '@shared/models/dialog.model';
import { IGitWalletTransfer } from '@shared/models/git-wallet-transfer/git-wallet-transfer.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent {
  columns: IGridColumn[] = GitWalletTransferGridConfig;
  listEndpoint = ApiEndpoints.gitWalletTransfer.pagination;
  deleteEndpoint = ApiEndpoints.gitWalletTransfer.base;
  gitWalletId = '';
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute
  ) {
    this.gitWalletId = route.snapshot.params['gitWalletId'];
    this.listEndpoint += '/' + this.gitWalletId;
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    const dialog = this.dialog.open(TransferFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(gitWalletTransfer: IGitWalletTransfer) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = gitWalletTransfer;
    const dialog = this.dialog.open(TransferFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
