import { IPaginationMeta } from '../pagination.model';

export interface ISpeedListItem {
  speedId: string;
  slug: string;
  symbol: string;
  description: string;
  rate: number;
  status: string;
  createdAt?: string | { $date: string };
}

export interface ISpeedListData {
  data: ISpeedListItem[];
  metaData: IPaginationMeta;
}
