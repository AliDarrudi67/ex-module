import { IGridColumn } from '@shared/models/grid-columns.model';

export const AccountLevelGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'شناسه',
  },
  {
    field: 'description',
    header: 'توضیحات',
  },
  {
    field: 'minPoint',
    header: 'حداقل امتیاز',
  },
  {
    field: 'maxPoint',
    header: 'حداکثر امتیاز',
  },
  {
    field: 'isDefault',
    header: 'پیش‌فرض',
  },
  {
    field: 'withdrawLimit',
    header: 'سقف برداشت',
  },
  {
    field: 'depositPolicy',
    header: 'پالیسی deposit',
  },
  {
    field: 'withdrawStandardPolicy',
    header: 'پالیسی withdraw standard',
  },
  {
    field: 'withdrawSCPolicy',
    header: 'پالیسی withdraw sc',
  },
];
