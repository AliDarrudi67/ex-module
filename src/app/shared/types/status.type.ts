import { STATUS_LIST } from '../enums/status-list';

export type IStatusType = (typeof STATUS_LIST)[number]['value'];
