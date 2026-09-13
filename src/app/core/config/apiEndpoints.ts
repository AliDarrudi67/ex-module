export const ApiEndpoints = {
  user: {
    checkReferal: (referralCode: string) => `user/referral/${referralCode}`,
    nonce: 'wallet/nonce',
    walletAuthenticate: 'user/wallet/authenticate',
    setRole: 'user/set-role',
    byId: (userId: string) => `evm/${userId}`,
    base: 'user',
    web2Authenticate: 'user/web2/authenticate',
    changeAuthorization: 'user/change-authorization',
    profile: 'user/Profile',
  },
  google: {
    signup: 'google/signup',
    signin: 'google/signin',
    authenticate: 'google/authenticate',
  },
  evm: {
    base: 'evm',
    byId: (evmId: string) => `evm/${evmId}`,
    chains: (evmId: string) => `evm/pagination/chains/${evmId}`,
    pagination: 'evm/pagination',
  },
  blockchain: {
    base: 'chain',
    byId: (chainId: string) => `chain/${chainId}`,
    architectures: (chainId: string) => `chain/pagination/archs/${chainId}`,
    pagination: 'chain/pagination/chain',
  },
  architecture: {
    base: 'arch',
    byId: (architectureId: string) => `arch/${architectureId}`,
  },
  gitWallet: {
    base: 'git-wallet',
    byId: (gitWalletId: string) => `git-wallet/${gitWalletId}`,
    pagination: 'git-wallet/pagination',
  },
  role: {
    base: 'role',
    byId: (roleId: string) => `role/${roleId}`,
    pagination: 'role/pagination',
  },
  actionRole: {
    base: 'action-role',
    byId: (actionRoleId: string) => `action-role/${actionRoleId}`,
    pagination: 'action-role/pagination',
  },
  roleAction: {
    base: 'role-action',
    byId: (roleActionId: string) => `role-action/${roleActionId}`,
    pagination: 'role-action/pagination',
  },
  asset: {
    base: 'asset',
    byId: (assetId: string) => `asset/${assetId}`,
    pagination: 'asset/pagination',
    sectionAssets: (assetId: string) =>
      `asset/pagination/sectionsAsset/${assetId}`,
    cryptos: (assetId: string) => `asset/pagination/cryptos/${assetId}`,
  },
  groupAsset: {
    base: 'group-asset',
    byId: (groupAssetId: string) => `group-asset/${groupAssetId}`,
    pagination: 'group-asset/pagination',
  },
  sectionAsset: {
    base: 'section-asset',
    byId: (sectionAssetId: string) => `section-asset/${sectionAssetId}`,
  },
  crypto: {
    base: 'crypto',
    byId: (cryptoId: string) => `crypto/${cryptoId}`,
    fees: (cryptoId: string, speedId: string) =>
      `crypto/pagination/fee-withdraw/${cryptoId}/${speedId}`,
  },
  addressWallet: {
    base: 'address-wallet',
    byId: (addressWalletId: string) => `address-wallet/${addressWalletId}`,
    pagination: 'address-wallet/pagination',
  },
  gitWalletTransfer: {
    base: 'git-wallet-transfer',
    byId: (gitWalletTransferId: string) =>
      `git-wallet-transfer/${gitWalletTransferId}`,
    pagination: 'git-wallet-transfer/pagination',
  },
  account: {
    base: 'account',
    byId: (accountId: string) => `account/${accountId}`,
    pagination: 'account/pagination',
  },
  developer: {
    ip: 'developer-wallet/ip',
  },
  roleSetting: {
    base: 'role-setting',
    byId: (roleSettingId: string) => `role-setting/${roleSettingId}`,
    pagination: 'role-setting/pagination',
  },
  speed: {
    base: 'speed',
    byId: (speedId: string) => `speed/${speedId}`,
    pagination: 'speed/pagination',
  },
  fee: {
    base: 'fee-withdraw',
    byId: (feeId: string) => `fee-withdraw/${feeId}`,
  },
  smtp: {
    base: 'smtp-center',
    byId: (feeId: string) => `smtp-center/${feeId}`,
    pagination: 'smtp-center/pagination',
  },
  emailConfig: {
    base: 'email-config',
    byId: (emailConfigId: string) => `email-config/${emailConfigId}`,
    pagination: 'email-config/pagination',
  },
  emailDeclare: {
    base: 'email-declare',
    byId: (emailDeclareId: string) => `email-declare/${emailDeclareId}`,
    pagination: 'email-declare/pagination',
  },
};
