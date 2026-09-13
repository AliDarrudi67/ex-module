import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent {}
