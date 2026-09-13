import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { LucideAngularModule } from 'lucide-angular';
import { IconGoogleComponent } from '../../icons/icon-google/icon-google.component';
import { IconLoadingComponent } from '../../icons/icon-loading/icon-loading.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    IconGoogleComponent,
    MatStepperModule,
    LucideAngularModule,
    IconLoadingComponent,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnChanges {
  @Input() title = 'ثبت';
  @Input() icon = '';
  @Input() classList = '';
  @Input() action = 'submit';
  @Input() disabled = false;
  @Input() matStepperNext = false;
  @Input() matStepperPrevious = false;
  @Input() loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] && changes['loading'].currentValue) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
}
