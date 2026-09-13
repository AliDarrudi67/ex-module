import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { SidebarComponent } from '../../private/dashboard/layout/sidebar/sidebar.component';
import { MarketTradesComponent } from './market-trades/market-trades.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';
import { TopMoversComponent } from './top-movers/top-movers.component';
import { TradeChartComponent } from './trade-chart/trade-chart.component';
import { TradeHeaderComponent } from './trade-header/trade-header.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    TradeHeaderComponent,
    OrderBookComponent,
    TradeChartComponent,
    TradePanelComponent,
    SearchComponent,
    MarketTradesComponent,
    TopMoversComponent,
    OrdersComponent,
    SidebarComponent,
  ],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss',
})
export class TradeComponent {
  isMobileWidth = false;
  showSidebar = false;
  mobileTabs = [
    { key: 'chart', label: 'Chart' },
    { key: 'orderBook', label: 'Order Book' },
    { key: 'search', label: 'Search' },
    { key: 'market', label: 'Market' },
    { key: 'topMover', label: 'Top Mover' },
  ];

  activeTab: string = 'chart';

  constructor() {
    this.checkWidth();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }

  checkWidth() {
    this.isMobileWidth = window.innerWidth < 1024; // زیر lg
  }

  selectTab(key: string) {
    this.activeTab = key;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
