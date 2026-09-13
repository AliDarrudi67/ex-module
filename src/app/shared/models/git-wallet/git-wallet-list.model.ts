import { IStatusType } from '../../types/status.type';
import { IPaginationMeta } from '../pagination.model';

export interface IGitWalletListItem {
  gitWalletId: string;
  slug: string;
  symbol: string;
  typeGitWallet: string;
  status: IStatusType;
}

export interface IGitWalletListData {
  data: IGitWalletListItem[];
  metaData: IPaginationMeta;
}
