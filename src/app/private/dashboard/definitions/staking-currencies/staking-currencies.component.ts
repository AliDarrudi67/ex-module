import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { StakingCurrencyGridConfig } from '@core/config/grid/staking-currency.config';
import { MainService } from '@core/services/main.service';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { StakingCurrencyFormComponent } from './staking-currency-form/staking-currency-form.component';

@Component({
  selector: 'app-staking-currencies',
  standalone: true,
  imports: [GridComponent, ButtonComponent, RouterModule],
  templateUrl: './staking-currencies.component.html',
  styleUrl: './staking-currencies.component.scss',
})
export class StakingCurrenciesComponent {
  columns: IGridColumn[] = StakingCurrencyGridConfig;

  data = [
    {
      id: 1,
      currency: 'BTC',
      periods: '',
    },
    {
      id: 2,
      currency: 'USDT',
      periods: '',
    },
    {
      id: 3,
      currency: 'ETH',
      periods: '',
    },
  ];

  constructor(private dialog: MatDialog, private mainService: MainService) {}

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = {};
    this.dialog.open(StakingCurrencyFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = data;
    this.dialog.open(StakingCurrencyFormComponent, dialogConfig);
  }
}
