import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/logIn",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
