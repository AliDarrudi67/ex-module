import { IGridColumn } from '@shared/models/grid-columns.model';

export const GitWalletTransferGridConfig: IGridColumn[] = [
  {
    field: 'infoGitWallet.slug',
    header: 'نام کیف‌پول',
  },
  {
    field: 'infoGitWallet.symbol',
    header: 'نماد',
  },
  {
    field: 'infoGitWallet.typeGitWallet',
    header: 'نوع کیف‌پول',
  },
  {
    field: 'gitWalletTransferId',
    header: 'شناسه انتقال',
  },
];
