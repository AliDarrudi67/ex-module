import { IGridColumn } from '@shared/models/grid-columns.model';

export const UserGridConfig: IGridColumn[] = [
  {
    field: 'fullName',
    header: 'نام کاربر',
  },
  {
    field: 'username',
    header: 'نام کاربری',
  },
  {
    field: 'email',
    header: 'ایمیل',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'token',
    header: 'توکن',
  },
  {
    field: 'wem',
    header: 'نوع ورود',
  },
  {
    field: 'accountLevel',
    header: 'سطح کاربری',
  },
];
