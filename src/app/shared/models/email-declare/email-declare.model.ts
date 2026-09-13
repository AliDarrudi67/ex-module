import { IStatusType } from '../../types/status.type';

export interface IEmailDeclare {
  smtpCenterId: string;
  email: string;
  expireAccessToken: string;
  redirectUrl: string;
  accessToken: string;
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  status: IStatusType;
}
