import { IStatusType } from '../../types/status.type';
import { IPaginationMeta } from '../pagination.model';

export interface IAddressWalletListItem {
  addressWalletId: string;
  evmId?: string;
  description?: string;
  publicKey?: string;
  isDefault?: boolean;
  status?: IStatusType;
  createdAt?: string | { $date: string };
}

export interface IAddressWalletListData {
  data: IAddressWalletListItem[];
  metaData: IPaginationMeta;
}
