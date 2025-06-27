import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review/add",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: [{ type: "Review" }],
    }),
    getReviews: builder.query({
      query: () => `/review`,
      providesTags: [{ type: "Review" }],
    }),

    getReviewByItemId: builder.query({
      query: (itemId: string) => `/review/${itemId}`,
      providesTags: [{ type: "Review" }],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewByItemIdQuery,
  useGetReviewsQuery,
} = reviewApi;
