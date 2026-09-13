import { IGridColumn } from '@shared/models/grid-columns.model';

export const GroupAssetGridConfig: IGridColumn[] = [
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
    header: ' پیشفرض',
  },
];
