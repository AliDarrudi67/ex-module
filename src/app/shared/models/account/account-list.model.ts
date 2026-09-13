import { IStatusType } from '../../types/status.type';
import { IPaginationMeta } from '../pagination.model';

export interface IInfoAsset {
  assetId: string;
  slug: string;
  symbol: string;
}

export interface IGitWallet {
  type: string;
  slug: string;
  amount: string;
  suspend: string;
  status: IStatusType;
}

export interface IAccountListItem {
  infoAsset: IInfoAsset;
  gitWallets: IGitWallet[];
  balance: string;
  status: IStatusType;
}

export interface IAccountListData {
  data: IAccountListItem[];
  metaData: IPaginationMeta;
}
