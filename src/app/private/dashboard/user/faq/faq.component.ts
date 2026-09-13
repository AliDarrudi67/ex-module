import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule,CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  @Input() short=false
  items = [
    { title: 'سفارش آنی', content: 'اینجا محتوای سفارش آنی قرار می‌گیرد.' },
    { title: 'سفارش آنی', content: 'اینجا محتوای سفارش آنی قرار می‌گیرد.' },
    { title: 'پشتیبانی', content: 'اینجا محتوای بخش پشتیبانی قرار می‌گیرد.' },
  ];
}
