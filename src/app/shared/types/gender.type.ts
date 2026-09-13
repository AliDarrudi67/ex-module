import { GENDER_LIST } from '../enums/gender-list';

export type IGenderType = (typeof GENDER_LIST)[number]['value'];
