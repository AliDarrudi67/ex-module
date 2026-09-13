import { GITS_FEE_LIST } from '@shared/enums/gits-fee';

export type IGitsFeeType = (typeof GITS_FEE_LIST)[number]['value'];
