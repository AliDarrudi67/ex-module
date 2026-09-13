import { IGridColumn } from '@shared/models/grid-columns.model';

export const RolesGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'نام',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'isDefault',
    header: 'نقش پیشفرض',
  },
  {
    field: 'actionRole',
    header: 'نقش علمیاتی',
  },
];
