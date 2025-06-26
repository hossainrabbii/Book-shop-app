import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    getUserByEmail: builder.mutation({
      query: (emailId: string) => ({
        url: `/user/${emailId}`,
        method: "get",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserByEmailMutation } = userApi;
