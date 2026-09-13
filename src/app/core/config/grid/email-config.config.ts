import { IGridColumn } from '@shared/models/grid-columns.model';

export const EmailConfigGridConfig: IGridColumn[] = [
  {
    field: 'typeEmail',
    header: 'نوع ایمیل',
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
