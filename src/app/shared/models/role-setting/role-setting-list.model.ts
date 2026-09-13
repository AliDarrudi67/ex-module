import { IPaginationMeta } from '../pagination.model';
import { IRoleSetting } from './role-setting.model';

export interface IRoleSettingListItem {
  roleId: string;
  roleType: IRoleSetting;
}

export interface IRoleSettingListData {
  data: IRoleSettingListItem[];
  metaData: IPaginationMeta;
}
