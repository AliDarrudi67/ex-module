import { IAsset } from '../asset/asset.model';

export interface ISectionAsset {
  sectionAssetId: string;
  groupAssetId?: string;
  assetId: string;
  groupSectionId: string;
  groupAsset?: {
    slug: string;
  };
  asset: Partial<IAsset>; // چون بعضی فیلدها مثل decimalDisplay ممکنه نباشه در لیست
  createdAt?: string;
}
