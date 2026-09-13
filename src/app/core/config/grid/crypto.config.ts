import { IGridColumn } from '@shared/models/grid-columns.model';

export const CryptoGridConfig: IGridColumn[] = [
  {
    field: 'network',
    header: 'شبکه',
  },
  {
    field: 'contractId',
    header: 'Contract ID',
    truncate: true,
  },
  {
    field: 'contractIdDeposit',
    header: 'Deposit Contract',
    truncate: true,
  },
  {
    field: 'contractIdWithdraw',
    header: 'Withdraw Contract',
    truncate: true,
  },
  {
    field: 'decimal',
    header: 'اعشار',
  },
  {
    field: 'decimalCalc',
    header: 'محاسبه اعشار',
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
  {
    field: 'speed',
    header: 'سرعت ها',
  },
];
