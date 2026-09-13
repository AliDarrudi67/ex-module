import { IGridColumn } from '@shared/models/grid-columns.model';

export const FeesGridConfig: IGridColumn[] = [
  {
    field: 'infoSpeed.slug',
    header: 'نام',
  },
  {
    field: 'infoSpeed.symbol',
    header: 'نماد',
  },
  {
    field: 'gas',
    header: 'gas',
  },
  {
    field: 'maxGasFee',
    header: 'حداکثر Gas',
  },
  {
    field: 'typeCalcWithdraw',
    header: 'نوع محاسبه برداشت',
  },
];
