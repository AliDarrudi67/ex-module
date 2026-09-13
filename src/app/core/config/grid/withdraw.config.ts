import { IGridColumn } from '@shared/models/grid-columns.model';

export const WithdrawGridConfig: IGridColumn[] = [
  {
    field: 'createdAt',
    header: 'تاریخ و زمان',
  },
  {
    field: 'currency',
    header: 'رمز ارز',
  },
  {
    field: 'value',
    header: 'مقدار',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'link',
    header: 'لینک تراکنش',
  },
  {
    field: 'id',
    header: 'شناسه',
  },
];
