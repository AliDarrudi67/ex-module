import { IGridColumn } from '@shared/models/grid-columns.model';

export const BaseCurrencyGridConfig: IGridColumn[] = [
  {
    field: 'from',
    header: 'ارز مبدا',
  },
  {
    field: 'to',
    header: 'ارز مقصد',
  },
  {
    field: 'makerFee',
    header: 'کارمزد Maker',
  },
  {
    field: 'takerFee',
    header: 'کارمزد Taker',
  },
  {
    field: 'feeCurrency',
    header: 'ارز کارمزد',
  },
  {
    field: 'minTrade',
    header: 'حداقل تراکنش',
  },
];
