export interface IApiResponse<T> {
  statusCode: number;
  result: T;
  timestamp: string;
}
