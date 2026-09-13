import { IStatusType } from '../../types/status.type';

export interface IEvm {
  evmId: string;
  slug: string;
  server: string;
  status: IStatusType;
  createdAt?: string; // optional، چون فرم تکی createdAt نداره
}
