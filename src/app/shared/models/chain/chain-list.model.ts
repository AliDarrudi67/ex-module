import { IPaginationMeta } from '../pagination.model';
import { IChain } from './chain.model';

export interface IChainListData {
  data: IChain[];
  metaData: IPaginationMeta;
}
