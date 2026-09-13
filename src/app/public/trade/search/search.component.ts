import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SliderComponent } from '@shared/components/slider/slider.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  cryptos: any[] = [
    'New',
    'USDC',
    'USDT',
    'FDUSD',
    'BNB',
    'New',
    'USDC',
    'USDT',
    'FDUSD',
    'BNB',
  ];
}
