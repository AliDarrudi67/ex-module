import { IStatusType } from '../../types/status.type';

export interface IActionRole {
  actionRoleId: string;
  slug: string;
  symbol: string;
  description: string;
  status: IStatusType;
  createdAt?: string; // optional، چون فرم تکی createdAt نداره
}
