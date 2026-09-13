import { IPaginationMeta } from '../pagination.model';
import { ICrypto } from './crypto.model';

export interface ICryptoListData {
  data: ICrypto[];
  metaData: IPaginationMeta;
}
