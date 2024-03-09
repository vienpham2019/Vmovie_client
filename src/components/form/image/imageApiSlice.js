import axios from "axios";
import { apiSlice } from "../../../app/api/apiSlice";
export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      queryFn: async ({ payload, onProgress }) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/image/upload`,
            payload,
            {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                onProgress(progress);
              },
            }
          );

          return response;
        } catch (error) {
          console.error("error from api", error.response.data?.message);
          throw new Error(error.response.data?.message || "Upload failed");
        }
      },
    }),
    deleteImage: builder.mutation({
      query: (fileName) => ({
        url: `/image/${fileName}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = imageApiSlice;
