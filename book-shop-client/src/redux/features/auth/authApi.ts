import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder:any) => ({
    login: builder.mutation({
      query: (userData:any) => ({
        url: '/user/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
