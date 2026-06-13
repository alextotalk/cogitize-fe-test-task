import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Single RTK Query API instance. Entity and feature slices extend it via
 * `injectEndpoints`, so the whole app registers exactly one reducer and one
 * middleware in the store.
 *
 * No shared `baseUrl` is set: endpoints provide absolute paths because the
 * assets list is proxied through the app origin (`/api/miex`) while the swap
 * gateway is hit directly.
 */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery(),
  endpoints: () => ({}),
});
