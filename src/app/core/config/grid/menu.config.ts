import { IGridColumn } from '@shared/models/grid-columns.model';

export const MenuGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'نام منو',
  },
  {
    field: 'route',
    header: 'مسیر',
  },
  {
    field: 'icon',
    header: 'آیکن',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
];
