import { IGridColumn } from '@shared/models/grid-columns.model';

export const AssetsGridConfig: IGridColumn[] = [
  {
    field: 'slug',
    header: 'نام دارایی',
  },
  {
    field: 'symbol',
    header: 'نماد',
  },
  {
    field: 'decimalDisplay',
    header: 'نمایش اعشار',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'typeAsset',
    header: 'نوع',
  },
  {
    field: 'isStableCoin',
    header: 'ارز پایدار',
  },
  {
    field: 'sectionAsset',
    header: 'Section Asset',
  },
  {
    field: 'crypto',
    header: 'کریپتو',
  },
];
