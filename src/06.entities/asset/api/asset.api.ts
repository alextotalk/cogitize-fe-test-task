import { ASSETS_API_URL } from "@/07.shared/const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AssetsPage } from "../model";

export const assetApi = createApi({
  reducerPath: "assetApi",
  baseQuery: fetchBaseQuery({ baseUrl: ASSETS_API_URL }),
  endpoints: (build) => ({
    getAssets: build.infiniteQuery<AssetsPage, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
      },
      query: ({ queryArg, pageParam }) => ({
        url: "/assets",
        params: queryArg
          ? { search: queryArg, page: pageParam }
          : { page: pageParam },
      }),
    }),
  }),
});

export const { useGetAssetsInfiniteQuery } = assetApi;
