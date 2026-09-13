import { IPaginationMeta } from '../pagination.model';
import { IEmailDeclare } from './email-declare.model';

export interface ISmtpCenterListData {
  data: IEmailDeclare[];
  metaData: IPaginationMeta;
}
