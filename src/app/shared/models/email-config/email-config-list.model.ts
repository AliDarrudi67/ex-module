import { IStatusType } from '../../types/status.type';
import { IPaginationMeta } from '../pagination.model';

export interface IEmailConfigListItem {
  emailConfigId: string;
  keysHtml: string[];
  content: string;
  typeEmail: string;
  status: IStatusType;
  createdAt?: string | { $date: string };
}

export interface IEmailConfigListData {
  data: IEmailConfigListItem[];
  metaData: IPaginationMeta;
}
