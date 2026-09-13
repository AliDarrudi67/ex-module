import { IGridColumn } from '@shared/models/grid-columns.model';

export const GitWalletGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'عنوان',
  },
  {
    field: 'symbol',
    header: 'نماد',
  },
  {
    field: 'typeGitWallet',
    header: 'نوع کیف پول',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'destination',
    header: 'مقصد',
  },
  {
    field: 'asset',
    header: 'asset',
  },
];
