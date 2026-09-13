import { IStatusType } from '../../types/status.type';

export interface IAddressWallet {
  addressWalletId: string;
  evmId: string;
  description: string;
  publicKey: string;
  isDefault: boolean;
  status: IStatusType;
  createdAt: string | { $date: string };
}
