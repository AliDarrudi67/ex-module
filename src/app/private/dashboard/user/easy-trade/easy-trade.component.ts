import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { IconArrowDownGrayComponent } from '@shared/components/icons/icon-arrow-down-gray/icon-arrow-down-gray.component';
import { IconArrowDownComponent } from '@shared/components/icons/icon-arrow-down/icon-arrow-down.component';
import { IconBtcComponent } from '@shared/components/icons/icon-btc/icon-btc.component';
import { IconChartComponent } from '@shared/components/icons/icon-chart/icon-chart.component';
import { IconSwapComponent } from '@shared/components/icons/icon-swap/icon-swap.component';
import { IconTeterComponent } from '@shared/components/icons/icon-teter/icon-teter.component';
import { IconTomanComponent } from '@shared/components/icons/icon-toman/icon-toman.component';
import { SelectCurrencyComponent } from '@shared/components/select-currency/select-currency.component';
import { NumericOnlyDirective } from '@shared/directives/numeric-only.directive';
import { LucideAngularModule } from 'lucide-angular';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-easy-trade',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    IconTomanComponent,
    IconArrowDownComponent,
    IconBtcComponent,
    IconTeterComponent,
    IconArrowDownGrayComponent,
    IconSwapComponent,
    NumericOnlyDirective,
    FormsModule,
    ButtonComponent,
    LucideAngularModule,
    IconChartComponent,
    FaqComponent,
  ],
  templateUrl: './easy-trade.component.html',
  styleUrl: './easy-trade.component.scss',
})
export class EasyTradeComponent {
  method = 'buy';
  price!: number;

  constructor(private dialog: MatDialog) {}

  changeMethod(method: string) {
    this.method = method;
  }

  showCurrencies() {
    this.dialog.open(SelectCurrencyComponent);
  }
}
