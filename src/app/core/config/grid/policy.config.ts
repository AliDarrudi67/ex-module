import { IGridColumn } from '@shared/models/grid-columns.model';

export const PolicyGridConfig: IGridColumn[] = [
  {
    field: 'asset',
    header: 'ارز',
  },
  {
    field: 'network',
    header: 'شبکه',
  },
  {
    field: 'minDeposit',
    header: 'حداقل واریزی',
  },
  {
    field: 'networkFee',
    header: 'فی شبکه',
  },
  {
    field: 'minBalance',
    header: 'حداقل موجودی',
  },
  {
    field: 'speed',
    header: 'سرعت',
  },
];
