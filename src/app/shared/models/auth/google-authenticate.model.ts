export interface IAuthTokenResult {
  token: string;
}

export interface IAuthTokenResponse {
  statusCode: number;
  result: IAuthTokenResult;
  timestamp: string;
}
