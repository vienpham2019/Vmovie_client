import { apiSlice } from "../../../app/api/apiSlice";

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      queryFn: async ({ payload, onProgress }, { signal }) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            process.env.REACT_APP_BASE_API_URL + "/image/upload",
            true
          );

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              //   console.log(progress);
              onProgress(progress);
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              console.log("complete");
              resolve(response);
            } else {
              reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
          };

          xhr.onerror = () => {
            reject(new Error("Upload failed"));
          };

          xhr.send(payload);
          // Cancel the request if the component is unmounted
          signal.addEventListener("abort", () => {
            xhr.abort();
            reject(new Error("Upload cancelled"));
          });
        });
      },
      onProgress: (progress) => {
        // Handle progress updates here
        console.log("Progress:", progress);
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageApiSlice;
