import { IGridColumn } from '@shared/models/grid-columns.model';

export const AccountGridConfig: IGridColumn[] = [
  {
    field: 'infoAsset.slug',
    header: 'نام',
  },
  {
    field: 'infoAsset.symbol',
    header: 'نماد',
  },
  {
    field: 'balance',
    header: 'موجودی',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'activation',
    header: 'فعالسازی',
  },
];
