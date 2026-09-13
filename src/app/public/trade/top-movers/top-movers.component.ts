import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SliderComponent } from '@shared/components/slider/slider.component';

@Component({
  selector: 'app-top-movers',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './top-movers.component.html',
  styleUrl: './top-movers.component.scss',
})
export class TopMoversComponent {
  topMovers: any[] = [
    'All',
    'Change',
    'New High/Low',
    'Fluctuation',
    'All',
    'Change',
    'New High/Low',
    'Fluctuation',
  ];
}
