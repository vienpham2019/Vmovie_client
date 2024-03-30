import { apiSlice } from "../../../app/api/apiSlice";
export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: ({ payload, field, db, id }) => ({
        url: `/image/upload?field=${field}&db=${db}&id=${id}`,
        method: "POST",
        body: payload,
      }),
      onError: (error) => {
        console.error("Error from API", error);
        throw new Error(error.response?.status || "Upload failed");
      },
    }),
    deleteImage: builder.mutation({
      query: ({ fileName, field, db, id }) => ({
        url: `/image/${fileName}?field=${field}&db=${db}&id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = imageApiSlice;
