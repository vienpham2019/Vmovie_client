import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const moviesAdapter = createEntityAdapter({});
const initState = moviesAdapter.getInitialState();
export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovieByAdmin: builder.query({
      query: ({ page, limit, sortBy, sortDir, filter, search }) => ({
        url: `/movie/allMovieByAdmin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&filter=${filter}&search=${search}`,
        validateStatus: (res, result) => {
          return res.status >= 200 && res.status < 300;
        },
      }),
      //keepUnusedDataFor: 5, default 60s
      transformResponse: (resData) => {
        const loadedMovies = resData.metadata.movies.map((movie) => {
          movie.id = movie._id;
          return movie;
        });
        const totalMovies = resData.metadata.totalMovies; // Assuming this property exists in the response

        return {
          movies: moviesAdapter.setAll(initState, loadedMovies),
          totalMovies: totalMovies,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Movie", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Movie", id })),
            { type: "Movie", id: "TOTAL_COUNT" },
          ];
        } else
          return [
            { type: "Movie", id: "LIST" },
            { type: "Movie", id: "TOTAL_COUNT" },
          ];
      },
    }),
    getAllPublicMovieByAdmin: builder.query({
      query: ({ page, limit, sortBy, sortDir, search }) => ({
        url: `/movie/allPublicMovieByAdmin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`,
        validateStatus: (res, result) => {
          return res.status >= 200 && res.status < 300;
        },
      }),
    }),
    getMovieById: builder.query({
      query: ({ movieId }) => ({
        url: `/movie/details/${movieId}`,
      }),
    }),
    getUncompletedMovie: builder.mutation({
      query: () => ({
        url: "/movie/uncompletedMovie",
        method: "GET",
      }),
    }),
    publishedMovie: builder.mutation({
      query: (payload) => ({
        url: "/movie/published",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Movie", id: arg._id }],
    }),
    draftMovie: builder.mutation({
      query: (payload) => ({
        url: "/movie/draft",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Movie", id: arg._id }],
    }),
    updateUncompletedMovie: builder.mutation({
      query: (payload) => ({
        url: "/movie/uncompletedMovie",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Movie", id: arg._id },
        { type: "Movie", id: "TOTAL_COUNT" },
      ],
    }),
    deleteMovieById: builder.mutation({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Movie", id: arg.movieId },
        { type: "Movie", id: "TOTAL_COUNT" },
      ],
    }),
  }),
});

export const {
  useGetUncompletedMovieMutation,
  useGetAllMovieByAdminQuery,
  useGetAllPublicMovieByAdminQuery,
  useGetMovieByIdQuery,
  usePublishedMovieMutation,
  useDraftMovieMutation,
  useUpdateUncompletedMovieMutation,
  useDeleteMovieByIdMutation,
} = movieApiSlice;

// Return the query result object
export const selectUsersResult =
  movieApiSlice.endpoints.getAllMovieByAdmin.select();

// creates memoized selector
const selectMoviesData = createSelector(
  selectUsersResult,
  (movieResult) => {
    return movieResult.metadata;
  } // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
  selectIds: selectMovieIds,
  // Pass in a selector thet returns the users slice of state
} = moviesAdapter.getSelectors((state) => selectMoviesData(state) ?? initState);
