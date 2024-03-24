import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUncompletedMovie: builder.mutation({
      query: () => ({
        url: "/movie/uncompletedMovie",
        method: "GET",
      }),
    }),
    updateUncompletedMovie: builder.mutation({
      query: (payload) => ({
        url: "/movie/uncompletedMovie",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUncompletedMovieMutation,
  useUpdateUncompletedMovieMutation,
} = adminApiSlice;
