import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MainService } from '@core/services/main.service';
import { LucideAngularModule } from 'lucide-angular';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input() arrowSize = 40;
  @Input() itemsCount = 0;
  @Input() slidesPerView = 10;
  @Input() breakpoints: any;

  @ViewChild('swiper') swiperEL!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  swiper!: Swiper;
  activeIndex = 0;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const defaultBreakpoints = {
      0: { slidesPerView: 1 },
      991: { slidesPerView: 2 },
      1024: { slidesPerView: this.slidesPerView },
    };

    this.swiper = new Swiper(this.swiperEL.nativeElement, {
      modules: [Navigation],
      slidesPerView: this.slidesPerView,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: this.nextBtn.nativeElement,
        prevEl: this.prevBtn.nativeElement,
      },
      breakpoints: this.breakpoints || defaultBreakpoints,
    });
  }
}
