import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ProfileComponent } from './public/profile/profile.component';
import { TradeComponent } from './public/trade/trade.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./public/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./private/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
    // data: { role: 'admin' },
  },
  {
    path: 'trade',
    component: TradeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
