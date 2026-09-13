import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MainService } from '@core/services/main.service';
import { ChangeModeComponent } from '@shared/components/change-mode/change-mode.component';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { USER_STATUS } from '@shared/enums/user-status';
import { INotificationDB } from '@shared/models/notification/notification.model';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    LucideAngularModule,
    ChangeModeComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  @Output() showSidebar = new EventEmitter<boolean>();
  notifications: INotificationDB['notifications']['value'][] = [];
  showDropdown = false;
  private broadcastChannel!: BroadcastChannel;

  constructor(
    private zone: NgZone,
    private mainService: MainService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ایجاد BroadcastChannel برای دریافت نوتیف‌ها از SW
    this.broadcastChannel = new BroadcastChannel('notifications');
    this.broadcastChannel.onmessage = (event) => {
      this.zone.run(() => {
        this.notifications.unshift(event.data);
      });
    };
  }

  ngOnDestroy(): void {
    this.broadcastChannel.close();
  }

  toggleNotifications() {
    this.showDropdown = !this.showDropdown;
  }

  clearNotifications() {
    this.notifications = [];
  }

  checkUserStatus() {
    const status = localStorage.getItem('statusActivity');
    if (status == USER_STATUS.CHANGE_PASSWORD)
      this.router.navigate(['/auth/change-password']);
    else if (status == USER_STATUS.PROFILE_INCOMPLETE)
      this.router.navigate(['/auth/profile']);
    else if (status == USER_STATUS.SET_PASSWORD)
      this.router.navigate(['/auth/change-password']);
  }

  logout() {
    this.mainService.logout();
  }

  toggleSidebar() {
    this.showSidebar.emit(true);
  }
}
