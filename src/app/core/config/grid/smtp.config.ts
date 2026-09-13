import { IGridColumn } from '@shared/models/grid-columns.model';

export const SmtpGridConfig: IGridColumn[] = [
  {
    field: 'email',
    header: 'ایمیل',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'createdAt',
    header: 'تاریخ ایجاد',
  },
];
