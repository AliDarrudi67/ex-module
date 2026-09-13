import { IGridColumn } from '@shared/models/grid-columns.model';

export const BlockchainGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'عنوان',
  },
  {
    field: 'symbol',
    header: 'نماد',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
];
