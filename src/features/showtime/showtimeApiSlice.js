import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const showtimeAdapter = createEntityAdapter({});
const initState = showtimeAdapter.getInitialState();
export const showtimeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShowtimeTimeline: builder.query({
      query: ({ date, theaterName }) => ({
        url: `/showtime/timeline?date=${date}&theaterName=${theaterName}`,
      }),
    }),
    countShowtimeDayByMovieId: builder.query({
      query: ({ movie }) => ({
        url: `/showtime/countShowtimeDay/${movie._id}`,
      }),
    }),
    createShowtime: builder.mutation({
      query: (payload) => ({
        url: `/showtime/new`,
        method: "POST",
        body: payload,
      }),
    }),
    deleteShowtime: builder.mutation({
      query: (_id) => ({
        url: `/showtime/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllShowtimeTimelineQuery,
  useCountShowtimeDayByMovieIdQuery,
  useCreateShowtimeMutation,
  useDeleteShowtimeMutation,
} = showtimeApiSlice;
