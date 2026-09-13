import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PolicyGridConfig } from '@core/config/grid/policy.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { PolicyFormComponent } from '../policy-form/policy-form.component';

@Component({
  selector: 'app-policy-container',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './policy-container.component.html',
  styleUrl: './policy-container.component.scss',
})
export class PolicyContainerComponent {
  columns: IGridColumn[] = PolicyGridConfig;

  data = [
    {
      id: 1,
      asset: 'BTC',
      network: 'Bitcoin',
      minDeposit: '0.0005 BTC',
      networkFee: '0.0001 BTC',
      minBalance: '0.0002 BTC',
      speed: 'High',
    },
    {
      id: 2,
      asset: 'ETH',
      network: 'Ethereum',
      minDeposit: '0.01 ETH',
      networkFee: '0.001 ETH',
      minBalance: '0.005 ETH',
      speed: 'Medium',
    },
    {
      id: 3,
      asset: 'USDT',
      network: 'TRC20',
      minDeposit: '10 USDT',
      networkFee: '1 USDT',
      minBalance: '5 USDT',
      speed: 'High',
    },
    {
      id: 4,
      asset: 'BNB',
      network: 'BSC',
      minDeposit: '0.05 BNB',
      networkFee: '0.0005 BNB',
      minBalance: '0.02 BNB',
      speed: 'High',
    },
    {
      id: 5,
      asset: 'ADA',
      network: 'Cardano',
      minDeposit: '5 ADA',
      networkFee: '0.3 ADA',
      minBalance: '2 ADA',
      speed: 'Medium',
    },
  ];

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute
  ) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(PolicyFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(PolicyFormComponent, dialogConfig);
  }
}
