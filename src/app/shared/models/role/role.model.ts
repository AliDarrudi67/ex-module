import { IStatusType } from '../../types/status.type';

export interface IRole {
  roleId: string;
  slug: string;
  description: string;
  isDefault: boolean;
  status: IStatusType;
}
