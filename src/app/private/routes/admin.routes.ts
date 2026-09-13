import { Routes } from '@angular/router';
import { EmailConfigComponent } from '@private/dashboard/admin/email-config/email-config.component';
import { EmailDeclareComponent } from '@private/dashboard/admin/email-declare/email-declare.component';
import { MenuContainerComponent } from '@shared/components/menu-container/menu-container.component';
import { AccountFormComponent } from '../dashboard/admin/account-level/account-form/account-form.component';
import { AccountLevelComponent } from '../dashboard/admin/account-level/account-level.component';
import { BaseCurrencyComponent } from '../dashboard/admin/account-level/currency-pair/base-currency/base-currency.component';
import { CurrencyPairComponent } from '../dashboard/admin/account-level/currency-pair/currency-pair.component';
import { VersionComponent } from '../dashboard/admin/account-level/currency-pair/version/version.component';
import { RoleSettingComponent } from '../dashboard/admin/role-setting/role-setting.component';
import { SmtpComponent } from '../dashboard/admin/smtp/smtp.component';
import { SpeedComponent } from '../dashboard/admin/speed/speed.component';
import { UsersComponent } from '../dashboard/admin/users/users.component';
import { PolicyContainerComponent } from '../dashboard/policy/policy-container/policy-container.component';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuContainerComponent,
        data: { breadcrumb: { label: 'admin' } },
      },
      {
        path: 'smtp',
        component: SmtpComponent,
      },
      {
        path: 'account-level',
        component: AccountLevelComponent,
      },
      {
        path: 'account-level/new-account',
        component: AccountFormComponent,
      },
      {
        path: 'account-level/edit-account/:accountId',
        component: AccountFormComponent,
      },
      {
        path: 'account-level/:id/policy-deposit',
        component: PolicyContainerComponent,
      },
      {
        path: 'account-level/:id/policy-withdraw-standard',
        component: PolicyContainerComponent,
      },
      {
        path: 'account-level/:id/policy-withdraw-sc',
        component: PolicyContainerComponent,
      },
      {
        path: 'account-level/:id/currency-pair',
        component: CurrencyPairComponent,
      },
      {
        path: 'account-level/:id/currency-pair/:id/:to/version',
        component: VersionComponent,
      },
      {
        path: 'account-level/:id/currency-pair/:id/base-currency',
        component: BaseCurrencyComponent,
      },
      {
        path: 'speed',
        component: SpeedComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'role-setting',
        component: RoleSettingComponent,
      },
      {
        path: 'email-config',
        component: EmailConfigComponent,
      },
      {
        path: 'email-declare',
        component: EmailDeclareComponent,
      },
    ],
  },
];
