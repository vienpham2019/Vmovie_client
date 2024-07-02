import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { setCredentials } from "../../features/auths/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("athorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500) {
    // send refresh token to get new access token
    const refreshRes = await baseQuery("/auth/refresh", api, extraOptions);
    // set refresh token to cookie if token have data
    if (refreshRes?.data) {
      // store the new token
      api.dispatch(setCredentials(refreshRes.data.metadata));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (result?.error?.data?.message && args.url !== "/auth/refresh") {
    api.dispatch(
      setMessage({
        message: result.error.data.message,
        messageType: notificationMessageEnum.ERROR,
      })
    );
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
