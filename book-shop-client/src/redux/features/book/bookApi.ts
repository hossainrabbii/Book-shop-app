import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/book/add-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: [{ type: "Book" }],
    }),
    getAllBooks: builder.query({
      query: () => {
        return {
          url: "/book",
          method: "GET",
        };
      },
      providesTags: [{ type: "Book" }],
    }),
    getBookById: builder.query({
      query: (bookId) => {
        return {
          url: `/book/${bookId}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Book" }],
    }),
      deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/book/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Book" }],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, bookData }) => ({
        url: `/book/${bookId}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: [{ type: "Book" }],
    }),
  }),
});

export const { useAddBookMutation, useGetAllBooksQuery, useGetBookByIdQuery, useUpdateBookMutation, useDeleteBookMutation } =
  bookApi;
