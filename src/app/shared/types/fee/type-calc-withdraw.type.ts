import { TYPE_CALC_WITHDRAW_LIST } from '@shared/enums/type-calc-withdraw';

export type ITypeCalcWithdraw =
  (typeof TYPE_CALC_WITHDRAW_LIST)[number]['value'];
