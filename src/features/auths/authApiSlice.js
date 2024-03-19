import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/logIn",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/resetPassword",
        method: "POST",
        body: payload,
      }),
    }),
    resendForgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/resendForgotPassword",
        method: "POST",
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body: payload,
      }),
    }),
    signup: builder.mutation({
      query: (payload) => ({
        url: "/auth/signUp",
        method: "POST",
        body: payload,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.metadata));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logOut",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResendForgotPasswordMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApiSlice;
