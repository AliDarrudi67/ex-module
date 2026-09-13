import { IStatusType } from '../../types/status.type';

export interface IGroupAsset {
  groupAssetId: string;
  slug: string;
  isDefault: boolean;
  status: IStatusType; // مثلا "ACTIVE" یا "DEACTIVE"
  createdAt?: string; // اختیاری برای فرم
}
