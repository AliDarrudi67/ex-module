import { IPaginationMeta } from '../pagination.model';
import { IEvm } from './evm.model';

export interface IEvmListData {
  data: IEvm[];
  metaData: IPaginationMeta;
}
