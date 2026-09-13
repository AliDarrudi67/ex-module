import { IGridColumn } from '@shared/models/grid-columns.model';

export const RouteGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'نام مسیر',
  },
  {
    field: 'description',
    header: 'توضیحات',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'method',
    header: 'متد درخواست',
  },
  {
    field: 'createdAt',
    header: 'تاریخ ایجاد',
  },
];
