import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseCurrencyGridConfig } from '@core/config/grid/base-currency.config';
import { MainService } from '@core/services/main.service';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { BaseCurrencyFormComponent } from './base-currency-form/base-currency-form.component';

@Component({
  selector: 'app-base-currency',
  standalone: true,
  imports: [GridComponent, RouterModule],
  templateUrl: './base-currency.component.html',
  styleUrl: './base-currency.component.scss',
})
export class BaseCurrencyComponent {
  toCurrency = '';
  columns: IGridColumn[] = BaseCurrencyGridConfig;
  data = [
    {
      id: 1,
      from: 'USD',
      to: 'EUR',
      makerFee: 0.1,
      takerFee: 0.2,
      feeCurrency: 'USD',
      minTrade: 10,
    },
    {
      id: 2,
      from: 'EUR',
      to: 'GBP',
      makerFee: 0.15,
      takerFee: 0.25,
      feeCurrency: 'EUR',
      minTrade: 20,
    },
    {
      id: 3,
      from: 'BTC',
      to: 'USD',
      makerFee: 0.05,
      takerFee: 0.1,
      feeCurrency: 'BTC',
      minTrade: 0.001,
    },
    {
      id: 4,
      from: 'ETH',
      to: 'BTC',
      makerFee: 0.05,
      takerFee: 0.1,
      feeCurrency: 'ETH',
      minTrade: 0.01,
    },
    {
      id: 5,
      from: 'USDT',
      to: 'USD',
      makerFee: 0.1,
      takerFee: 0.2,
      feeCurrency: 'USDT',
      minTrade: 5,
    },
  ];

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute
  ) {
    this.toCurrency = route.snapshot.params['to'];
  }

  addNewRecord() {
    const dialogConfig = this.mainService.defaultDialogConfig;
    dialogConfig.data = { toCurrency: this.toCurrency };
    this.dialog.open(BaseCurrencyFormComponent, dialogConfig);
  }

  editRecord(data: any) {
    const dialogConfig = this.mainService.defaultDialogConfig;
    data.toCurrency = this.toCurrency;
    dialogConfig.data = data;
    this.dialog.open(BaseCurrencyFormComponent, dialogConfig);
  }
}
