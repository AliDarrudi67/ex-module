import { IPaginationMeta } from '../pagination.model';
import { ISectionAsset } from './section-asset.model';

export interface ISectionAssetListData {
  data: ISectionAsset[];
  metaData: IPaginationMeta;
}
