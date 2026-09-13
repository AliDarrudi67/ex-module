import { IGridColumn } from '@shared/models/grid-columns.model';

export const SpeedGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'شناسه سرعت',
  },
  {
    field: 'description',
    header: 'توضیحات',
  },
  {
    field: 'type',
    header: 'نوع',
  },
  {
    field: 'rate',
    header: 'ضریب',
  },
  {
    field: 'fee',
    header: 'فی برداشت',
  },
];
