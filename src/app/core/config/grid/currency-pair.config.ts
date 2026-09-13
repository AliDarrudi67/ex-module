import { IGridColumn } from '@shared/models/grid-columns.model';

export const CurrencyPairGridConfig: IGridColumn[] = [
  { field: 'from', header: 'ارز مبدا' },
  { field: 'to', header: 'ارز مقصد' },
  { field: 'status', header: 'وضعیت' },
  { field: 'version', header: 'نسخه' },
  { field: 'baseCurrency', header: 'ارز base' },
];
