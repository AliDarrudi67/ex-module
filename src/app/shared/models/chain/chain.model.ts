import { IStatusType } from '../../types/status.type';

export interface IChain {
  chainId?: string;
  evmId?: string; // optional، چون فرم تکی ندارد
  slug: string;
  symbol: string;
  description?: string; // optional، چون لیست ندارد
  status: IStatusType;
  createdAt?: string; // optional، چون فرم تکی ندارد
}
