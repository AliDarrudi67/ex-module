import { IStatusType } from '../../types/status.type';

export interface IGitWallet {
  type: string;
  slug: string;
  amount: string;
  suspend: string;
  status: IStatusType;
}
export interface IInfoAsset {
  assetId: string;
  slug: string;
  symbol: string;
}
export interface IAccount {
  accountId: string;
  gitWallets: IGitWallet[];
  balance: string;
  status: IStatusType;
  infoAsset: IInfoAsset;
}
