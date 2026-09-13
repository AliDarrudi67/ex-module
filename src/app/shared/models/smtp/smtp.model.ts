import { IStatusType } from '../../types/status.type';

export interface ISmtp {
  smtpCenterId: string;
  email: string;
  status: IStatusType;
  createdAt?: string | { $date: string };
}
