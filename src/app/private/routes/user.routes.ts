import { Routes } from '@angular/router';
import { MenuContainerComponent } from '@shared/components/menu-container/menu-container.component';
import { AccountsComponent } from '../dashboard/user/accounts/accounts.component';
import { EasyTradeComponent } from '../dashboard/user/easy-trade/easy-trade.component';
import { UserDepositComponent } from '../dashboard/user/user-deposit/user-deposit.component';
import { UserWithdrawComponent } from '../dashboard/user/user-withdraw/user-withdraw.component';

export const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuContainerComponent,
        data: { breadcrumb: { label: 'user' } },
      },
      {
        path: 'easy-trade',
        component: EasyTradeComponent,
      },
      {
        path: 'user-deposit',
        component: UserDepositComponent,
      },
      {
        path: 'user-withdraw',
        component: UserWithdrawComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
    ],
  },
];
