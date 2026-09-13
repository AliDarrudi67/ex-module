import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from '../dashboard-container/dashboard-container.component';
import { HomeComponent } from './home/home.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'no-permission',
        component: NoPermissionComponent,
      },
      {
        path: 'definitions',
        loadChildren: () =>
          import('../routes/definitions.routes').then(
            (r) => r.definitionsRoutes
          ),
        // canActivate: [RoleGuard],
        // data: { roles: ['admin'] },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../routes/admin.routes').then((r) => r.adminRoutes),
        // canActivate: [RoleGuard],
        // data: { roles: ['admin'] },
      },
      {
        path: 'policy',
        loadChildren: () =>
          import('../routes/policy.routes').then((r) => r.policyRoutes),
        // canActivate: [RoleGuard],
        // data: { roles: ['admin'] },
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../routes/user.routes').then((r) => r.userRoutes),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
