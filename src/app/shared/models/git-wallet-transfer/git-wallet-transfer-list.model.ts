import { IPaginationMeta } from '../pagination.model';

export interface IGitWalletTransferListItem {
  gitWalletTransferId: string;
  infoGitWallet?: {
    gitWalletId: string;
    slug: string;
    symbol: string;
    typeGitWallet: string;
  };
}

export interface IGitWalletTransferListData {
  data: IGitWalletTransferListItem[];
  metaData: IPaginationMeta;
}
