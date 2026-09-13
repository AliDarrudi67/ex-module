import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MainService } from '../services/main.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private mainService: MainService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('jwt')!!;

    const decodedToken = this.mainService.decodeJwtPayload(token);
    const userRoles: string[] =
      decodedToken?.roles?.map((r: any) => r.slug) || [];
    const allowedRoles: string[] = route.data?.['roles'] || [];

    // اگه روت نقش خاصی نخواد → همه مجازن
    if (allowedRoles.length === 0) return true;

    // بررسی اینکه آیا کاربر یکی از نقش‌های مجاز رو داره یا نه
    const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      this.router.navigate(['/dashboard/no-permission']);
    }

    return hasAccess;
  }
}
