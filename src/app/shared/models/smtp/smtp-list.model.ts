import { ISmtp } from './smtp.model';

export interface ISmtpCenterCreateResponse {
  statusCode: number;
  result: ISmtp;
  timestamp: string;
}
