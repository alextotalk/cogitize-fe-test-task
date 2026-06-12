import { Asset } from "@/06.entities";
import { SwapBalanceType } from "../api";

export const DEFAULT_FROM_ASSET: Asset = {
  id: 3,
  symbol: "USDT",
  name: "Tether US",
  assetImage: "https://cdn.miex.one/9c057f8b911a4acc5bd97.png",
};

export const DEFAULT_TO_ASSET: Asset = {
  id: 1,
  symbol: "BTC",
  name: "Bitcoin",
  assetImage: "https://cdn.miex.one/d75606c8075fb4d65cf0e.png",
};

export const SWAP_BALANCE_TYPES: SwapBalanceType[] = ["main", "trade"];
