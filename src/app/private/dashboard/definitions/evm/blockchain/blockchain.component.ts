import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiEndpoints } from '@core/config/apiEndpoints';
import { BlockchainGridConfig } from '@core/config/grid/blockchain.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IChain } from '@shared/models/chain/chain.model';
import { IDialogConfig } from '@shared/models/dialog-config.model';
import { IDialog } from '@shared/models/dialog.model';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { BlockchainFormComponent } from './blockchain-form/blockchain-form.component';

@Component({
  selector: 'app-blockchain',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './blockchain.component.html',
  styleUrl: './blockchain.component.scss',
})
export class BlockchainComponent implements OnInit {
  columns: IGridColumn[] = BlockchainGridConfig;
  evmId = '';
  listEndpoint = '';
  deleteEndpoint = ApiEndpoints.blockchain.base;
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.evmId = this.route.snapshot.params['evmId'];
    this.listEndpoint = ApiEndpoints.evm.chains(this.evmId);
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = { evmId: this.evmId };
    this.openChainForm(dialogConfig);
  }

  editRecord(blockchain: IChain) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    blockchain.evmId = this.evmId;
    dialogConfig.data = blockchain;
    this.openChainForm(dialogConfig);
  }

  openChainForm(dialogConfig: IDialogConfig) {
    const dialog = this.dialog.open(BlockchainFormComponent, dialogConfig);
    dialog.afterClosed().subscribe({
      next: (response: IDialog) => {
        if (response?.reload) this.gridComponent.loadData();
      },
    });
  }
}
