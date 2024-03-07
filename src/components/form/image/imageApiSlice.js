import axios from "axios";
import { apiSlice } from "../../../app/api/apiSlice";

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      queryFn: async ({ payload, onProgress }, { signal }) => {
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
              cancelToken: new axios.CancelToken((cancel) => {
                signal.addEventListener("abort", () =>
                  cancel("Upload cancelled")
                );
              }),
            }
          );

          return response;
        } catch (error) {
          throw new Error(`Upload failed: ${error.message}`);
        }
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageApiSlice;
