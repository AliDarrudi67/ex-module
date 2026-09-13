import { IGitsFeeType } from '@shared/types/fee/gits-fee.type';
import { ITypeCalcWithdraw } from '@shared/types/fee/type-calc-withdraw.type';
import { IPaginationMeta } from '../pagination.model';

export interface IFeeWithdrawListItem {
  feeId: string;
  cryptoId: string;
  speedId: string;
  feeWithdrawId: string;
  infoSpeed: {
    slug: string;
    symbol: string;
  };
  gas: number;
  maxGasFee: number;
  typeCalcWithdraw: ITypeCalcWithdraw;
  disCountInternalTransfer: number;
  gitsFee: IGitsFeeType[];
}

export interface IFeeWithdrawListData {
  data: IFeeWithdrawListItem[];
  metaData: IPaginationMeta;
}
