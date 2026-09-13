import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MainService } from '@core/services/main.service';
import { IconCloseComponent } from '@shared/components/icons/icon-close/icon-close.component';
import { ISidebarNode } from '@shared/models/general/sidebar-node.model';
import { LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconCloseComponent,
    LucideAngularModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentUrl = '';
  sidebarModeVar = 'open';
  @Output() hideSidebar = new EventEmitter<boolean>();
  @Output() sidebarMode = new EventEmitter<string>();
  @Input() sidebarOpen = true;
  @Output() showSidebar = new EventEmitter<boolean>();
  @Input() showInTrade = false;

  public sidebarItems: ISidebarNode[] = [
    {
      title: 'مدیریت تعاریف',
      slug: 'definitions',
      icon: 'info',
      children: [
        {
          title: 'نقش‌ها',
          route: '/dashboard/definitions/roles',
          icon: 'shield-user',
        },
        {
          title: 'نقش عملیاتی',
          route: '/dashboard/definitions/action-roles',
          icon: 'shield-user',
        },
        {
          title: 'ماشین مجازی',
          route: '/dashboard/definitions/evm',
          icon: 'computer',
        },
        {
          title: 'دارایی ها (assets)',
          route: '/dashboard/definitions/assets',
          icon: 'folder',
        },
        {
          title: 'گروه دارایی (groupAsset)',
          route: '/dashboard/definitions/group-asset',
          icon: 'folder',
        },
        {
          title: 'مدیریت مسیرها',
          route: '/dashboard/definitions/route-manager',
          icon: 'route',
        },
        {
          title: 'منوها',
          route: '/dashboard/definitions/menus',
          icon: 'menu',
        },
        {
          title: 'ارزهای staking',
          route: '/dashboard/definitions/staking-currencies',
          icon: 'bitcoin',
        },
        {
          title: 'مخزن حسابها',
          route: '/dashboard/definitions/git-wallet',
          icon: 'folder-git',
        },
        {
          title: 'Address Wallet',
          route: '/dashboard/definitions/address-wallet',
          icon: 'wallet',
        },
      ],
    },
    {
      title: 'ادمین',
      icon: 'user-star',
      slug: 'admin',
      children: [
        {
          title: 'smtp',
          route: '/dashboard/admin/smtp',
          icon: 'mail',
        },
        {
          title: 'سطوح کاربری',
          route: '/dashboard/admin/account-level',
          icon: 'shield',
        },
        {
          title: 'سرعت',
          route: '/dashboard/admin/speed',
          icon: 'gauge',
        },
        {
          title: 'لیست کاربران',
          route: '/dashboard/admin/users',
          icon: 'users',
        },
        {
          title: 'تنظیمات نقش',
          route: '/dashboard/admin/role-setting',
          icon: 'user-cog',
        },
        {
          title: 'تنظیمات ایمیل',
          route: '/dashboard/admin/email-config',
          icon: 'settings',
        },
        {
          title: 'ثبت ایمیل',
          route: '/dashboard/admin/email-declare',
          icon: 'mail',
        },
      ],
    },
    {
      title: 'پالیسی',
      slug: 'policy',
      icon: 'ruler',
      children: [
        {
          title: 'Deposit',
          route: '/dashboard/policy/policy-deposit',
          icon: 'credit-card',
        },
        {
          title: 'Withdraw Standart',
          route: '/dashboard/policy/policy-withdraw-standard',
          icon: 'download',
        },
        {
          title: 'Withdraw SC',
          route: '/dashboard/policy/policy-withdraw-sc',
          icon: 'award',
        },
      ],
    },
    {
      title: 'کاربر',
      icon: 'circle-user',
      slug: 'user',
      children: [
        {
          title: 'Trade',
          route: '/trade',
          icon: 'chart-no-axes-column-increasing', // معاملات و تحلیل
        },
        {
          title: 'خرید آسان',
          route: '/dashboard/user/easy-trade',
          icon: 'shopping-cart', // خرید ساده
        },
        {
          title: 'برداشت',
          route: '/dashboard/user/user-withdraw',
          icon: 'arrow-down', // برداشت
        },
        {
          title: 'واریز رمز ارزی',
          route: '/dashboard/user/user-deposit',
          icon: 'arrow-up', // واریز
        },
        {
          title: 'دارایی ها',
          route: '/dashboard/user/accounts',
          icon: 'dollar-sign', // موجودی و دارایی
        },
      ],
    },
  ];

  constructor(private router: Router, private mainService: MainService) {
    mainService.sidebarItems = this.sidebarItems;
  }

  ngOnInit() {
    // 🔹 مرحله 1: فیلتر منوها بر اساس نقش
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userRoles: string[] =
          decoded.roles?.map((r: any) => r.slug) || [];
        this.sidebarItems = this.filterSidebarItems(userRoles);
      } catch (e) {
        console.error('Token decode failed', e);
      }
    }

    // در زمان بارگذاری صفحه:
    this.checkActiveRoute(this.router.url);

    // در زمان تغییر مسیر:
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        if (typeof window !== 'undefined') {
          if (window.innerWidth < 992) this.hideSidebarMenu();
        }
        this.checkActiveRoute(event.urlAfterRedirects);
      });
  }

  // 🎯 فیلتر بر اساس نقش
  private filterSidebarItems(userRoles: string[]): ISidebarNode[] {
    const roleMap: Record<string, string[]> = {
      admin: ['admin', 'report', 'definitions', 'user', 'policy'],
      user: ['admin', 'report', 'definitions', 'user', 'policy'],
      // user: ['user'],
    };

    // فرض: اگر چند نقش داشته باشه، همه‌ی دسترسی‌هاش جمع زده می‌شن
    const allowedSlugs = new Set<string>();
    userRoles.forEach((role) => {
      (roleMap[role] || []).forEach((slug) => allowedSlugs.add(slug));
    });

    return this.sidebarItems.filter(
      (item) => !item.slug || allowedSlugs.has(item.slug)
    );
  }

  toggle(item: ISidebarNode) {
    this.sidebarItems.forEach((menu) => {
      if (menu !== item) {
        menu.open = false;
      }
    });
    item.open = !item.open;
  }

  private checkActiveRoute(currentUrl: string) {
    this.sidebarItems.forEach((item) => {
      if (
        item.children &&
        item.children.some((child: ISidebarNode) =>
          currentUrl.startsWith(child.route!!)
        )
      ) {
        item.open = true;
      } else {
        item.open = false;
      }
    });
  }

  hideSidebarMenu() {
    this.hideSidebar.emit(true);
  }

  changeSidebar(mode: string) {
    this.sidebarOpen = true;
    this.sidebarMode.emit(mode);
  }

  toggleSidebar() {
    this.showSidebar.emit(!this.sidebarOpen);
  }
}
