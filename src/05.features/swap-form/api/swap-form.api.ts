import { SWAP_API_URL } from "@/07.shared/const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const swapApi = createApi({
  reducerPath: "swapApi",
  baseQuery: fetchBaseQuery({ baseUrl: SWAP_API_URL }),
  endpoints: (build) => ({
    previewSwap: build.mutation<SwapPreview, SwapPreviewPayload>({
      query: (body) => ({
        url: "/public/preview",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePreviewSwapMutation } = swapApi;
