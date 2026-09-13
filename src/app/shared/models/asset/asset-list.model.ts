import { IPaginationMeta } from '../pagination.model';
import { IAsset } from './asset.model';

export interface IAssetListData {
  data: IAsset[];
  metaData: IPaginationMeta;
}
