import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error) {
    api.dispatch(
      setMessage({
        message: result.error.data.message,
        messageType: notificationMessageEnum.ERROR,
      })
    );
  }
  // if the access token expired then send the quest for new access token
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshToken = await baseQuery("/auth/refresh", api, extraOptions);
    console.log(refreshToken);
    // set refresh token to cookie if token have data
    // if (refreshToken?.data) {
    //   // store the new token
    //   api.dispatch(setCredentials({ ...refreshToken.data }));

    //   // retry original query with new access token
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   // if
    //   if (refreshToken?.error?.status === 403) {
    //     refreshToken.error.data.message = "Your login has expired.";
    //   }
    //   return refreshToken;
    // }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
