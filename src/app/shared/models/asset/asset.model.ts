export interface IAsset {
  assetId: string;
  slug: string;
  symbol: string;
  typeAsset: string; // مثلا "CRYPTO"
  decimalDisplay: number;
  isStableCoin: boolean;
  status: string;
  createdAt?: string;
}
