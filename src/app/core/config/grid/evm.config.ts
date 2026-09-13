import { IGridColumn } from '@shared/models/grid-columns.model';

export const EvmGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'نام ماشین',
  },
  {
    field: 'server',
    header: 'سرور',
    truncate: true,
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
];
