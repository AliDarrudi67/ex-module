import { IStatusType } from '../../types/status.type';

export interface ISpeed {
  speedId: string;
  slug: string;
  symbol: string;
  description: string;
  rate: number;
  status: IStatusType;
}
