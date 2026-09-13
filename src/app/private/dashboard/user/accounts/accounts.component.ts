import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { AccountGridConfig } from '@core/config/grid/account.config';
import { MainService } from '@core/services/main.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IAccount } from '@shared/models/account/account.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { AccountDetailsComponent } from './account-details/account-details.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [GridComponent, ButtonComponent, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent extends BaseComponent {
  columns: IGridColumn[] = AccountGridConfig;
  listEndpoint = ApiEndpoints.account.pagination;
  deleteEndpoint = ApiEndpoints.account.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {
    super();
  }

  activeAccount(account: IAccount) {
    if (account?.accountId) {
      const dialogConfig = this.mainService.defaultDialogConfig;
      dialogConfig.data = account?.gitWallets;
      this.dialog.open(AccountDetailsComponent, dialogConfig);
    } else {
      const data = { assetId: account?.infoAsset?.assetId };
      this.mainService
        .post(ApiEndpoints.account.base, data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.gridComponent.loadData();
          },
        });
    }
  }
}
