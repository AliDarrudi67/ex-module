import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trade-chart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trade-chart.component.html',
  styleUrl: './trade-chart.component.scss',
})
export class TradeChartComponent {
  networks: any[] = ['Network A', 'Network B', 'Network C'];
  selectedNetwork = this.networks[0];
}
