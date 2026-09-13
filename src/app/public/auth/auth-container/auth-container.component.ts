import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangeModeComponent } from '@shared/components/change-mode/change-mode.component';
import { IconSupportComponent } from '@shared/components/icons/icon-support/icon-support.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [
    RouterModule,
    IconSupportComponent,
    LucideAngularModule,
    ChangeModeComponent,
  ],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss',
})
export class AuthContainerComponent {}
