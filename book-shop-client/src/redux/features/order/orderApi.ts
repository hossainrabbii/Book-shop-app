import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addorder: builder.mutation({
      query: (orderData) => ({
        url: "/order/add-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Orders" }],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      providesTags: [{ type: "Orders" }],
    }),

    deleteorder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Orders" }],
    }),

    updateorder: builder.mutation({
      query: ({ orderId, orderData }) => ({
        url: `/order/${orderId}`,
        method: "PUT", 
        body: orderData,
      }),
      invalidatesTags: [{ type: "Orders" }],
    }),
  }),
});

export const {
  useAddorderMutation,
  useGetAllOrdersQuery,
  useDeleteorderMutation,
  useUpdateorderMutation, // Export update hook
} = orderApi;
