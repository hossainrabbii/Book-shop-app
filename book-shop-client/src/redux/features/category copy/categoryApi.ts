import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/category/create-category",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: [{ type: "Categories" }],
    }),

    getAllCategories: builder.query<any, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: [{ type: "Categories" }],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories" }],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, categoryData }) => ({
        url: `/category/${categoryId}`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: [{ type: "Categories" }],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
