import { IPaginationMeta } from '../pagination.model';
import { IActionRole } from './action-role.model';

export interface IActionRoleListData {
  data: IActionRole[];
  metaData: IPaginationMeta;
}
