import { IGridColumn } from '@shared/models/grid-columns.model';

export const emailDeclareGridConfig: IGridColumn[] = [
  {
    field: 'email',
    header: 'ایمیل',
  },
  {
    field: 'expireAccessToken',
    header: 'تاریخ انقضا توکن',
  },
  {
    field: 'redirectUrl',
    header: 'آدرس بازگشت',
    truncate: true,
  },
  {
    field: 'accessToken',
    header: 'توکن دسترسی',
    truncate: true,
  },
  {
    field: 'refreshToken',
    header: 'توکن تازه‌سازی',
    truncate: true,
  },
  {
    field: 'clientId',
    header: 'شناسه مشتری',
    truncate: true,
  },
  {
    field: 'clientSecret',
    header: 'رمز مشتری',
    truncate: true,
  },
  {
    field: 'status',
    header: 'وضعیت',
  },
];
