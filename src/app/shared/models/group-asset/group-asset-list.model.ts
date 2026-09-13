import { IPaginationMeta } from '../pagination.model';
import { IGroupAsset } from './group-asset.model';

export interface IGroupAssetListData {
  data: IGroupAsset[];
  metaData: IPaginationMeta;
}
