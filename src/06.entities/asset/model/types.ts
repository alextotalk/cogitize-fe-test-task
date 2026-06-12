export interface Asset {
  id: number;
  symbol: string;
  name: string;
  assetImage: string;
  isDepositAvailable?: boolean;
}

export interface AssetsPage {
  data: Asset[];
  currentPage: number;
  hasNextPage: boolean;
  maximumPages: number;
}
