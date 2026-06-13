import { baseApi } from "@/07.shared/api";
import { ASSETS_API_URL } from "@/07.shared/const";
import { AssetsPage } from "../model";

export const assetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAssets: build.infiniteQuery<AssetsPage, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
      },
      query: ({ queryArg, pageParam }) => ({
        url: `${ASSETS_API_URL}/assets`,
        params: queryArg
          ? { search: queryArg, page: pageParam }
          : { page: pageParam },
      }),
    }),
  }),
});

export const { useGetAssetsInfiniteQuery } = assetApi;
