import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-shop-server-lovat.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["Categories", "Book", "Orders", "Review"],
  endpoints: () => ({}),
});
