import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-trade-panel',
  standalone: true,
  imports: [MatTabsModule,MatCheckboxModule],
  templateUrl: './trade-panel.component.html',
  styleUrl: './trade-panel.component.scss'
})
export class TradePanelComponent {

}
