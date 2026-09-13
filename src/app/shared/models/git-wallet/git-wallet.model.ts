import { IStatusType } from '../../types/status.type';

export interface IGitWallet {
  gitWalletId: string;
  slug: string;
  symbol: string;
  typeGitWallet: string;
  status: IStatusType;
}
