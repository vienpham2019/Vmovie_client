import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const moviesAdapter = createEntityAdapter({});
const initState = moviesAdapter.getInitialState();
export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovieByAdmin: builder.query({
      query: ({ page, limit }) => ({
        url: `/movie/allMovieByAdmin?page=${page}&limit=${limit}`,
        validateStatus: (res, result) => {
          return res.status >= 200 && res.status < 300;
        },
      }),
      //keepUnusedDataFor: 5, default 60s
      transformResponse: (resData) => {
        const loadedMovies = resData.metadata.map((movie) => {
          movie.id = movie._id;
          return movie;
        });
        return moviesAdapter.setAll(initState, loadedMovies);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Movie", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Movie", id })),
          ];
        } else return [{ type: "Movie", id: "LIST" }];
      },
    }),
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
  useGetAllMovieByAdminQuery,
  useUpdateUncompletedMovieMutation,
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
