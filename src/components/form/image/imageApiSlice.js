import { apiSlice } from "../../../app/api/apiSlice";
export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: ({ payload, field, db }) => ({
        url: `/image/upload?field=${field}&db=${db}`,
        method: "POST",
        body: payload,
      }),
      onError: (error) => {
        console.error("error from api", error);
        throw new Error(error.status || "Upload failed");
      },
    }),
    deleteImage: builder.mutation({
      query: ({ fileName, field, db }) => ({
        url: `/image/${fileName}?field=${field}&db=${db}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = imageApiSlice;
