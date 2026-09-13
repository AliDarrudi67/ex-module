import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-change-mode',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './change-mode.component.html',
  styleUrl: './change-mode.component.scss'
})
export class ChangeModeComponent {
 constructor(@Inject(DOCUMENT) private document: Document) {}

  changeMode(mode: 'light' | 'dark') {
    const html = this.document.documentElement;
    console.log('Changing theme to', mode); // 👈 تست کن ببینی فراخوانی میشه یا نه

    if (mode === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }
}
