import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { GitWalletGridConfig } from '@core/config/grid/git-wallet.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGitWallet } from '@shared/models/account/account.model';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { GitWalletFormComponent } from './git-wallet-form/git-wallet-form.component';

@Component({
  selector: 'app-git-wallet',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './git-wallet.component.html',
  styleUrl: './git-wallet.component.scss',
})
export class GitWalletComponent {
  columns: IGridColumn[] = GitWalletGridConfig;
  listEndpoint = ApiEndpoints.gitWallet.pagination;
  deleteEndpoint = ApiEndpoints.gitWallet.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    const dialog = this.dialog.open(GitWalletFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(gitWallet: IGitWallet) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = gitWallet;
    const dialog = this.dialog.open(GitWalletFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
