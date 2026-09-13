import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-select-currency',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SliderComponent],
  templateUrl: './select-currency.component.html',
  styleUrl: './select-currency.component.scss',
})
export class SelectCurrencyComponent {
  currencies: any[] = [
    {
      title: 'Ethereum',
      icon: 'dollar.png',
    },
    {
      title: 'USDT',
      icon: 'dollar.png',
    },
    {
      title: 'USDC',
      icon: 'dollar.png',
    },
    {
      title: 'USDC',
      icon: 'dollar.png',
    },
    {
      title: 'USDT',
      icon: 'dollar.png',
    },
    {
      title: 'USDC',
      icon: 'dollar.png',
    },
    {
      title: 'USDT',
      icon: 'dollar.png',
    },
    {
      title: 'USDC',
      icon: 'dollar.png',
    },
    {
      title: 'USDT',
      icon: 'dollar.png',
    },
    {
      title: 'USDC',
      icon: 'dollar.png',
    },
  ];

  breakpoints = {
    0: { slidesPerView: 1 },
    767: { slidesPerView: 3 },
  };

  constructor(private matDialogRef: MatDialogRef<SelectCurrencyComponent>) {}
}
