import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUncompletedMovie: builder.mutation({
      query: () => ({
        url: "/movie/uncompletedMovie",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUncompletedMovieMutation } = adminApiSlice;
