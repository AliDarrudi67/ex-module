import { IGridColumn } from '@shared/models/grid-columns.model';

export const SectionAssetGridConfig: IGridColumn[] = [
  {
    field: 'asset.slug',
    header: 'عنوان',
  },
  {
    field: 'asset.symbol',
    header: 'نماد',
  },
  {
    field: 'groupAsset.slug',
    header: 'عنوان گروه',
  },
];
