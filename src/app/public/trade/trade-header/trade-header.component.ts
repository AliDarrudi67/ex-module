import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-trade-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './trade-header.component.html',
  styleUrl: './trade-header.component.scss',
})
export class TradeHeaderComponent {
  @Output() changeSidebar = new EventEmitter<boolean>();

  toggleSidebar() {
    this.changeSidebar.emit(true);
  }
}
