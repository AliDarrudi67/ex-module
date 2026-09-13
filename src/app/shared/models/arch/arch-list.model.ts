import { IPaginationMeta } from '../pagination.model';
import { IArch } from './arch.model';

export interface IArchListData {
  data: IArch[];
  metaData: IPaginationMeta;
}
