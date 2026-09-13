export interface IGitWalletTransferInfoWallet {
  gitWalletId: string;
  slug: string;
  symbol: string;
  typeGitWallet: string;
}

export interface IGitWalletTransfer {
  gitWalletTransferId: string;
  fromGitWalletId: string;
  toGitWalletId: string;
  infoGitWallet?: IGitWalletTransferInfoWallet;
}
