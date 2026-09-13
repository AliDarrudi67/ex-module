import { Routes } from '@angular/router';
import { MenuContainerComponent } from '@shared/components/menu-container/menu-container.component';
import { PolicyContainerComponent } from '../dashboard/policy/policy-container/policy-container.component';

export const policyRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuContainerComponent,
        data: { breadcrumb: { label: 'policy' } },
      },
      {
        path: 'policy-deposit',
        component: PolicyContainerComponent,
      },
      {
        path: 'policy-withdraw-standard',
        component: PolicyContainerComponent,
      },
      {
        path: 'policy-withdraw-sc',
        component: PolicyContainerComponent,
      },
    ],
  },
];
