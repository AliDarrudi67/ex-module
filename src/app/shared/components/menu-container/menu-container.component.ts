import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MainService } from '@core/services/main.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-menu-container',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './menu-container.component.html',
  styleUrl: './menu-container.component.scss',
})
export class MenuContainerComponent {
  menuItems: any[] = [];

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const sidebarItems = this.mainService.sidebarItems || [];
    const items = sidebarItems.find(
      (item) => item.slug === this.route.snapshot.data['breadcrumb']?.label
    );

    if (items && items.children) {
      this.menuItems = items.children;
    }
  }
}
