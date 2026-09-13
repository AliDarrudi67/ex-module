import { Component } from '@angular/core';
import { IconInfoComponent } from '@shared/components/icons/icon-info/icon-info.component';

@Component({
  selector: 'app-help-box',
  standalone: true,
  imports: [IconInfoComponent],
  templateUrl: './help-box.component.html',
  styleUrl: './help-box.component.scss',
})
export class HelpBoxComponent {}
