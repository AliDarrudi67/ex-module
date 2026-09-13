import { IStatusType } from '../../types/status.type';

export interface ICrypto {
  cryptoId: string;
  assetId: string;
  chainId: string;
  archId: string;
  contractIdDeposit: string;
  contractIdWithdraw: string;
  infoArch?: {
    slug: string;
    symbol: string;
  }; // فقط در لیست هست
  isNative: boolean;
  contractId: string;
  decimal: number;
  decimalCalc: number;
  status: IStatusType;
  createdAt?: string; // اختیاری برای فرم
}
