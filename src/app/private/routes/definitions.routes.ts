import { Routes } from '@angular/router';
import { MenuContainerComponent } from '@shared/components/menu-container/menu-container.component';
import { ActionRoleComponent } from '../dashboard/definitions/action-role/action-role.component';
import { AddressWalletComponent } from '../dashboard/definitions/address-wallet/address-wallet.component';
import { AssetsComponent } from '../dashboard/definitions/assets/assets.component';
import { CryptoFormComponent } from '../dashboard/definitions/assets/crypto/crypto-form/crypto-form.component';
import { CryptoSpeedComponent } from '../dashboard/definitions/assets/crypto/crypto-speed/crypto-speed.component';
import { FeesComponent } from '../dashboard/definitions/assets/crypto/crypto-speed/fees/fees.component';
import { CryptoComponent } from '../dashboard/definitions/assets/crypto/crypto.component';
import { SectionAssetComponent } from '../dashboard/definitions/assets/section-asset/section-asset.component';
import { ArchitectureComponent } from '../dashboard/definitions/evm/architecture/architecture.component';
import { BlockchainComponent } from '../dashboard/definitions/evm/blockchain/blockchain.component';
import { EvmComponent } from '../dashboard/definitions/evm/evm.component';
import { GitAssetWalletComponent } from '../dashboard/definitions/git-wallet/git-asset-wallet/git-asset-wallet.component';
import { GitWalletComponent } from '../dashboard/definitions/git-wallet/git-wallet.component';
import { TransferComponent } from '../dashboard/definitions/git-wallet/transfer/transfer.component';
import { GroupAssetComponent } from '../dashboard/definitions/group-asset/group-asset.component';
import { MenuComponent } from '../dashboard/definitions/menu/menu.component';
import { SubMenuComponent } from '../dashboard/definitions/menu/sub-menu/sub-menu.component';
import { RoleActionsComponent } from '../dashboard/definitions/roles/role-actions/role-actions.component';
import { RolesComponent } from '../dashboard/definitions/roles/roles.component';
import { RouteManagerComponent } from '../dashboard/definitions/route-manager/route-manager.component';
import { PeriodsComponent } from '../dashboard/definitions/staking-currencies/periods/periods.component';
import { StakingCurrenciesComponent } from '../dashboard/definitions/staking-currencies/staking-currencies.component';

export const definitionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuContainerComponent,
        data: { breadcrumb: { label: 'definitions' } },
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'roles/:roleId/action-roles',
        component: RoleActionsComponent,
      },
      {
        path: 'action-roles',
        component: ActionRoleComponent,
      },
      {
        path: 'evm',
        component: EvmComponent,
      },
      { path: 'evm/:evmId/blockchain', component: BlockchainComponent },
      {
        path: 'evm/:evmId/blockchain/:blockchainId/architecture',
        component: ArchitectureComponent,
      },
      { path: 'assets', component: AssetsComponent },
      { path: 'assets/:id/crypto', component: CryptoComponent },
      { path: 'assets/:id/crypto/new-crypto', component: CryptoFormComponent },
      {
        path: 'assets/:id/crypto/edit-crypto/:cryptoId',
        component: CryptoFormComponent,
      },
      {
        path: 'assets/:id/crypto/:cryptoId/speed',
        component: CryptoSpeedComponent,
      },
      {
        path: 'assets/:id/crypto/:cryptoId/speed/:speedId/fees',
        component: FeesComponent,
      },
      { path: 'assets/:id/section-asset', component: SectionAssetComponent },
      { path: 'route-manager', component: RouteManagerComponent },
      { path: 'menus', component: MenuComponent },
      { path: 'menus/:id/sub-menu', component: SubMenuComponent },
      { path: 'group-asset', component: GroupAssetComponent },
      { path: 'staking-currencies', component: StakingCurrenciesComponent },
      { path: 'staking-currencies/:id/periods', component: PeriodsComponent },
      { path: 'git-wallet', component: GitWalletComponent },
      {
        path: 'git-wallet/:gitWalletId/transfer',
        component: TransferComponent,
      },
      {
        path: 'git-wallet/:gitWalletId/git-asset-wallet',
        component: GitAssetWalletComponent,
      },
      { path: 'address-wallet', component: AddressWalletComponent },
    ],
  },
];
