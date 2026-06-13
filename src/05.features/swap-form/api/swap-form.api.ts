import { baseApi } from "@/07.shared/api";
import { SWAP_API_URL } from "@/07.shared/const";

export type SwapDirection = "from" | "to";

export type SwapBalanceType = "main" | "trade";

export interface SwapPreviewPayload {
  fromAssetId: number;
  toAssetId: number;
  direction: SwapDirection;
  amount: string;
  balanceType: SwapBalanceType[];
}

export interface SwapPreview {
  estimatedGive: string;
  estimatedReceive: string;
  estimatedRate: string;
  estimatedUsdtEquivalent: string;
}

export const swapApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    previewSwap: build.mutation<SwapPreview, SwapPreviewPayload>({
      query: (body) => ({
        url: `${SWAP_API_URL}/public/preview`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePreviewSwapMutation } = swapApi;
