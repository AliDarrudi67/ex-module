import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { AddressWalletGridConfig } from '@core/config/grid/address-wallet.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IAddressWallet } from '@shared/models/address-wallet/address-wallet.model';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { AddressWalletFormComponent } from './address-wallet-form/address-wallet-form.component';
import { EvmListComponent } from './evm-list/evm-list.component';

@Component({
  selector: 'app-address-wallet',
  standalone: true,
  imports: [EvmListComponent, GridComponent, CommonModule],
  templateUrl: './address-wallet.component.html',
  styleUrl: './address-wallet.component.scss',
})
export class AddressWalletComponent {
  columns: IGridColumn[] = AddressWalletGridConfig;
  listEndpoint = ApiEndpoints.addressWallet.pagination;
  evmId = '';
  filter: any;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = { evmId: this.evmId };
    const dialog = this.dialog.open(AddressWalletFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  editRecord(addressWallet: IAddressWallet) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = addressWallet;
    const dialog = this.dialog.open(AddressWalletFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }

  setEvmId(evmId: string) {
    this.evmId = evmId;
    this.filter = {};
    if (evmId !== 'all') {
      this.filter = {
        evmId,
      };
    }
  }
}
