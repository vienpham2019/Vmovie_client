import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (payload) => ({
        url: "/image/upload",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = adminApiSlice;
