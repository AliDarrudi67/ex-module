import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appDefaultImage]',
    standalone: true

})
export class DefaultImageDirective {
  private defaultImage: string = 'assets/img/default.jpg'; // مسیر عکس پیش‌فرض

  constructor(private el: ElementRef) {
    console.log('fdsgjhgjh');
    
  }

  @HostListener('error')
  onError() {
    const element: HTMLImageElement = this.el.nativeElement;
    element.src = this.defaultImage;
  }
}
