import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { WithdrawGridConfig } from '@core/config/grid/withdraw.config';
import { GridComponent } from '@shared/components/grid/grid.component';
import { IconArrowDownComponent } from '@shared/components/icons/icon-arrow-down/icon-arrow-down.component';
import { IconArrowLeftGreenComponent } from '@shared/components/icons/icon-arrow-left-green/icon-arrow-left-green.component';
import { IconHistoryComponent } from '@shared/components/icons/icon-history/icon-history.component';
import { SliderComponent } from '@shared/components/slider/slider.component';
import { IGridColumn } from '@shared/models/grid-columns.model';
import { LucideAngularModule } from 'lucide-angular';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-user-deposit',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FaqComponent,
    IconArrowDownComponent,
    MatFormFieldModule,
    MatSelectModule,
    IconHistoryComponent,
    GridComponent,
    IconArrowLeftGreenComponent,
    SliderComponent,
  ],
  templateUrl: './user-deposit.component.html',
  styleUrl: './user-deposit.component.scss',
})
export class UserDepositComponent {
  cryptos: any[] = [
    'BTC',
    'ETH',
    'TRX',
    'USDT',
    'BTC',
    'ETH',
    'TRX',
    'USDT',
    'BTC',
    'ETH',
    'TRX',
    'USDT',
  ];
  networks = ['TRC20', 'ERC20', 'BEP20'];
  walletAddress = 'TSD89n23k1n4n5k2n13nk423nk4n21n4k21';
  columns: IGridColumn[] = WithdrawGridConfig;
}
