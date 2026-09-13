import { IStatusType } from '../../types/status.type';

export interface IArch {
  archId: string;
  chainId: string;
  slug: string;
  symbol: string;
  description: string;
  status: IStatusType;
  createdAt?: string; // optional، چون در فرم تکی API ممکن است مقدار داشته باشد یا نه
}
