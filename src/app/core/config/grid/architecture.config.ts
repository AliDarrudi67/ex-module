import { IGridColumn } from '@shared/models/grid-columns.model';

export const ArchitectureGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'نام',
  },
  {
    field: 'symbol',
    header: 'نماد',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'description',
    header: 'توضیحات',
  },
];
