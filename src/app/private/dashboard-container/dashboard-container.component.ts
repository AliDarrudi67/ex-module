import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../dashboard/layout/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../dashboard/layout/header/header.component';
import { SidebarComponent } from '../dashboard/layout/sidebar/sidebar.component';
@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    RouterOutlet,
    BreadcrumbComponent,
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss',
})
export class DashboardContainerComponent {
  sidebarOpen = false;
  isMobile = false;
  sidebarMode = 'max';
  floatedSidebar = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 992;
      this.sidebarOpen = !this.isMobile;
      this.floatedSidebar = this.isMobile;
    }
  }

  changeSidebarMode($event: string) {
    this.sidebarOpen = $event == 'open';
  }

  floatSidebar(event: boolean) {
    this.sidebarOpen = !event;
    this.floatedSidebar = !event;
    this.changeSidebarMode(this.floatedSidebar ? 'close' : 'open');
  }
}
