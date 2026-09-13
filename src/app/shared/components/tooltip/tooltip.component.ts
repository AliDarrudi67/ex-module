import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
@Input() text='';
  @Input() position: 'above' | 'below' | 'left' | 'right' = 'above';

}
