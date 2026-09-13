import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-angular18-project';
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    const html = this.document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (savedTheme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      // اگر چیزی ذخیره نشده بود، از تم سیستم استفاده کن
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    // ⚡ گوش دادن به تغییر تم سیستم در لحظه
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          if (e.matches) {
            html.classList.add('dark');
          } else {
            html.classList.remove('dark');
          }
        }
      });
  }
}
