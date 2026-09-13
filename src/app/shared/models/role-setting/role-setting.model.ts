import { IStatusType } from '../../types/status.type';

export interface IRoleSetting {
  roleSettingId: string;
  roleId: string;
  roleType: string;
  slug: string;
  description: string;
  isDefault: boolean;
  status: IStatusType;
  createdAt: string | { $date: string };
}
